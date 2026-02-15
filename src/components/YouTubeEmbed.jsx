import './YouTubeEmbed.css';

function YouTubeEmbed({ videoId }) {
  if (!videoId) return null;

  return (
    <div className="youtube-embed">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="Exercise demonstration video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export default YouTubeEmbed;
