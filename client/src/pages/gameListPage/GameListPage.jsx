import { useEffect, useState } from "react";
import { Navbar } from "../../components/navbar/Navbar";
import "./gameListPage.scss";
import { publicRequest } from "../../requestMethods";
import { GameList } from "../../components/gameList/GameList";
import { GameListPageFilter } from "../../components/gameListPageFilter/GameListPageFilter";

const GameListPage = () => {
  

  return (
    <div>
      <Navbar />
      <div className="gameListPageBodyContainer">
        <GameListPageFilter/>
        <GameList />
      </div>
    </div>
  );
};

export default GameListPage;
