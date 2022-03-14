import React from 'react';
import Header from '../componets/Header';
import Loading from '../componets/Loading';
import MusicCard from '../componets/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      listFavorite: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.handleClick();
  }

  handleClick = async () => {
    this.setState({
      loading: true,
    });
    const list = await getFavoriteSongs();
    this.setState({
      loading: false,
      listFavorite: list,
    });
  }

  render() {
    const { loading, listFavorite } = this.state;
    const listTrackId = listFavorite.map((favorite) => favorite.trackId);
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading ? <Loading /> : (
          listFavorite.map((music) => (
            <MusicCard
              key={ music.trackId }
              music={ music }
              listTrackId={ listTrackId }
              click={ this.handleClick }
            />
          ))
        )}
      </div>
    );
  }
}

export default Favorites;
