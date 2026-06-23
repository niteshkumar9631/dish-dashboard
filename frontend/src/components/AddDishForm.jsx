import { useState } from "react";

function AddDishForm({ onAdd, onClose }) {
  const [dishName, setDishName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dishName || !imageUrl) return;

    setSubmitting(true);
    try {
      await onAdd({ dishName, imageUrl });
      setDishName("");
      setImageUrl("");
      onClose();
    } catch (error) {
      console.error("Error adding dish:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Dish</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Dish Name"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium disabled:opacity-50"
            >
              {submitting ? "Adding..." : "Add Dish"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddDishForm;