import giftImg from "../assets/img/gift-64.png";
import moneyImg from "../assets/img/money-64.png";
import ListElement from "../components/UI-Items/ListElement";
import { Link } from "react-router-dom";
import { useState } from "react";
import { currencies } from "../data/Currencies";
import { ChangeEvent } from "react";

const BASE_PRICE = 3.99;

export default function Pricing() {
    const [currency, setCurrency] = useState(currencies[0]);

    const onChangeCurrency = (e: ChangeEvent<HTMLSelectElement>) => {
        const currencyFound = currencies.find(
            (divisa) => divisa.name === e.currentTarget.value
        );
        if (currencyFound) {
            setCurrency(currencyFound);
        }
    };

    const convertPrice = (): string => {
        return currency.symbol + (currency.value * BASE_PRICE).toFixed(2);
    };

    return (
        <div
            className="text-white mt-10 grid grid-cols-12 justify-center mb-40 p-6 gap-8"
            id="pricing"
        >
            <div className="col-span-12 mt-12 md:mt-16 flex justify-center items-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold">
                    Choose your pricing plan
                </h1>
            </div>
            <div className="col-span-12 mt-6 md:mt-10 flex justify-center items-center mb-10">
                <label
                    className="text-md sm:text-lg md:text-xl text-center ps-8 pe-8"
                    htmlFor="money"
                >
                    Price in
                </label>
                <select
                    id="money"
                    className="text-black p-1 rounded-md"
                    onChange={onChangeCurrency}
                >
                    {currencies.map((divisa) => (
                        <option key={divisa.id} value={divisa.name}>
                            {divisa.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="p-2 sm:p-0 sm:col-span-6 col-span-12 flex justify-end">
                <div
                    className="lg:w-1/2 w-full rounded-xl p-4 overflow-hidden shadow-lg border-t-8 border-purple-400 flex flex-col justify-between "
                    style={{ backgroundColor: "#2D2D2D" }}
                >
                    <div className="px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="font-bold text-3xl md:text-4xl mb-2">
                                Basic
                            </div>
                            <img src={giftImg} alt="" />
                        </div>
                        <h5 className="text-3xl md:text-4xl font-bold mt-5 mb-5 text-center">
                            Free
                        </h5>

                        <ul className="text-gray-700 text-base list-none">
                            <ListElement text="All app features" />
                            <ListElement text="Create up to 5 pages" />
                        </ul>
                    </div>
                    <div className="flex justify-center mt-4">
                        <Link
                            to="register"
                            className="bg-purple-500 hover:bg-purple-700 text-white font-semibold p-3 rounded-full "
                        >
                            Choose plan
                        </Link>
                    </div>
                </div>
            </div>
            <div className="p-2 sm:p-0 sm:col-span-6 col-span-12 flex justify-start">
                <div
                    className="lg:w-1/2 w-full rounded-xl p-4 overflow-hidden shadow-lg border-t-8 border-purple-400 flex flex-col justify-between"
                    style={{ backgroundColor: "#2D2D2D" }}
                >
                    <div className="px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="font-bold text-3xl md:text-4xl mb-2">
                                Premium
                            </div>
                            <img src={moneyImg} alt="" />
                        </div>
                        <h5 className="text-3xl md:text-4xl font-bold mt-5 mb-5 text-center">
                            {convertPrice()}
                        </h5>

                        <ul className="text-gray-700 text-base list-none">
                            <ListElement text="All app features" />
                            <ListElement text="Unlimited pages" />
                            <ListElement text="Access to graphs and analytics" />
                        </ul>
                    </div>
                    <div className="flex justify-center mt-4">
                        <Link
                            to="register"
                            className="bg-purple-500 hover:bg-purple-700 text-white font-semibold p-3 rounded-full "
                        >
                            Choose plan
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
