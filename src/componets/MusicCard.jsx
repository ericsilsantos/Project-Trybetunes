import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      loadind: false,
    };
  }

  handleClickFavorite = async () => {
    this.setState({ loadind: true });
    await addSong();
    this.setState({
      loadind: false,
      checked: true,
    });
  }

  render() {
    const { loadind, checked } = this.state;
    const { trackName, previewUrl, trackId } = this.props;
    return (
      <div>
        <span>{trackName}</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
        </audio>
        {loadind ? <Loading /> : (
          <label
            htmlFor={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
          >
            Favorita
            <input
              id={ trackId }
              checked={ checked }
              onChange={ this.handleClickFavorite }
              type="checkbox"
            />
          </label>)}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
};

export default MusicCard;
