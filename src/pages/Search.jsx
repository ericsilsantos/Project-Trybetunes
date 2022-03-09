import React from 'react';
import Header from '../componets/Header';
import Loading from '../componets/Loading';
import CardAlbum from '../componets/CardAlbum';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const LENGTH_MIN = 2;

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searched: false,
      loading: false,
      inputValue: '',
      disabledButton: true,
      albums: '',
      name: '',
    };
  }

  handleButtonDisabled = ({ target }) => {
    const { value } = target;
    this.setState({
      inputValue: value,
      disabledButton: (value.length < LENGTH_MIN),
    });
  }

  handleClickButton = async () => {
    const { inputValue } = this.state;
    this.setState({ loading: true });
    const artist = await searchAlbumsAPI(inputValue);
    this.setState({
      name: inputValue,
      inputValue: '',
      disabledButton: true,
      loading: false,
      albums: artist,
      searched: true,
    });
  }

  render() {
    const { name, searched, inputValue, disabledButton, loading, albums } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <Loading /> : (
          <form action="">
            <input
              data-testid="search-artist-input"
              value={ inputValue }
              onChange={ this.handleButtonDisabled }
              type="text"
            />
            <button
              data-testid="search-artist-button"
              disabled={ disabledButton }
              onClick={ this.handleClickButton }
              type="button"
            >
              Pesquisar
            </button>
          </form>
        )}
        {searched && (albums.length === 0 ? (
          <p>Nenhum álbum foi encontrado</p>
        ) : (
          <div>
            <p>{`Resultado de álbuns de: ${name}`}</p>
            {albums.map((album) => (
              <CardAlbum
                key={ album.collectionId }
                album={ album }
              />))}
          </div>
        ))}
      </div>
    );
  }
}

export default Search;
