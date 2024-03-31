import Main from "../components/Dashboard/Main";
import Navbar from "../components/Dashboard/Navbar";
import { useState } from "react";
import { useEffect } from "react";

export default function Dashboard() {
    // const onLogOut = () => {
    //     fetch(import.meta.env.VITE_SERVER + "/api/logout", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${localStorage.getItem("token")}`,
    //         },
    //     })
    //         .then((res) => {
    //             if (res.ok) {
    //                 localStorage.removeItem("token");
    //                 window.location.href = "/";
    //             }
    //         })
    //         .catch((error) => console.error("Logout error:", error));
    // };


    const isMdScreen = window.innerWidth >= 768;
    const [collapse, setCollapse] = useState(!isMdScreen);

    // For default value we check the size value of the screen and then we set the collapse value
    useEffect(() => {
        const handleResize = () => {
            const isMdScreen = window.innerWidth >= 768;
            setCollapse(!isMdScreen);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleCollapse = () => {
        setCollapse(!collapse);
    };


    return (
        <div className="grid grid-cols-12">
            {collapse ? <Navbar /> : null}
            <Main handleCollapse={handleCollapse} collapse={collapse} />
        </div>
    );
}
