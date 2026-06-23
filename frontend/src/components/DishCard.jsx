function DishCard({ dish, onToggle }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
      <img
        src={dish.imageUrl}
        alt={dish.dishName}
        className="w-full h-40 object-cover bg-gray-100"
        onError={(e) => {
          e.target.src = "https://placehold.co/300x200?text=No+Image";
        }}
      />
      <div className="p-4 flex flex-col gap-3 flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{dish.dishName}</h3>

        <span
          className={`text-sm font-medium px-2 py-1 rounded-full w-fit ${
            dish.isPublished
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {dish.isPublished ? "Published" : "Unpublished"}
        </span>

        <button
          onClick={() => onToggle(dish.dishId)}
          className={`mt-auto py-2 rounded-lg font-medium text-white transition ${
            dish.isPublished
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {dish.isPublished ? "Unpublish" : "Publish"}
        </button>
      </div>
    </div>
  );
}

export default DishCard;