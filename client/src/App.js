import React, { Component } from 'react';
import './App.css';
import Spotify from './spotify-web-api.js';

const spotifyWebApi = new Spotify();
class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state ={
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
        name: 'Not Checked', 
        image: ''
      },
      myPlaylists: []
    }
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }
  getNowPlaying() {
    spotifyWebApi.getMyCurrentPlaybackState()
    .then((response) => {
      this.setState({
        nowPlaying: {
          name: response.item.name,
          image: response.item.album.images[0].url
        }
      });
    })
  }
  getMyPlaylists() {
    spotifyWebApi.getUserPlaylists()
    .then((response) => {
      this.setState({
        myPlaylists: response.items,
      });
    })
  }

  render() {
    const display = this.state.myPlaylists.map((playlist) => 
      <li>{playlist.name}</li>
    );
    return (
      <div className="App">
        <a href='http://localhost:8888'>
          <button>Login With Spotify</button>
        </a>
        <div>Now Playing: {this.state.nowPlaying.name }</div>
        <div><img className ="img1" src= {this.state.nowPlaying.image } /></div>
        <div><h2>My Playlists</h2>
        <ul>
          {display}
        </ul>
        </div>
        <button onClick={() => this.getMyPlaylists()}>
          Get My Playlists
        </button>
        <br></br>
        <button onClick={() => this.getNowPlaying()}>
          Get Now Playing
        </button>
      </div>
    );
  }
}

export default App;
