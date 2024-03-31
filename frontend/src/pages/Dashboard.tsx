import Main from "../components/Dashboard/Main";
import Navbar from "../components/Dashboard/Navbar";

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

    return (
        <div className="grid grid-cols-12">
            <Navbar />
            <Main />
        </div>
    );
}
