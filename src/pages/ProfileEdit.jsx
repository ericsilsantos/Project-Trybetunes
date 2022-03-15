import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../componets/Header';
import Loading from '../componets/Loading';
import { getUser, updateUser } from '../services/userAPI';
// import { updateUser } from '../services/userAPI'

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      email: '',
      image: '',
      description: '',
      loading: false,
      disableButton: 'true',
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
      redirecionar: false,
    });
  }

  enableButton = () => {
    const { userName, email, image, description } = this.state;
    if ((
      userName.length !== 0 && image.length !== 0 && description.length !== 0
    ) && (
      email.includes('@') && email.includes('.com')
    )) this.setState({ disableButton: false });
    else this.setState({ disableButton: true });
  }

  handleChange = ({ target }) => {
    const { value, id } = target;
    if (id === 'name') this.setState({ userName: value });
    if (id === 'email') this.setState({ email: value });
    if (id === 'imagem') this.setState({ image: value });
    if (id === 'descrição') this.setState({ description: value });

    this.enableButton();
  }

  handleClick = async (e) => {
    e.preventDefault();
    const { userName, email, image, description } = this.state;
    const obj = {
      name: userName,
      email,
      image,
      description,
    };

    this.setState({ loading: true });
    await updateUser(obj);
    this.setState({
      redirecionar: true,
    });
  }

  render() {
    const {
      loading,
      userName,
      email,
      image,
      description,
      disableButton,
      redirecionar,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <Loading /> : (
          <form action="">
            <label
              htmlFor="name"
            >
              Nome:
              <input
                data-testid="edit-input-name"
                id="name"
                type="text"
                value={ userName }
                onChange={ this.handleChange }
              />
              <br />
            </label>
            <label
              htmlFor="email"
            >
              Email:
              <input
                data-testid="edit-input-email"
                id="email"
                type="text"
                value={ email }
                onChange={ this.handleChange }
              />
              <br />
            </label>
            <label htmlFor="imagem">
              Nome:
              <input
                data-testid="edit-input-image"
                id="imagem"
                type="text"
                value={ image }
                onChange={ this.handleChange }
              />
              <br />
            </label>
            <label htmlFor="descrição">
              Descrição:
              <textarea
                data-testid="edit-input-description"
                name=""
                id="descrição"
                cols="20"
                rows="5"
                onChange={ this.handleChange }
              >
                {description}
              </textarea>
              <br />
            </label>
            <label htmlFor="button">
              <input
                name="button"
                value="Salvar"
                data-testid="edit-button-save"
                type="button"
                disabled={ disableButton }
                onClick={ this.handleClick }
              />
            </label>
          </form>
        )}
        {redirecionar && <Redirect to="/profile" /> }
        {console.log(redirecionar)}
      </div>
    );
  }
}

export default ProfileEdit;
