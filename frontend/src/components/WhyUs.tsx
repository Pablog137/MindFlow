import illustration1 from "../assets/img/illustration-1.png";
import illustration2 from "../assets/img/illustration-2.png";
import RatingStar from "./UI-Items/RatingStar";

export default function WhyUs() {
    return (
        <>
            <div
                className="text-white mt-10 grid grid-cols-12 justify-center"
                id="why-us"
            >
                <div className="col-span-12 mt-12 md:mt-16 flex justify-center items-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold">
                        Why Choose us?
                    </h1>
                </div>
                <div className="col-span-12 mt-8 md:mt-16 flex justify-center items-center">
                    <h5 className="text-md sm:text-lg md:text-xl text-center ps-8 pe-8">
                        With MindFlow you have everything you need to keep life
                        organized.
                    </h5>
                </div>
                <div className="col-span-12 md:col-span-6 mt-20 md:mt-10 flex justify-center items-center p-4">
                    <div className="grid md:grid-cols-4 grid-cols-5">
                        <div className="md:col-start-2 md:col-end-4 col-start-2 col-end-5 ">
                            <figure className="max-w-screen-md col-span-3">
                                <div className="flex items-center justify-center  mb-4 text-yellow-300">
                                    <RatingStar />
                                    <RatingStar />
                                    <RatingStar />
                                    <RatingStar />
                                    <RatingStar />
                                </div>
                                <blockquote>
                                    <p className="text-xl sm:text-2xl font-semibold text-white dark:text-white text-center">
                                        “MindFlow gives me the peace of mind
                                        knowing I am doing exactly what I need
                                        to do, exactly when I need to do it.”
                                    </p>
                                </blockquote>
                                <figcaption className="flex items-center mt-6 space-x-3 rtl:space-x-reverse justify-center">
                                    <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-300 dark:divide-gray-700">
                                        <cite className="pe-3 font-medium text-white dark:text-white">
                                            Pablo Gutiérrez
                                        </cite>
                                        <cite className="ps-3 text-sm text-gray-500 dark:text-gray-400">
                                            CTO at MindFlow
                                        </cite>
                                    </div>
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                </div>

                <div className="col-span-12 md:col-span-6 mt-10 flex justify-center items-center">
                    <img
                        src={illustration1}
                        alt=""
                        className="max-w-xs md:max-w-lg"
                    />
                </div>
            </div>
            <div className="grid grid-cols-12 mt-10 sm:mt-4">
                <div className="col-span-12 md:col-span-6 flex justify-center items-center">
                    <img
                        src={illustration2}
                        alt=""
                        className="max-w-xs md:max-w-lg"
                    />
                </div>
                <div className="col-span-12 md:col-span-6 flex justify-center items-center">
                    <div className="grid grid-cols-6">
                        <div className="col-start-2 col-end-6">
                            <h3 className="text-xl sm:text-2xl text-white text-center font-bold">
                                With our premium subscription, you gain
                                exclusive access to powerful analytics and
                                dynamic charts
                            </h3>
                            <div className="flex justify-center mt-8">
                                <button className="bg-purple-500 hover:bg-purple-700 text-white font-semibold p-3 rounded-xl">
                                    Pick your plan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
