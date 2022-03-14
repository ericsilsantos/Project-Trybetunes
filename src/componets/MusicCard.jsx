import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      loadind: false,
    };
  }

  componentDidMount() {
    const { listTrackId, music } = this.props;
    const bool = listTrackId.includes(music.trackId);
    this.setState({
      checked: bool,
    });
  }

  handleClickFavorite = async ({ target }) => {
    const { music } = this.props;
    const { checked } = target;

    if (!checked) {
      this.setState({ loadind: true });
      await removeSong(music);
      this.setState({
        loadind: false,
        checked: false,
      });
    } else {
      this.setState({ loadind: true });
      await addSong(music);
      this.setState({
        loadind: false,
        checked: true,
      });
    }
  }

  render() {
    const { loadind, checked } = this.state;
    const { music: { trackName, previewUrl, trackId } } = this.props;
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
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  listTrackId: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};

export default MusicCard;
