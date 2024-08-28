import React from 'react'
import { avatarLetter } from '../../Util/Util'
import './Profile.scss'

class ProfileNavigation extends React.Component {
  constructor() {
    super()
    this.state = {
      // open: false
    }
  }

  render() {
    const { userInfo } = this.props

    return (
      <div className="profile-navigaton">
        <div className="profile-summary">
          <div className="profile-name">
            <span>{avatarLetter(userInfo.name)}</span>
          </div>
          {/* <img src={import('../../assets/images/profile-pic.png')} alt="Profile Picture" /> */}
          <div className="member-meta">
            <div className="team-member-name">
              <h4>{userInfo.name}</h4>
              {/* <span className="badge">Employee</span> */}
            </div>
          </div>
        </div>
        {/* profile details ends */}

        {/* <div className="navigation">
                        <ul>
                            <li><Link  to="">Projects</Link></li>
                            <li className="active"><Link to="./profile">Basic Info</Link></li>
                            <li><Link  to="">Notification</Link></li>
                            <li><Link  to="">Security</Link></li>
                        </ul>
                    </div> */}
      </div>
    )
  }
}

export default ProfileNavigation
