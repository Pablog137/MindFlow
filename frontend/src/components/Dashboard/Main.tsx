import logo from "../../assets/img/logo-64.png";

export default function Main() {
    return (
        <div className="col-span-10 p-6">
            <div className="flex items-center justify-center mt-20 ">
                <h1 className="text-white mr-4 text-4xl font-bold  text-center">
                    Welcome to Mind Flow!
                </h1>
                <img src={logo} alt="" />
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
