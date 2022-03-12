import React from 'react';
import PropTypes from 'prop-types';
import MusicCard from '../componets/MusicCard';
import Header from '../componets/Header';
import getMuscis from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artAlbum: '',
      nameArtist: '',
      nameAlbum: '',
      musics: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.handleCardMusic(id);
  }

  handleCardMusic = async (id) => {
    const musicsAlbum = await getMuscis(id);
    console.log(musicsAlbum);
    this.setState({
      musics: musicsAlbum,
      artAlbum: musicsAlbum[0].artworkUrl100,
      nameArtist: musicsAlbum[0].artistName,
      nameAlbum: musicsAlbum[0].collectionName,
    });
  }

  render() {
    const { nameArtist, nameAlbum, artAlbum, musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <img src={ artAlbum } alt={ nameArtist } />
        <h2 data-testid="artist-name">{nameArtist}</h2>
        <h3 data-testid="album-name">{nameAlbum}</h3>
        {musics.map((music, index) => (
          index === 0 ? false : (
            <MusicCard
              key={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
            />
          )))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.string.isRequired,
};

export default Album;
