import './profile.scss';
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import MessageIcon from '@mui/icons-material/Message';
import Posts from '../../components/posts/posts';

const Profile = () => {
  return (
    <div className="profile">
      <div className="profile__image">
        <img
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
          alt=""
          className="profile__pic"
        />
      </div>
      <div className="profile__info">
        <div className="profile__info-items">
          <div className="profile__names">
            <h1 className="profile__name">Petras Petravicus</h1>
            <span className="profile__username">@simasimonas</span>
          </div>
          <div className="profile__actions">
            <button className="action-button icon-text-button">
              <PersonAddAlt1Icon />
              Add friend
            </button>
            <button className="action-button icon-text-button">
              <MessageIcon />
              Message
            </button>
          </div>
        </div>
      </div>
      <Posts />
    </div>
  );
};

export default Profile;
