import React from 'react';
import Header from '../componets/Header';

const LENGTH_MIN = 2;

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      disabledButton: true,
    };
  }

  handleButtonDisabled = ({ target }) => {
    const { value } = target;
    this.setState({
      disabledButton: (value.length < LENGTH_MIN),
    });
  }

  render() {
    const { disabledButton } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form action="">
          <input
            data-testid="search-artist-input"
            onChange={ this.handleButtonDisabled }
            type="text"
          />
          <button
            data-testid="search-artist-button"
            disabled={ disabledButton }
            type="button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
