import "../styles/components/Hero.css";
import { Link } from "react-router-dom";

export default function Hero() {
    return (
        <>
            <div className="text-white grid grid-cols-12 justify-center mb-32">
                <div className="col-span-12 mt-20 md:mt-40 flex justify-center items-center">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl xl:text-7xl  text-center gradient font-bold">
                        Organize your work <br /> and life
                    </h1>
                </div>
                <div className="col-span-12 flex justify-center items-center mt-12 p-3">
                    <h5 className="text-md sm:text-lg md:text-xl text-center font-medium">
                        Achieve focus, organization, and tranquility with
                        MindFlow. <br /> The world's leading task manager and
                        to-do list app.
                    </h5>
                </div>
                <div className="col-span-12 flex justify-center items-center mt-12">
                    <Link to="/register">
                        <button className="bg-purple-500 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-md">
                            Start for free
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}
