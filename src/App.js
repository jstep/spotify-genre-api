import './App.css';
import React, {useState, useEffect} from 'react'
import Dropdown from './Dropdown';
import Listbox from './Listbox';
import Detail from './Detail';
import axios from 'axios';
import { clientId, clientSecret } from './Credentials';

function App() {


const [token, setToken] = useState('');
const [genres, setGenres] = useState({selectedGenre: '', listOfGenresFromAPI: []});
const [playlist, setPlaylist] = useState({selectedPlaylist: '', listOfPlaylistsFromAPI: []})
const [tracks, setTracks] = useState({selectedTrack: '', listOfTracksFromAPI: []})
const [trackDetail, setTrackDetail] = useState(null);

useEffect(() => {
  axios('https://accounts.spotify.com/api/token', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
    },
    data: 'grant_type=client_credentials',
    method: 'POST'
    })
    .then(tokenResponse => {
      setToken(tokenResponse.data.access_token);

      axios('https://api.spotify.com/v1/browse/categories?locale=en_CA', {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
      })
      .then(genreResponse => {
        setGenres({
          selectedGenre: genres.selectedGenre,
          listOfGenresFromAPI: genreResponse.data.categories.items
        });
      });
  })

}, [genres.selectedGenre, clientId, clientSecret])

const genreChanged = val => {
  setGenres({
    selectedGenre: val,
    listOfGenresFromAPI: genres.listOfGenresFromAPI
  });

  axios(`https://api.spotify.com/v1/browse/categories/${val}/playlists?limit=10`, {
    method: 'GET',
    headers: { 'Authorization' : 'Bearer ' + token}
  })
  .then(playlistResponse => {
    setPlaylist({
      selectedPlaylist: playlist.selectedPlaylist,
      listOfPlaylistsFromAPI: playlistResponse.data.playlists.items
    })
  });
}

const playlistChanged = val => {
  setPlaylist({
    selectedPlaylist: val,
    listOfPlaylistsFromAPI: playlist.listOfPlaylistsFromAPI
  });
}

const buttonClicked = e => {
  e.preventDefault();

  axios(`https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist}/tracks?limit=10`, {
    method: 'GET',
    headers: { 'Authorization' : 'Bearer ' + token}
  })
  .then(tracksResponse => {
    setTracks({
      selectedTrack: tracks.selectedTrack,
      listOfTracksFromAPI: tracksResponse.data.items
    })
  });
}

const listboxClicked = val => {
  const currentTracks = [...tracks.listOfTracksFromAPI];
  const trackInfo = currentTracks.filter(t => t.track.id === val);
  setTrackDetail(trackInfo[0].track);
}


  return (
    <div className='container'>
      <form onSubmit={buttonClicked}>
          <Dropdown option={genres.listOfGenresFromAPI} selectedValue={genres.selectedGenre} changed={genreChanged} />
          <Dropdown option={playlist.listOfPlaylistsFromAPI} selectedValue={playlist.selectedPlaylist} changed={playlistChanged} />
          <div className='col-sm-6 row form-group px-0'>
            <button type='submit' className="btn btn-success col-sm-12">
              Search
            </button>
          </div>
          <div className='row'>
            <Listbox items={tracks.listOfTracksFromAPI} clicked={listboxClicked} />
            {trackDetail && <Detail {...trackDetail} /> }
          </div>
      </form>
    </div>
  );
}

export default App;
