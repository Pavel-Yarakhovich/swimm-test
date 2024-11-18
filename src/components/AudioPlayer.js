import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import AudioPlayer from '../utils/audioplayer';

const Audio = ({ src, title, invert, className = '' }) => {
  const playerContainer = useRef();
  const player = useRef();

  useEffect(() => {
    player.current = new AudioPlayer({ node: playerContainer.current });
    return () => {
      player.current.destroy();
    };
  }, [player.playerContainer]);

  return (
    <figure
      ref={playerContainer}
      className={cn('player', className, {
        'text-black': invert,
      })}>
      <h2 className="h3">Audio</h2>
      {src && (
        <audio
          src={src}
          preload="auto"></audio>
      )}
      <div className="player-header">
        <div
          className="player-play"
          style={{
            filter: invert ? 'invert(100%)' : null,
          }}></div>
        <figcaption className="player-title">{title}</figcaption>
      </div>
      <span
        className="timeline"
        style={{
          filter: invert ? 'invert(100%)' : null,
        }}>
        <span className="timeline-progress"></span>
        <span className="timeline-indicator"></span>
      </span>
      <div className="timings">
        <span className="timings-left">0:00</span>
        <span className="timings-right">-10:00</span>
      </div>
    </figure>
  );
};

Audio.propTypes = {
  src: PropTypes.string.isRequired,
};
export default Audio;
