import React from 'react';
import PropTypes from 'prop-types';
import MusicCard from '../componets/MusicCard';
import Header from '../componets/Header';
import getMuscis from '../services/musicsAPI';
import Loading from '../componets/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artAlbum: '',
      nameArtist: '',
      nameAlbum: '',
      musics: [],
      favoriteAPI: false,
      favoriteList: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.handleCardMusic(id);
    const list = await getFavoriteSongs();
    this.setState({
      favoriteList: list,
      favoriteAPI: true,
    });
  }

  handleCardMusic = async (id) => {
    const musicsAlbum = await getMuscis(id);
    this.setState({
      musics: musicsAlbum,
      artAlbum: musicsAlbum[0].artworkUrl100,
      nameArtist: musicsAlbum[0].artistName,
      nameAlbum: musicsAlbum[0].collectionName,
    });
  }

  render() {
    const { favoriteList } = this.state;
    const listTrackId = favoriteList.map((favorite) => favorite.trackId);
    const { nameArtist, nameAlbum, artAlbum, musics, favoriteAPI } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <img src={ artAlbum } alt={ nameArtist } />
        <h2 data-testid="artist-name">{nameArtist}</h2>
        <h3 data-testid="album-name">{nameAlbum}</h3>
        {!favoriteAPI ? <Loading /> : (
          musics.map((music, index) => (
            index === 0 ? false : (
              <MusicCard
                key={ music.trackId }
                music={ music }
                listTrackId={ listTrackId }
              />
            ))))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
