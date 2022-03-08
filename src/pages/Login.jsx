import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';

const LENGTH_MIN = 3;
const userAPI = require('../services/userAPI');

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      inputName: '',
      disabledButton: true,
      continueCode: false,
    };
  }

  handleButtonDisable = ({ target }) => {
    const { value } = target;
    let bool;
    if (value.length >= LENGTH_MIN) {
      bool = false;
    } else {
      bool = true;
    }
    this.setState({
      inputName: value,
      disabledButton: bool,
    });
  }

  handleClickButton = async () => {
    const { inputName } = this.state;
    this.setState({ loading: true });
    await userAPI.createUser({ name: inputName });
    this.setState({ continueCode: true });
  }

  render() {
    const { loading, continueCode, disabledButton } = this.state;
    return (
      <div data-testid="page-login">
        {loading ? <Loading /> : (
          <form action="">
            <input
              data-testid="login-name-input"
              type="text"
              onChange={ this.handleButtonDisable }
            />
            <button
              type="button"
              disabled={ disabledButton }
              onClick={ this.handleClickButton }
              data-testid="login-submit-button"
            >
              Entrar
            </button>
          </form>
        )}
        {continueCode && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
