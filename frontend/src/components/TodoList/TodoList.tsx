import TodoListItem from "./TodoListItem";

export default function TodoList({ status }) {
    return (
        <div className="col-span-12 lg:col-span-4 bg-[#EBECF0] text-black rounded-lg p-6 border-2 border-purple-500">
            <h2 className="text-xl text-center font-bold pb-3">{status}</h2>
            <TodoListItem />
        </div>
    );
}
