import { useState } from "react";
import "../styles/components/Responsive.css";

export default function Features() {
    const [selectedImage, setSelectedImage] = useState("Ipad");
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClickButton = (device: string) => {
        if (device !== selectedImage) {
            setIsAnimating(true);
            setTimeout(() => {
                setSelectedImage(device);
                setIsAnimating(false);
            }, 500);
        }
    };

    return (
        <>
            <div
                className="text-white grid grid-cols-12 justify-center mb-32 mx-10 md:mx-20 lg:mx-40"
                id="features"
            >
                <div className="col-span-12 mt-20 md:mt-28 flex justify-center items-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold mb-8">
                        In perfect sync across all your devices
                    </h1>
                </div>
                <div className="col-span-12 lg:col-span-5 flex items-center justify-center flex-col mt-12 p-3">
                    <h5 className="text-md sm:text-lg md:text-xl font-medium text-center pb-4">
                        Enjoy the freedom of using MindFlow on any device! Fully
                        responsive, our app ensures a smooth and consistent
                        experience whether you're on your phone, tablet, or
                        desktop.
                    </h5>
                    <div className="flex gap-5 justify-center items-center">
                        <button
                            className={`bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded-md mt-4 flex items-center gap-4 ${
                                selectedImage === "Ipad" ? "bg-purple-700" : ""
                            }`}
                            onClick={() => handleClickButton("Ipad")}
                        >
                            <i className="fa-solid fa-desktop text-gray-200"></i>
                            <p>Ipad/Desktop</p>
                        </button>
                        <button
                            className={`bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded-md mt-4 flex items-center gap-4 ${
                                selectedImage === "Mobile"
                                    ? "bg-purple-700"
                                    : ""
                            }`}
                            onClick={() => handleClickButton("Mobile")}
                        >
                            <i className="fa-solid fa-mobile text-gray-200"></i>
                            <p>Mobile</p>
                        </button>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-7 flex justify-center items-center mt-12 p-3">
                    <div className="image-container">
                        <img
                            src={`../../public/images/${selectedImage}.png`}
                            alt={selectedImage}
                            className={`fade-enter ${
                                isAnimating ? "fade-exit-active" : ""
                            }`}
                            onLoad={(e) => {
                                e.currentTarget.classList.remove("fade-enter");
                                e.currentTarget.classList.add(
                                    "fade-enter-active"
                                );
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
