import { useFavorites } from "./FavoritesContext";
import { useRouter } from "next/navigation";

export const TopBar = () => {
  const { favorites, toggleFavoriteFilter } = useFavorites();
  const router = useRouter();

  const handleBannerClick = () => {
    router.replace("/");
    toggleFavoriteFilter(false);
  };

  const handleFavoritesClick = () => {
    toggleFavoriteFilter(true);
  };

  const handleFavoritesKeyPress = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      handleFavoritesClick();
    }
  };

  const handleBannerKeyPress = (
    event: React.KeyboardEvent<HTMLImageElement>,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      handleBannerClick();
    }
  };
  return (
    <header className="header">
      <img
        id="marvel-logo"
        src="/assets/marvel-logo.svg"
        height={54}
        width={200}
        alt="Marvel logo"
        onClick={handleBannerClick}
        onKeyDown={handleBannerKeyPress}
        tabIndex={0}
      />

      <div
        id="favourites-counter-and-button"
        onClick={handleFavoritesClick}
        onKeyDown={handleFavoritesKeyPress}
        tabIndex={1}
        role="button"
      >
        <img src={"/assets/heart-icon.svg"} alt="favourites filter button" />
        <span id="favourites-counter">{favorites.length}</span>
      </div>
    </header>
  );
};
export default TopBar;
