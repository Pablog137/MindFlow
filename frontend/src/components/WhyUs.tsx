import imagen from "../assets/img/illustration-1.png";
import RatingStar from "./UI-Items/RatingStar";

export default function WhyUs() {
    return (
        <div className="text-white mt-10 grid grid-cols-12 justify-center">
            <div className="col-span-12 mt-20 md:mt-40 flex justify-center items-center">
                <h1 className="text-3xl md:text-4xl text-center font-bold">
                    Why Choose us?
                </h1>
            </div>
            <div className="col-span-12 mt-8 md:mt-16 flex justify-center items-center">
                <h5 className="text-lg md:text-xl text-center font-bold">
                    With MindFlow you have everything you need to keep life
                    organized.
                </h5>
            </div>
            <div className="col-span-6 mt-10 flex justify-center items-center p-4">
                <div className="grid grid-cols-4">
                    <div className="col-start-2 col-end-4">
                        <figure className="max-w-screen-md col-span-3">
                            <div className="flex items-center mb-4 text-yellow-300">
                                <RatingStar />
                                <RatingStar />
                                <RatingStar />
                                <RatingStar />
                                <RatingStar />
                            </div>
                            <blockquote>
                                <p className="text-2xl font-semibold text-white dark:text-white">
                                    “MindFlow gives me the peace of mind knowing
                                    I am doing exactly what I need to do,
                                    exactly when I need to do it.”
                                </p>
                            </blockquote>
                            <figcaption className="flex items-center mt-6 space-x-3 rtl:space-x-reverse">
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

            <div className="col-span-6 mt-10 flex justify-center items-center">
                <img src={imagen} alt="" className="max-w-lg" />
            </div>
        </div>
    );
}
