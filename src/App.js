import React from 'react';
import Login from './pages/Login';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <main>
        <Login />
        <Search />
        <p>TrybeTunes</p>
      </main>
    );
  }
}

export default App;
