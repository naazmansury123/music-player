import React from 'react';

const TrackDetails = ({ track }) => {
  return (
    <div className="track-details">
      <div className="image">
        <img id="songImage" src={track.album.cover_medium} alt={track.title} />
      </div>
      <div className="title">
        <h2 id="musictitle">{track.title}</h2>
        <p id="singer">{track.artist.name}</p>
      </div>
    </div>
  );
};

export default TrackDetails;