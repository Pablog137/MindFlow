import TodoListItem from "./TodoListItem";

type Props = {
    status: string;
};

export default function TodoList({ status }: Props) {
    return (
        <div className="col-span-12 lg:col-span-4 bg-[#EBECF0] text-black rounded-lg p-6 border-2 border-purple-500 flex flex-col ">
            <h2 className="text-xl text-center font-bold pb-3">{status}</h2>
            <div className="flex flex-col gap-2 flex-grow">
                <TodoListItem />
                <TodoListItem />
            </div>
            <div className="flex justify-center pt-6">
                <button className="bg-purple-500 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-md flex justify-center items-center gap-4">
                    <i className="fa-solid fa-plus"></i>
                    <p>Add a task</p>
                </button>
            </div>
        </div>
    );
}
