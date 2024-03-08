import { CharacterCard } from "./CharacterCard/CharacterCard";

import { useState, useEffect } from "react";

import { useFavorites } from "./FavoritesContext";
import LoaderBar from "./LoaderBar";

import "./HomePage.css";

type Character = {
  id: string;
  name: string;
};
export function HomePage() {
  const [displayedCharacters, setDisplayedCharacters] = useState<Character[]>(
    [],
  );

  const API_KEY = process.env.NEXT_PUBLIC_MARVEL_API_KEY;
  const API_URL = "http://gateway.marvel.com/v1/public/characters";

  const [searchTerm, setSearchTerm] = useState("");

  const { favorites, filterByFavorites } = useFavorites();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [areFavoritesLoading, setAreFavoritesLoading] =
    useState<boolean>(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let params = "";
        if (searchTerm !== "") {
          params = "&nameStartsWith=" + searchTerm;
        }

        const response = await fetch(
          `${API_URL}?apikey=${API_KEY}&limit=50` + params,
        );
        const data = await response.json();

        setDisplayedCharacters(data.data.results);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (!filterByFavorites) {
      fetchData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, filterByFavorites]);

  useEffect(() => {
    if (filterByFavorites) {
      setAreFavoritesLoading(true);
      const fetchAndShowFavorites = async () => {
        let fetchedFavorites: Character[] = [];
        try {
          for (const element of favorites) {
            const response = await fetch(
              `${API_URL}?apikey=${API_KEY}&id=${element}`,
            );
            const data = await response.json();
            fetchedFavorites.push(data.data.results[0] as Character); // Push fetched data into the array
          }
          console.log(fetchedFavorites);
          if (searchTerm !== "") {
            console.log(searchTerm);
            console.log(fetchedFavorites);
            setDisplayedCharacters(
              fetchedFavorites.filter((favorite) =>
                favorite.name
                  ?.toLowerCase()
                  .startsWith(searchTerm.toLowerCase()),
              ),
            );
          } else {
            setDisplayedCharacters(fetchedFavorites);
          }
          setAreFavoritesLoading(false);
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      };
      fetchAndShowFavorites();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, filterByFavorites, favorites]);
  return (
    <div className="App">
      {<LoaderBar completed={!isLoading} />}
      <div
        className={"character-list-container" + (!isLoading ? " fade-in" : "")}
      >
        {
          <h1
            className={
              "favorites-header" + (filterByFavorites ? " fade-in grow" : "")
            }
          >
            FAVORITES
          </h1>
        }
        <input
          className="character-search-bar"
          type="text"
          name="searchTerm"
          id=""
          placeholder="SEARCH A CHARACTER..."
          onChange={handleChange}
        />
        <span className={"character-results"}>
          {displayedCharacters.length} results
        </span>
        <div
          className={
            "character-list" + (areFavoritesLoading ? " favorites-loading" : "")
          }
        >
          {displayedCharacters.map((character) => (
            <CharacterCard
              key={character["id"]}
              character={character}
            ></CharacterCard>
          ))}
        </div>
      </div>
    </div>
  );
}
export default HomePage;
