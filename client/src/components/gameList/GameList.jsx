import { publicRequest } from "../../requestMethods";
import { GameItem } from "../gameItem/GameItem";
import GameListSkeleton from "./GameListSkeleton";
import "./gameList.scss";
import React, { useEffect, useState } from "react";

export const GameList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const getGames = async () => {  
      const res = await publicRequest.get(`/game?gamesPerPage=12&page=${page}`);
      setGames((prev) => [...prev, ...res.data]);
      setIsLoading(false);
    };
    getGames();
  }, [page]);
console.log(page);
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    if (windowHeight + scrollTop + 1 >= scrollHeight) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="gameListContainer">
      {isLoading ? (
        <GameListSkeleton cards={20} />
      ) : (
        games.map((game) => <GameItem key={game._id} gameData={game} />)
      )}
    </div>
  );
};
