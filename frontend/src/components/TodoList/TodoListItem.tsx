export default function TodoListItem() {
    return (
        <div className="p-5 bg-white rounded-lg">
            <span className="font-bold text-orange-400">MEDIUM</span>
            <p className="text-xl py-6">Create final proyect</p>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <i className="fa-regular fa-clock text-purple-300 mr-4 text-lg"></i>
                    <span className="text-sm text-gray-500">15 september</span>
                </div>
                <i className="fa-solid fa-trash text-red-500 text-lg"></i>
            </div>
        </div>
    );
}
