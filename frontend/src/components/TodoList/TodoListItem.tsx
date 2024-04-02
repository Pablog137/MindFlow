
export default function TodoListItem() {
  return (
      <div className="p-4 bg-white rounded-lg">
          <span className="font-bold text-orange-400">MEDIUM</span>
          <p className="text-lg">Create final proyect</p>
          <div className="flex items-center">
              <i className="fa-regular fa-clock text-purple-300"></i>
              <span className="text-sm text-gray-500">15 september</span>
              <i className="fa-solid fa-trash text-red-500"></i>
          </div>
      </div>
  );
}
