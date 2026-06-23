import { useEffect, useState } from "react";
import { getDishes, toggleDishStatus, addDish } from "./api";
import { socket } from "./socket";
import DishCard from "./components/DishCard";
import AddDishForm from "./components/AddDishForm";

function App() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Fetch dishes on initial load
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const data = await getDishes();
        setDishes(data);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, []);

  // Listen for real-time updates from backend (Socket.io)
  useEffect(() => {
    socket.on("dishUpdated", (updatedDish) => {
      setDishes((prevDishes) =>
        prevDishes.map((dish) =>
          dish.dishId === updatedDish.dishId ? updatedDish : dish
        )
      );
    });

    socket.on("dishInserted", (newDish) => {
      setDishes((prevDishes) => {
        // avoid duplicate if this client itself just added it
        const exists = prevDishes.some((d) => d.dishId === newDish.dishId);
        if (exists) return prevDishes;
        return [...prevDishes, newDish];
      });
    });

    socket.on("dishDeleted", (deletedId) => {
      setDishes((prevDishes) =>
        prevDishes.filter((dish) => dish._id !== deletedId)
      );
    });

    return () => {
      socket.off("dishUpdated");
      socket.off("dishInserted");
      socket.off("dishDeleted");
    };
  }, []);

  // Toggle handler (button click from dashboard)
  const handleToggle = async (dishId) => {
    try {
      const updatedDish = await toggleDishStatus(dishId);
      setDishes((prevDishes) =>
        prevDishes.map((dish) =>
          dish.dishId === updatedDish.dishId ? updatedDish : dish
        )
      );
    } catch (error) {
      console.error("Error toggling dish:", error);
    }
  };

  // Add dish handler (form submit)
  const handleAddDish = async (dishData) => {
    const newDish = await addDish(dishData);
    setDishes((prevDishes) => [...prevDishes, newDish]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading dishes...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dish Dashboard</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium"
        >
          + Add Dish
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {dishes.map((dish) => (
          <DishCard key={dish._id} dish={dish} onToggle={handleToggle} />
        ))}
      </div>

      {showForm && (
        <AddDishForm onAdd={handleAddDish} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}

export default App;