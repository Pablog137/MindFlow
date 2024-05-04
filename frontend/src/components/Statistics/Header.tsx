type Props = {
    setPeriod: (newPeriod: Period) => void;
    setType: (newType: Type) => void;
    type: string;
    period: string;
};

export default function Header({ period, setPeriod, setType, type }: Props) {
    return (
        <header className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold">MindFlow Stats</h1>
            <div className="flex gap-4">
                <select
                    className="bg-gray-300 text-black p-1 rounded-xl"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value as Period)}
                >
                    <option value="lastMonth">Last Month</option>
                    <option value="lastWeek">Last Week</option>
                    <option value="thisWeek">This Week</option>
                </select>
                <select
                    className="bg-gray-300 text-black p-1 rounded-xl"
                    value={type}
                    onChange={(e) => setType(e.target.value as Type)}
                >
                    <option value="github">Github</option>
                    <option value="todoList">Todo List</option>
                    <option value="calendarTasks">Calendar Tasks</option>
                </select>
            </div>
        </header>
    );
}
