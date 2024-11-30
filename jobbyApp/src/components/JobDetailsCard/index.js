import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import SimilarJobs from '../SimilarJobs'
import Header from '../Header'
import {BsFillStarFill} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'
import {BsBriefcaseFill} from 'react-icons/bs'
import {IoOpenOutline} from 'react-icons/io5'
import './index.css'

class JobDetailsCard extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    isLoading: true,
    isError: false,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()

      // Adjusted fetched data fields to camelCase
      const updatedJobDetails = {
        companyLogoUrl: fetchedData.job_details.company_logo_url,
        companyWebsiteUrl: fetchedData.job_details.company_website_url,
        employmentType: fetchedData.job_details.employment_type,
        jobDescription: fetchedData.job_details.job_description,
        location: fetchedData.job_details.location,
        packagePerAnnum: fetchedData.job_details.package_per_annum,
        rating: fetchedData.job_details.rating,
        skills: fetchedData.job_details.skills.map(skill => ({
          name: skill.name,
          imageUrl: skill.image_url,
        })),
        lifeAtCompany: {
          description: fetchedData.job_details.life_at_company.description,
          imageUrl: fetchedData.job_details.life_at_company.image_url,
        },
      }

      const updatedSimilarJobs = fetchedData.similar_jobs.map(job => ({
        id: job.id,
        title: job.title,
        companyLogoUrl: job.company_logo_url,
        location: job.location,
        employmentType: job.employment_type,
        rating: job.rating,
        jobDescription: job.job_description,
      }))

      this.setState({
        jobDetails: updatedJobDetails,
        similarJobs: updatedSimilarJobs,
        isLoading: false,
        isError: false,
      })
    } else {
      this.setState({isLoading: false, isError: true})
    }
  }

  renderJobSkills = () => {
    const {jobDetails} = this.state
    const {skills} = jobDetails

    return (
      <div className="skills-container">
        {skills.map(skill => (
          <div className="skill" key={skill.name}>
            <img src={skill.imageUrl} alt={skill.name} className="skill-logo" />
            <p>{skill.name}</p>
          </div>
        ))}
      </div>
    )
  }

  renderLifeAtCompany = () => {
    const {jobDetails} = this.state
    const {lifeAtCompany} = jobDetails

    return (
      <div className="life-at-company-container">
        <p className="lifeAtCompanydescription">{lifeAtCompany.description}</p>
        <img
          src={lifeAtCompany.imageUrl}
          alt="life at company"
          className="company-life-image"
        />
      </div>
    )
  }

  renderJobDetails = () => {
    const {jobDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
    } = jobDetails

    return (
      <div className="job-details-container">
        <div className="job-header">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="job-header-info">
            <h1 className="JobTitle">DevOps Engineer</h1>
            <div className="rating-container">
              <BsFillStarFill className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-details-right">
          <div className="job-location-employment">
            <div className="location-container">
              <GoLocation className="icon" />
              <p className="job-location">{location}</p>
            </div>
            <div className="employment-type-container">
              <BsBriefcaseFill className="icon" />
              <p className="employment-type">{employmentType}</p>
            </div>
          </div>
          <p>{packagePerAnnum}</p>
        </div>

        <hr />
        <div className="job-description">
          <div className="job-description-heading-container">
            <h2>Description</h2>
            <a
              href={companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
              className="visit-link"
            >
              <p className="visit">Visit</p>
              <IoOpenOutline className="visitIcon" />
            </a>
          </div>

          <p>{jobDescription}</p>
        </div>
        <div className="skills-section">
          <h2>Skills</h2>
          {this.renderJobSkills()}
        </div>
        <div className="life-at-company-section">
          <h2>Life at Company</h2>
          {this.renderLifeAtCompany()}
        </div>
      </div>
    )
  }

  renderSimilarJobs = () => {
    const {similarJobs} = this.state

    return (
      <div className="similar-jobs-container">
        <h1 className="similarjobsHeading">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobs.map(eachSimilarJob => (
            <SimilarJobs jobDetails={eachSimilarJob} key={eachSimilarJob.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="not found"
        className="not-found-img"
      />
      <h1>Something went wrong </h1>
      <p>We cannot seeem to find the page you are looking for. </p>
      <button onClick={this.getJobDetails}>Retry</button>
    </div>
  )

  render() {
    const {isLoading, isError} = this.state

    return (
      <div className="job-item-details-page">
        <Header />
        {isLoading ? (
          this.renderLoadingView()
        ) : isError ? (
          this.renderFailureView()
        ) : (
          <>
            {this.renderJobDetails()}
            {this.renderSimilarJobs()}
          </>
        )}
      </div>
    )
  }
}

export default JobDetailsCard
