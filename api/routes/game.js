import express from "express";
import {
  addGames,
  deleteGame,
  getGames,
  getGamesPaging,
  getRandomGames,
  searchGameByName,
  searchGameBySlug,
} from "../controllers/game-controller.js";

const router = express.Router();

router.post("/", addGames);

router.post("/searchName", searchGameByName);

router.get("/searchSlug/:slug", searchGameBySlug);

router.get("/all", getGames);
router.get("/", getGamesPaging);

router.get("/random/:numberOfGames", getRandomGames)

router.delete("/:id", deleteGame);

export default router;
