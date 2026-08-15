import { useEffect, useId, useRef, useState } from 'react';
import './YouTubeEmbed.css';

function YouTubeEmbed({ videoId }) {
  const [loadedVideoId, setLoadedVideoId] = useState(null);
  const iframeRef = useRef(null);
  const privacyId = useId();

  useEffect(() => {
    if (loadedVideoId === videoId) iframeRef.current?.focus();
  }, [loadedVideoId, videoId]);

  if (!videoId) return null;

  const watchUrl = `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;
  const isLoaded = loadedVideoId === videoId;

  return (
    <div className="youtube-embed-wrapper">
      <div className="youtube-embed">
        {isLoaded ? (
          <iframe
            ref={iframeRef}
            src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}`}
            title="Exercise demonstration video"
            tabIndex={0}
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className="youtube-embed__load"
            aria-describedby={privacyId}
            onClick={() => setLoadedVideoId(videoId)}
          >
            Load video
          </button>
        )}
      </div>
      <p className="youtube-embed__privacy" id={privacyId}>
        Loading the video connects to YouTube, which may receive usage data.
      </p>
      <a className="youtube-embed__link" href={watchUrl} target="_blank" rel="noreferrer">
        Watch on YouTube (opens in a new tab)
      </a>
    </div>
  );
}

export default YouTubeEmbed;
