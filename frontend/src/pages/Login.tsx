import logo from "../assets/img/logo-64.png";

export default function Login() {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="text-white grid place-items-center px-6">
                <img src={logo} alt="Logo" />
                <h1 className="text-3xl text-center font-bold py-8 md:p-10">
                    Log in to your account
                </h1>
                <form
                    action=""
                    className="grid grid-cols-12 gap-4 w-full max-w-md"
                >
                    <div className="col-span-12">
                        <label htmlFor="email" className="font-bold">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            className="bg-gray-800 p-2 rounded w-full mt-2"
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
                            className="bg-gray-800 p-2 rounded w-full mt-2"
                        />
                    </div>
                    <div className="col-span-12 flex justify-center p-0 py-2">
                        <button
                            type="submit"
                            className="bg-purple-500 p-2 rounded font-bold w-full"
                        >
                            Log in
                        </button>
                    </div>
                    <div className="col-span-12">
                        <p className="text-center font-bold">
                            Don’t have an account? {""}
                            <a
                                href="/register"
                                className="text-purple-300 font-bold"
                            >
                                Create an account
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
