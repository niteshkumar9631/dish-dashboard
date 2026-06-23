require("dotenv").config();
const mongoose = require("mongoose");
const Dish = require("./models/Dish");

// Replace this with your actual dish data (same format)
const dishesData = [
  {
    dishId: "1",
    dishName: "Paneer Butter Masala",
    imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400",
    isPublished: true,
  },
  {
    dishId: "2",
    dishName: "Veg Biryani",
    imageUrl: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400",
    isPublished: true,
  },
  {
    dishId: "3",
    dishName: "Chole Bhature",
    imageUrl: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=400",
    isPublished: false,
  },
  {
    dishId: "4",
    dishName: "Masala Dosa",
    imageUrl: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400",
    isPublished: true,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding...");

    await Dish.deleteMany({});
    console.log("Old dishes removed.");

    await Dish.insertMany(dishesData);
    console.log(`${dishesData.length} dishes inserted successfully.`);

    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error.message);
    process.exit(1);
  }
};

seedDB();