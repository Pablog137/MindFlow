type Props = {
    difficulty: number;
    description: string;
    due_date: string;
    id: string | number;
    removeTask: (id: string | number) => void;
};

const difficultyLevels = ["Easy", "Medium", "Hard"];
const difficultyColors = ["green", "yellow", "red"];

export default function TodoListItem({
    difficulty,
    description,
    due_date,
    id,
    removeTask,
}: Props) {
    return (
        <div className="p-5 bg-white rounded-lg">
            <span
                className={`font-bold text-${
                    difficultyColors[difficulty - 1]
                }-400`}
            >
                {difficultyLevels[difficulty - 1]}
            </span>
            <p className="text-xl py-6">{description}</p>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <i className="fa-regular fa-clock text-purple-300 mr-4 text-lg"></i>
                    <span className="text-sm text-gray-500">{due_date}</span>
                </div>
                <button>
                    <i
                        className="fa-solid fa-trash text-red-500 hover:text-red-300 hover:text-xl text-lg"
                        onClick={() => removeTask(id)}
                    ></i>
                </button>
            </div>
        </div>
    );
}
