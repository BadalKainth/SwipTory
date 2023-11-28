const express = require("express");
const { authorizer } = require("../utils/authorizer");
const { toObjectId } = require("../utils/objectid");
const { HTTPError } = require("../utils/error");
const { Story } = require("../models/story");

const router = express.Router();

router.get("/stories", async (req, res) => {
  const stories = await Story.find();
  return res.send(stories);
});

router.post("/story", authorizer, async (req, res) => {
  const userId = req.auth.userId;
  const story = await Story.create({
    ...req.body,
    userId: toObjectId(userId),
  });
  return res.send(story);
});

router.get("/story/me", authorizer, async (req, res) => {
  const userId = req.auth.userId;

  const stories = await Story.find({
    userId,
  });

  return res.send(stories);
});

router.get("/story/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const story = await Story.findById(id);

    if (!story) throw new HTTPError(404, "Story not found");

    return res.send(story);
  } catch (error) {
    next(error);
  }
});

router.put("/story/:id", authorizer, async (req, res) => {
  const id = req.params.id;

  const userId = req.auth.userId;
  const story = await Story.findByIdAndUpdate(id, {
    ...req.body,
    userId: toObjectId(userId),
  });
  return res.send(story);
});

router.delete("/story/:id", authorizer, async (req, res) => {
  const id = req.params.id;
  const userId = req.auth.userId;

  await Story.deleteOne({
    _id: id,
    userId,
  });

  return res.send("Story deleted successfully.");
});

router.get("/story/category/:category", async (req, res) => {
  const category = req.params.category;

  const stories = await Story.find({
    category,
  });

  return res.send(stories);
});

router.get("/story/bookmarked", (req, res) => {
  const category = req.params.category;

  res.send(category);
});

module.exports = router;
