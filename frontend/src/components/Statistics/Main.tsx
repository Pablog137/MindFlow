import Aside from "../Aside";

type Props = {
    isAsideOpen: boolean;
    colsAside: string;
    colMain: string;
};

export default function Main({ isAsideOpen, colsAside, colMain }: Props) {
    return (
        <>
            <>
                <div className={colsAside}>
                    <Aside isAsideOpen={isAsideOpen} />
                </div>
                <div
                    className={`text-white  bg-[#161922] px-6 md:px-12 pt-20 md:pt-40 flex flex-col items-center height ${colMain}`}
                >
                    Statistics
                </div>
            </>
        </>
    );
}
