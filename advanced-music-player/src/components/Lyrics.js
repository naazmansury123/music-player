import React from 'react';

const Lyrics = ({ lyrics }) => {
  return (
    <div className="lyrics-container">
      <h3>Lyrics</h3>
      <pre className="lyrics-text">{lyrics}</pre>
    </div>
  );
};

export default Lyrics;