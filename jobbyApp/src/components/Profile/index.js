import React, {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {
    profileData: null,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchProfileData()
  }

  fetchProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }

      this.setState({
        profileData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderProfileSuccessView = () => {
    const {profileData} = this.state
    return (
      <div className="profile-container">
        <div className="profile-card">
          <img
            src={profileData.profileImageUrl}
            alt="profile"
            className="profile-image"
          />
          <h1 className="profile-name">Vishnu</h1>
          <p className="profile-bio">{profileData.shortBio}</p>
        </div>
      </div>
    )
  }

  renderLoadingView = () => <div className="loader">Loading...</div>

  renderFailureView = () => (
    <div className="failure-view">
      <p>Failed to load profile details. Please try again.</p>
      <button onClick={this.fetchProfileData}>Retry</button>
    </div>
  )

  renderProfileView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderProfileView()}</>
  }
}

export default Profile
