import logo from "../../assets/img/logo-32.png";

export default function Main({ handleCollapse, collapse }) {
    return (
        <div
            className={`${
                collapse ? "col-span-8 md:col-span-9 lg:col-span-10" : "col-span-12"
            } p-10 bg-[#1A1A1A] h-screen`}
        >
            <i
                className="fa-solid fa-down-left-and-up-right-to-center text-white text-xl"
                onClick={handleCollapse}
            ></i>
            <div className="flex items-center justify-center mt-20 ">
                <h1 className="text-white mr-4 text-3xl md:text-4xl lg:text-5xl font-bold  text-center">
                    Welcome to Mind Flow!
                </h1>
                <img
                    src={logo}
                    alt=""
                    style={{
                        width: "45px",
                        height: "45px",
                    }}
                />
            </div>
            <div className="p-12">
                <h3 className="text-white text-xl text-center">
                    Make a note of something or use a template
                </h3>
            </div>
            <hr className="mt-10" />
            <div className="flex justify-center mt-10">
                <button className="bg-purple-500 hover:bg-purple-700 text-white font-semibold px-8 py-2 rounded-md">
                    New note{" "}
                </button>
            </div>
        </div>
    );
}
