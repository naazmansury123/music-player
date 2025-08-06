import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from './components/SearchBar';
import TrackDetails from './components/TrackDetails';
import Player from './components/Player';
import Lyrics from './components/Lyrics';
import Loader from './components/Loader'; // We will create this component

const App = () => {
  const [song, setSong] = useState(null);
  const [lyrics, setLyrics] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Dynamic background based on album art
  const backgroundStyle = song ? { backgroundImage: `url(${song.album.cover_xl})` } : {};

  const deezerApi = {
    baseUrl: 'https://deezerdevs-deezer.p.rapidapi.com/search',
    apiKey: 'a30104380cmsh9540154b3e422e6p1bbe00jsn7f0be4b7b67a', // IMPORTANT: Replace with your valid RapidAPI key
    host: 'deezerdevs-deezer.p.rapidapi.com',
  };

  const lyricsApiUrl = 'https://api.lyrics.ovh/v1';

  const searchSong = async (query) => {
    if (!query) return;

    setLoading(true);
    setError('');
    setSong(null);
    setLyrics('');

    try {
      const response = await axios.get(deezerApi.baseUrl, {
        params: { q: query },
        headers: {
          'x-rapidapi-key': deezerApi.apiKey,
          'x-rapidapi-host': deezerApi.host,
        },
      });

      if (response.data.data.length > 0) {
        const track = response.data.data[0];
        setSong(track);
        fetchLyrics(track.artist.name, track.title);
      } else {
        setError('Music not found. Try another song!');
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 429) {
          setError('Too many requests! Please wait a moment before trying again.');
        } else if (err.response.status === 403) {
           setError('API Key is invalid or you are not subscribed. Please check your key.');
        } else {
           setError('Something went wrong. Please try again later.');
        }
      } else {
         setError('Network Error. Please check your connection.');
      }
      setSong(null);
      setLyrics('');
    } finally {
      setLoading(false);
    }
  };

  const fetchLyrics = async (artist, title) => {
    try {
      const response = await axios.get(`${lyricsApiUrl}/${artist}/${title}`);
      setLyrics(response.data.lyrics || 'Lyrics not found for this song.');
    } catch (err) {
      setLyrics('Could not fetch lyrics.');
    }
  };

  return (
    <div className="app-container" style={backgroundStyle}>
      <div className="main">
        <header className="header">
          <h1>Advanced Music Player</h1>
        </header>
        <SearchBar onSearch={searchSong} isLoading={loading} />

        {loading && <Loader />}
        
        {error && !loading && <p className="error">{error}</p>}
        
        {!loading && !error && song && (
          <div className="results-fade-in">
            <TrackDetails track={song} />
            <Player track={song} />
            <Lyrics lyrics={lyrics} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;