import "./Comic.css";
export function Comic({ comic }: any) {
  return (
    <div className="comic-container">
      <img
        className="comic-cover"
        src={comic.thumbnail.path + "." + comic.thumbnail.extension}
        alt=""
      />
      <span className="comic-title">{comic.title}</span>
      <span className="comic-year">
        {new Date(Date.parse(comic.dates[0].date)).getFullYear()}
      </span>
    </div>
  );
}
