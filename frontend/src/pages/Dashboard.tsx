import { useState } from "react";
import Navbar from "../components/Dashboard/Navbar";
import Aside from "../components/Dashboard/Aside";

export default function Dashboard() {
    const [isAsideOpen, setIsAsideOpen] = useState(false);

    const toggleAside = () => {
        setIsAsideOpen(!isAsideOpen);
    };

    const colsAside = isAsideOpen ? "col-span-1 lg:col-span-2" : "hidden";
    const colMain = isAsideOpen
        ? "col-span-11 sm:col-span-11 lg:col-span-10"
        : "col-span-12";

    return (
        <>
            <Navbar isAsideOpen={isAsideOpen} toggleAside={toggleAside} />

            <div className="grid grid-cols-12 bg-[#161922]">
                <div className={colsAside}>
                    <Aside isAsideOpen={isAsideOpen} />
                </div>
                <div className={`text-white p-6 ${colMain}`}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Asperiores, officia, sunt earum commodi hic quaerat sit quae
                    deserunt alias explicabo dolorem. Accusantium et accusamus
                    ea odit, fugit ab deleniti expedita! Corporis doloribus
                    dolorem sit, quod recusandae sapiente modi ab neque
                    voluptatem consectetur voluptas totam, magnam nobis adipisci
                    aperiam delectus odio? Perferendis ea exercitationem libero
                    beatae doloribus cum esse inventore delectus! Nobis sequi
                    obcaecati ex rerum similique ab minima aspernatur quos,
                    accusamus velit! Officiis voluptatem distinctio reiciendis
                    labore sed! Molestias debitis officia natus, vel voluptate
                    cupiditate. Amet, praesentium odio? Asperiores, excepturi.
                    Suscipit, amet velit a autem iure blanditiis magni odit.
                    Incidunt nobis odit iusto est doloribus vel consequuntur
                    perspiciatis dolor quam eligendi inventore quaerat rem eos
                    soluta, natus voluptate. Atque, fugit! Atque quasi doloribus
                    dolorum corporis animi impedit. Inventore necessitatibus
                    voluptates beatae consequuntur doloribus odio harum eum
                    vitae. Id, sint ad? Natus vel placeat, eveniet deserunt
                    dolorum reprehenderit aut quibusdam hic?
                </div>
            </div>
        </>
    );
}
