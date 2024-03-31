import ElementNav from "../../components/Dashboard/ElementNav";
import { listElements } from "../../data/navs";

export default function Navbar() {
    const getUserName = () => {
        return "Pablog137";
    };
    return (
        <div className="col-span-2 bg-[#F3F4F6] h-screen">
            <div className="flex justify-center items-center flex-col bg-gray-300 py-3">
                <i className="fa-solid fa-user text-red-500 text-6xl py-4"></i>
                <p>{getUserName()}</p>
            </div>
            <button className="flex items-center py-5 bg-gray-500 w-full justify-evenly">
                <i className="fa-solid fa-magnifying-glass mr-2"></i>
                <p>Search</p>

            </button>
            <nav className="bg-[#F3F4F6] ">
                <ul>
                    {listElements.map((element, index) => {
                        return (
                            <ElementNav
                                key={index}
                                text={element.text}
                                icon={element.icon}
                                link={element.link}
                            />
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}
