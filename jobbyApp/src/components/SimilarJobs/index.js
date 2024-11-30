// Write your code here
import './index.css'
import {BsFillStarFill} from 'react-icons/bs'

import {GoLocation} from 'react-icons/go'
import {BsBriefcaseFill} from 'react-icons/bs'
const SimilarProductItem = props => {
  const {jobDetails} = props
  const {
    id,
    title,
    companyLogoUrl,
    location,
    employmentType,
    rating,
    jobDescription,
  } = jobDetails

  return (
    <li key={id} className="similar-job-item">
      <div className="job-header">
        <img src={companyLogoUrl} alt="company logo" className="company-logo" />
        <div className="job-header-info">
          <h1 className="JobTitle">{title}</h1>
          <div className="rating-container">
            <BsFillStarFill className="star-icon" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <p className="description-heading">Description</p>
      <p className="description">{jobDescription}</p>
      <div className="job-details-footer">
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
      </div>
    </li>
  )
}

export default SimilarProductItem
