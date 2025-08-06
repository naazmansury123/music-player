import React, { useEffect, useRef } from 'react';

const Player = ({ track }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().catch(error => console.log("Auto-play was prevented.", error));
    }
  }, [track]);

  return (
    <div className="play">
      <audio id="myaudio" controls ref={audioRef}>
        <source id="audiosource" src={track.preview} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Player;