import React from 'react';
// import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: true,
      userName: '',
    };
  }

  handleUserName = async () => {
    const name = await getUser();
    this.setState({
      userName: name.name,
      loaded: false,
    });
  }

  render() {
    const { userName, loaded } = this.state;
    this.handleUserName();
    return (
      <header data-testid="header-component">
        {loaded ? <Loading /> : (
          <div>
            <span>Trybetunes</span>
            <span data-testid="header-user-name">{ userName }</span>
          </div>
        )}
      </header>
    );
  }
}

export default Header;
