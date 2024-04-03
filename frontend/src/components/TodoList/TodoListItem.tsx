type Props = {
    difficulty: number;
    description: string;
    due_date: string;
};

const difficultyLevels = ["Easy", "Medium", "Hard"];
const difficultyColors = ["green", "yellow", "red"];

export default function TodoListItem({
    difficulty,
    description,
    due_date,
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
                <i className="fa-solid fa-trash text-red-500 text-lg"></i>
            </div>
        </div>
    );
}
