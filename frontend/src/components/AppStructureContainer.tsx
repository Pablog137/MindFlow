import { useState } from "react";
import Navbar from "../components/Dashboard/Navbar";
import logo from "../assets/img/logo-32.png";
import "../styles/pages/Dashboard.css";

type ComponentProps = {
    isAsideOpen: boolean;
    colsAside: string;
    colMain: string;
    logo: string;
};

type Props = {
    MainComponent: (props: ComponentProps) => JSX.Element;
};

export default function AppStructure({ MainComponent }: Props) {
    const [isAsideOpen, setIsAsideOpen] = useState(true);

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
            <MainComponent
                isAsideOpen={isAsideOpen}
                colsAside={colsAside}
                colMain={colMain}
                logo={logo}
            />
        </>
    );
}
