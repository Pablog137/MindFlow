import Aside from "../Aside";
import logo from "../../assets/img/logo-64.png";
type Props = {
    isAsideOpen: boolean;
    colsAside: string;
    colMain: string;
};

export default function Main({ isAsideOpen, colsAside, colMain }: Props) {
    return (
        <>
            <>
                <div className={colsAside}>
                    <Aside isAsideOpen={isAsideOpen} type={"dashboard"} />
                </div>
                <div
                    className={`text-white  bg-[#161922] px-6 md:px-12 pt-20 md:pt-40 flex flex-col items-center height ${colMain}`}
                >
                    <div className="flex items-center text-center">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl mr-4">
                            Welcome to Mind Flow!
                        </h1>
                        <img
                            src={logo}
                            alt="logo"
                            className="hidden lg:block lg:w-16 "
                        />
                    </div>
                    <div className="mt-14">
                        <h5 className="text-xl md:text-2xl lg:text-3xl text-center">
                            Make a note of something or use a template
                        </h5>
                    </div>
                    <div className="border-b border-white w-full mt-20"></div>
                    <div className="flex justify-center mt-10">
                        <button className="bg-purple-400 hover:bg-purple-700 text-white font-semibold px-8 py-2 rounded-md">
                            New note
                        </button>
                    </div>
                </div>
            </>
        </>
    );
}
