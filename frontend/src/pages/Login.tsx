import logo from "../assets/img/logo-64.png";

export default function Login() {
    return (
        <div className="text-white grid place-items-center mt-40">
            <img src={logo} alt="Logo" />
            <h1 className="text-3xl font-bold p-10">Log in to your account</h1>
            <form action="" className="grid grid-cols-12 gap-4 w-full max-w-md">
                <div className="col-span-12">
                    <label htmlFor="email" className="font-bold">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        className="bg-gray-800 p-2 rounded w-full"
                    />
                </div>
                <div className="col-span-12">
                    <div className="flex justify-between">
                        <label htmlFor="password" className="font-bold">
                            Password
                        </label>
                        <span className="">
                            <a
                                href="#"
                                className="text-purple-300 text-xs font-bold"
                            >
                                Forgot password?
                            </a>
                        </span>
                    </div>

                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        className="bg-gray-800 p-2 rounded w-full"
                    />
                </div>
                <div className="col-span-12 flex justify-center p-2">
                    <button
                        type="submit"
                        className="bg-purple-500 p-2 rounded font-bold w-full"
                    >
                        Log in
                    </button>
                </div>
                <div className="col-span-12">
                    <p className="text-center">
                        Don’t have an account? {""}
                        <span className="text-purple-300 font-bold">
                            Create an account
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
}
