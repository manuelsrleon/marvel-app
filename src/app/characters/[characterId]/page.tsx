"use client";
import { useState, useEffect } from "react";
import { Comic } from "./Comic";
import TopBar from "@/app/TopBar";
import { FavButton } from "@/app/common/FavButton";
import { useFavorites } from "@/app/FavoritesContext";
import "./CharacterPage.css";

import LoaderBar from "@/app/LoaderBar";
export default function CharacterPage({
  params,
}: {
  params?: { characterId: string };
}) {
  const [character, setCharacter] = useState<any>();
  const [comics, setComics] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const characterId = params?.characterId;

  const API_KEY = process.env.NEXT_PUBLIC_MARVEL_API_KEY;
  const API_URL = "http://gateway.marvel.com/v1/public/characters/";

  const { favorites, toggleFavorite } = useFavorites();

  const handleFavoriteToggle = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    toggleFavorite(character.id);
  };
  useEffect(() => {
    if (!characterId) return;
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_URL}${characterId}?apikey=${API_KEY}`,
        );
        const data = await response.json();
        setCharacter(data.data.results[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
    };
    if (characterId !== undefined) {
      fetchData();
    }
  }, [characterId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_URL}${characterId}/comics?apikey=${API_KEY}`,
        );
        const data = await response.json();
        const sortedComics = data.data.results.sort((a: any, b: any) => {
          if (a["dates"][0] > b["dates"][0]) {
            return 1;
          } else {
            return -1;
          }
        });
        setComics(sortedComics);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (characterId !== undefined) {
      fetchData();
    }
  }, [characterId]);

  return (
    <>
      <TopBar />
      {<LoaderBar completed={!isLoading} />}
      <div
        className={"character-page" + (!isLoading ? " slide-and-fade-in" : "")}
      >
        <div className="character-container">
          <div className="character-info">
            <img
              className="character-image"
              src={
                character?.thumbnail.path + "." + character?.thumbnail.extension
              }
              alt=""
            />
            <div className="character-text">
              <h1 className="character-page-name">
                {character?.name}
                <button
                  className="fav-button"
                  onClick={handleFavoriteToggle}
                  tabIndex={0}
                  title="fav button"
                >
                  <FavButton
                    toggled={
                      !!favorites.find((favorite) => favorite == character?.id)
                    }
                  />
                </button>
              </h1>
              <div className="character-description">
                {character?.description}
              </div>
            </div>
          </div>
        </div>
        <div className="comics-container">
          <h2 className="comics-section-header">COMICS</h2>
          <div className="comics-row" tabIndex={0}>
            {comics.map((comic) => (
              <Comic key={comic.id} comic={comic} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
