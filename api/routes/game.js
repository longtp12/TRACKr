import express from "express";
import {
  addGames,
  deleteGame,
  gameFilter,
  getGames,
  getGamesPaging,
  getRandomGames,
  searchGame,
  searchGameByName,
  searchGameBySlug,
} from "../controllers/game-controller.js";

const router = express.Router();

router.post("/", addGames);

router.post("/search", searchGame)

router.post("/searchName", searchGameByName);

router.post("/searchCat", gameFilter);

router.get("/searchSlug/:slug", searchGameBySlug);

router.get("/all", getGames);

router.get("/", getGamesPaging);

router.get("/random/:numberOfGames", getRandomGames);

router.delete("/:id", deleteGame);

export default router;
