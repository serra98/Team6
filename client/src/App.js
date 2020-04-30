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
      <div className = "playlist"><ul><li>{playlist.name}</li></ul></div>
    );
    return (
      <div className="App">
        <a href='http://localhost:8888'>
          <button className = "button">Login With Spotify</button>
        </a>
        <div><h1>Now Playing: {this.state.nowPlaying.name }</h1></div>
        <div><img className ="img1" src= {this.state.nowPlaying.image } /></div>
        <h2>My Playlists</h2>
        <div className= "playlist">{display} </div>
        <button className = "button" onClick={() => this.getMyPlaylists()}>
          Get My Playlists
        </button>
        <br></br>
        <button className = "button" onClick={() => this.getNowPlaying()}>
          Get Now Playing
        </button>
      </div>
    );
  }
}

export default App;
//code sources 
/**
 *https://github.com/jonnyk20/spotify-node-react-starter-kit
- https://medium.com/@jonnykalambay/now-playing-using-spotifys-awesome-api-with-react-7db8173a7b13
 Videos and websites we looked over to get more information: 
  https://www.youtube.com/watch?v=f5OLDvwP-Ug
  w3schools.com and react.org
  set up/code written by Sarah Oh and Serra Jung 
 */