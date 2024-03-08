import { useState } from "react";
import { useFavorites } from "../FavoritesContext";
import { FavButton } from "../common/FavButton";
import { useRouter } from "next/navigation";

import "./CharacterCard.css";
export function CharacterCard({ character }: any) {
  //"./characters/"+character.resourceURI.split("/").pop()
  const { favorites, toggleFavorite } = useFavorites();

  const [hover, setHover] = useState(false);

  const router = useRouter();
  const handleFavoriteToggle = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    toggleFavorite(character.id);
  };
  const handleCharacterClick = () => {
    router.push("characters/" + character["id"]);
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (event.key === "Enter" || event.key === " ") {
      handleCharacterClick();
    }
  };

  const handleButtonKeyPress = (
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    if (event.key === "Enter" || event.key === " ") {
      handleCharacterClick();
    }
  };

  return (
    <div
      className="character-card"
      onClick={handleCharacterClick}
      onKeyDown={handleKeyPress}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      tabIndex={0}
    >
      <img
        className="character-thumbnail"
        src={
          character.thumbnail.path +
          "/portrait_xlarge" +
          "." +
          character.thumbnail.extension
        }
        alt=""
      />
      <div className="character-shade"></div>
      <div className="character-title">
        <span className="character-name-and-fav-button">
          <span className="character-name">{character.name}</span>
          <button
            className="fav-button"
            onClick={handleFavoriteToggle}
            onKeyDown={handleButtonKeyPress}
            aria-label="Adds a character to favourites"
            title="fav button"
          >
            <FavButton
              toggled={!!favorites.find((favorite) => favorite == character.id)}
              size="small"
              invert={hover}
            />
          </button>
        </span>
      </div>
    </div>
  );
}
