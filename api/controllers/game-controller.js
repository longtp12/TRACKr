import Game from "../models/Game.js";
import { publicRequest } from "../utils/requestMethod.js";

export const addGames = async (req, res) => {
  const gamesData = req.body.games;
  try {
    const newGames = [];

    for (const gameData of gamesData) {
      const { title } = gameData;

      // Check if the game copy already exists
      const existingGame = await Game.findOne({ title });

      if (existingGame) {
        console.log(`Skipping existing game copy: ${title}`);
        continue; // Skip to the next game copy
      }

      const newGame = await Game.create(gameData);
      newGames.push(newGame);
    }

    res.status(200).json(newGames);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const searchGameByName = async (req, res) => {
  const { title } = req.body;
  try {
    const game = await Game.find({
      title: { $regex: new RegExp(title, "i") },
    });

    res.status(200).json(game);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const searchGame = async (req, res) => {
  const { searchQuery } = req.body;
  const page = parseInt(req.query.page);
  const gamesPerPage = parseInt(req.query.gamesPerPage);
  try {
    const skipCount = (page - 1) * gamesPerPage;
    const games = await Game.find({
      $or: [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { platforms: { $regex: new RegExp(searchQuery, "i") } },
        { genres: { $regex: new RegExp(searchQuery, "i") } },
        { publishers: { $regex: new RegExp(searchQuery, "i") } },
        { developers: { $regex: new RegExp(searchQuery, "i") } },
      ],
    })
      .skip(skipCount)
      .limit(gamesPerPage);

    res.status(200).json(games);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const gameFilter = async (req, res) => {
  const { platforms, genres, price } = req.body;
  const page = parseInt(req.query.page);
  const gamesPerPage = parseInt(req.query.gamesPerPage);
  try {
    const skipCount = (page - 1) * gamesPerPage;

    let query = {};

    if (platforms && platforms.length > 0) {
      query.platforms = { $all: platforms };
    }
    if (genres && genres.length > 0) {
      query.genres = { $all: genres };
    }

    let games;

    if (Object.keys(query).length > 0) {
      games = await Game.find(query).skip(skipCount).limit(gamesPerPage);
    } else {
      games = await Game.find().skip(skipCount).limit(gamesPerPage);
    }
    if (price) {
      const filteredGames = [];
      for (const game of games) {
        const filterPriceRes = await publicRequest.post(
          "/gameCopy/filterPrice?condition=" + price,
          { title: game.title }
        );

        if (filterPriceRes.data.message === true) {
          filteredGames.push(game);
        }
      }

      games = filteredGames;
    }

    res.status(200).json(games);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const searchGameBySlug = async (req, res) => {
  const slug = req.params.slug;
  try {
    const game = await Game.findOne({
      slug,
    });

    res.status(200).json(game);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getGamesPaging = async (req, res) => {
  const page = parseInt(req.query.page); // Get the current page from query parameters, default to page 1
  const gamesPerPage = parseInt(req.query.gamesPerPage); // Number of games to fetch per page

  try {
    const skipCount = (page - 1) * gamesPerPage;

    const games = await Game.find().skip(skipCount).limit(gamesPerPage);

    res.status(200).json(games);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getRandomGames = async (req, res) => {
  try {
    const numberOfGames = req.params.numberOfGames;
    // const count = await Game.countDocuments();
    const randomIndices = generateRandomIndices(30, numberOfGames); // Function to generate unique random indices
    const randomGames = await Game.find()
      .skip(randomIndices[0])
      .limit(numberOfGames);
    res.status(200).json(randomGames);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Function to generate unique random indices
const generateRandomIndices = (max, count) => {
  const indices = [];
  while (indices.length < count) {
    const index = Math.floor(Math.random() * max);
    if (!indices.includes(index)) {
      indices.push(index);
    }
  }
  return indices;
};

export const deleteGame = async (req, res) => {
  const { id } = req.params;
  try {
    const game = await Game.findById(id);
    const deletedGameTitle = game.title;
    await Game.findByIdAndDelete(id);
    console.log("Successfully Deleted", deletedGameTitle);
    res.status(200).json("Deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};
