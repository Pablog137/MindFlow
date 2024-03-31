import ElementNav from "../../components/Dashboard/ElementNav";
import { listElements } from "../../data/navs";
import user from "../../assets/img/user.png";

export default function Navbar() {
    const getUserName = () => {
        return "Pablog137";
    };
    return (
        <div className="col-span-4 md:col-span-3 lg:col-span-2 bg-[#F3F4F6] h-screen">
            <div className="flex justify-center items-center flex-col bg-gray-300 py-3">
                <img
                    src={user}
                    alt="user"
                    className="w-16 h-16 rounded-full mb-4"
                />
                <p>{getUserName()}</p>
            </div>
            <nav className="bg-[#F3F4F6] pt-4 ">
                <ul>
                    <li className="flex items-center justify-start hover:bg-blue-300">
                        <button className="flex items-center w-full py-3 px-5">
                            <i className="fa-solid fa-magnifying-glass mr-4 text-gray-800"></i>
                            <p>Search</p>
                        </button>
                    </li>
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
