
import ElementNav from "../../components/Dashboard/ElementNav";
import { listElements } from "../../data/navs";

export default function Navbar() {
  return (
      <div className="col-span-2 bg-[#F3F4F6] h-screen p-2">
          <div className="flex justify-center items-center flex-col">
              <i className="fa-solid fa-user text-red-500 text-6xl py-4"></i>
              <p>User Name</p>
          </div>
          <div className="flex items-center py-5">
              <i className="fa-solid fa-magnifying-glass mr-2"></i>
              <p>Search</p>
          </div>
          <nav className="bg-[#F3F4F6]">
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
