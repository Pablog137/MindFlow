export default function Dashboard() {
    const onLogOut = () => {
        fetch(import.meta.env.VITE_SERVER + "/api/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => {
                if (res.ok) {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                }
            })
            .catch((error) => console.error("Logout error:", error));
    };

    return (
        <>
            {localStorage.getItem("token") ? (
                <div className="text-white flex justify-end p-2">
                    <button
                        onClick={onLogOut}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Log out
                    </button>
                </div>
            ) : null}
            <h1 className="text-3xl text-center mt-20 text-white">
                {localStorage.getItem("token")
                    ? "Dashboard"
                    : "You are not logged in"}
            </h1>
        </>
    );
}
