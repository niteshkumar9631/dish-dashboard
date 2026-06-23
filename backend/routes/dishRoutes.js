const express = require("express");
const router = express.Router();
const Dish = require("../models/Dish");

// GET /api/dishes -> fetch all dishes
router.get("/", async (req, res) => {
  try {
    const dishes = await Dish.find().sort({ createdAt: 1 });
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching dishes", error: error.message });
  }
});

// PATCH /api/dishes/:id/toggle -> toggle isPublished status
router.patch("/:id/toggle", async (req, res) => {
  try {
    const dish = await Dish.findOne({ dishId: req.params.id });

    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    dish.isPublished = !dish.isPublished;
    await dish.save();

    // Emit real-time event to all connected clients
    const io = req.app.get("io");
    io.emit("dishUpdated", dish);

    res.status(200).json(dish);
  } catch (error) {
    res.status(500).json({ message: "Error toggling dish status", error: error.message });
  }
});

// POST /api/dishes -> add a new dish
router.post("/", async (req, res) => {
  try {
    const { dishName, imageUrl } = req.body;

    if (!dishName || !imageUrl) {
      return res.status(400).json({ message: "dishName and imageUrl are required" });
    }

    // Generate a unique dishId using timestamp (always unique, no collisions)
    const newDishId = Date.now().toString();

    const newDish = await Dish.create({
      dishId: newDishId,
      dishName,
      imageUrl,
      isPublished: true,
    });

    const io = req.app.get("io");
    io.emit("dishInserted", newDish);

    res.status(201).json(newDish);
  } catch (error) {
    console.error("Add dish error:", error);
    res.status(500).json({ message: "Error adding dish", error: error.message });
  }
});

module.exports = router;