import { useState } from "react";
import Aside from "../Aside";
import Header from "./Header";
import Stats from "./Stats";

type Props = {
    isAsideOpen: boolean;
    colsAside: string;
    colMain: string;
};

export default function Main({ isAsideOpen, colsAside, colMain }: Props) {
    const [period, setPeriod] = useState<Period>("lastWeek");
    const [type, setType] = useState<Type>("todoList");

    return (
        <>
            <div className={colsAside}>
                <Aside isAsideOpen={isAsideOpen} />
            </div>
            <div
                className={`text-white bg-[#161922] px-6 md:px-12 pt-10 md:pt-14 h-100 ${colMain}`}
            >
                <Header
                    setPeriod={setPeriod}
                    period={period}
                    setType={setType}
                    type={type}
                />
                <main className="pt-10">
                    <Stats period={period} type={type} />
                </main>
            </div>
        </>
    );
}
