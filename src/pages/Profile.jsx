import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../componets/Header';
import { getUser } from '../services/userAPI';
import Loading from '../componets/Loading';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      email: '',
      image: '',
      description: '',
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const user = await getUser();
    this.setState({
      userName: user.name,
      email: user.email,
      image: user.image,
      description: user.description,
      loading: false,
    });
  }

  render() {
    const { loading, userName, email, image, description } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <Loading /> : (
          <div>
            <img data-testid="profile-image" src={ image } alt={ userName } />
            <p>{userName}</p>
            <p>{email}</p>
            <p>{description}</p>
          </div>
        )}
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}

export default Profile;
