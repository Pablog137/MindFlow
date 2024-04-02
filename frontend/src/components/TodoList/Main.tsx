import Aside from "../../components/Dashboard/Aside";
import TodoList from "./TodoList";

export default function Main({ isAsideOpen, colsAside, colMain }) {
    return (
        <>
            <div className="grid grid-cols-12 ">
                <div className={colsAside}>
                    <Aside isAsideOpen={isAsideOpen} />
                </div>
                <div
                    className={`grid grid-cols-12 gap-5 text-white bg-[#161922] px-6 md:px-12 pt-10 height ${colMain}`}
                >
                    <TodoList status="To do" />
                    <TodoList status="Doing" />
                    <TodoList status="Done" />
                </div>
            </div>
        </>
    );
}
