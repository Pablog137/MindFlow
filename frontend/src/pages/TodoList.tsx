export default function TodoList(collapse = true) {
    return (
        <>
            <div className="grid grid-cols-12">
                <div
                    className={`${
                        collapse
                            ? "col-span-8 md:col-span-9 lg:col-span-10"
                            : "col-span-12"
                    } p-10 bg-[#1A1A1A] h-screen`}
                >
                    <i
                        className="fa-solid fa-down-left-and-up-right-to-center text-white text-xl"
                        // onClick={handleCollapse}
                    ></i>
                    <div className="flex items-center justify-center mt-10 ">
                        <h1 className="text-white mr-4 text-3xl md:text-4xl lg:text-5xl font-bold  text-center">
                            TodoList
                        </h1>
                    </div>
                    
                </div>
            </div>
        </>
    );
}
