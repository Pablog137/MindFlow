
export default function TodoListItem() {
  return (
      <div className="p-6 bg-white rounded-lg">
          <span className="font-bold text-orange-400">MEDIUM</span>
          <p className="text-xl py-6">Create final proyect</p>
          <div className="flex items-center justify-between">
              <i className="fa-regular fa-clock text-purple-300"></i>
              <span className="text-sm text-gray-500">15 september</span>
              <i className="fa-solid fa-trash text-red-500"></i>
          </div>
      </div>
  );
}
