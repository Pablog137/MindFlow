import Aside from "../../components/Dashboard/Aside";
import RepoCard from "./RepoCard";
import { cards } from "../../data/github";

type Props = {
    isAsideOpen: boolean;
    colsAside: string;
    colMain: string;
};

export default function Main({ isAsideOpen, colsAside, colMain }: Props) {
    return (
        <>
            <div className="grid grid-cols-12 ">
                <div className={colsAside}>
                    <Aside isAsideOpen={isAsideOpen} />
                </div>
                <div
                    className={`text-white bg-[#161922] px-8 pt-20 md:pt-40 grid grid-cols-12 gap-6 height ${colMain}`}
                >
                    {cards.map((card, index) => (
                        <RepoCard key={index} repo={card} />
                    ))}
                </div>
            </div>
        </>
    );
}
