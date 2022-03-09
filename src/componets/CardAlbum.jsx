import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardAlbum extends React.Component {
  render() {
    const { album } = this.props;
    const { collectionId, artworkUrl100, collectionName } = album;
    return (
      <Link
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
      >
        <img src={ artworkUrl100 } alt={ collectionName } />
        <p>{collectionName}</p>
      </Link>
    );
  }
}

CardAlbum.propTypes = {
  album: PropTypes.shape([]).isRequired,
};

export default CardAlbum;
