import './YouTubeEmbed.css';

function YouTubeEmbed({ videoId }) {
  if (!videoId) return null;

  return (
    <div className="youtube-embed-wrapper">
      <div className="youtube-embed">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title="Exercise demonstration video"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <p className="youtube-embed__privacy">
        YouTube may receive usage data when this video loads.
      </p>
    </div>
  );
}

export default YouTubeEmbed;
