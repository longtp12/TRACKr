import GameCopy from "../models/GameCopy.js";

export const addGameCopies = async (req, res) => {
  const gameCopiesData = req.body.gameCopies;
  try {
    const newGameCopies = await GameCopy.create(gameCopiesData);
    res.status(200).json(newGameCopies);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updatePrice = async (req, res) => {
  try {
    const gameCopy = await GameCopy.findById(req.params.id);
    if (!gameCopy) res.status(404).json("Game not found!");
    const retailPrice = gameCopy.retailPrice;
    const newPrice = req.body.newPrice;
    retailPrice.unshift({ price: newPrice });
    await gameCopy.save();
    res.status(200).json(gameCopy)
  } catch (error) {
    res.status(500).json(error);
  }
};

export const searchGameCopiesByName = async (req, res) => {
  const { title } = req.body;
  try {
    const escapedTitle = escapeRegex(title);
    const regexPattern = new RegExp(escapedTitle.replace(/:/g, ":?"), "i");

    const gameCopies = await GameCopy.find({
      title: { $regex: regexPattern },
    });

    res.status(200).json(gameCopies);
  } catch (error) {
    res.status(500).json(error);
  }
};

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

export const searchGameCopiesByStore = async (req, res) => {
  const { storeName } = req.query;
  try {
    const gameCopies = await GameCopy.find({ storeName });
    res.status(200).json(gameCopies);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const searchGameCopiesDetails = async (req, res) => {
  const { title, storeName, platform } = req.body;
  try {
    const escapedTitle = escapeRegex(title);
    const regexPattern = new RegExp(escapedTitle.replace(/:/g, ":?"), "i");

    const gameCopies = await GameCopy.find({
      title: { $regex: regexPattern },
      storeName,
      platform
    });

    res.status(200).json(gameCopies);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getGameCopies = async (req, res) => {
  try {
    const gameCopies = await GameCopy.find();
    res.status(200).json(gameCopies);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteGameCopy = async (req, res) => {
  try {
    const { id } = req.params;

    const gameCopy = await GameCopy.findById(id);
    const deletedGameCopyTitle = gameCopy.title;
    await GameCopy.findByIdAndDelete(id);
    console.log("Successfully Deleted", deletedGameCopyTitle);
    res.status(200).json("Deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteGameCopies = async (req, res) => {
  const { condition } = req.body;
  try {
    // Delete multiple game copies based on the provided condition
    const result = await GameCopy.deleteMany(condition);

    res.status(200).json({
      message: "Multiple game copies deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
