import Aside from "../Aside";
import Editor from "./Editor";

type Props = {
    isAsideOpen: boolean;
    colsAside: string;
    colMain: string;
    logo: string;
};

export default function Main({ isAsideOpen, colsAside, colMain }: Props) {
    return (
        <>
            <>
                <div className={colsAside}>
                    <Aside isAsideOpen={isAsideOpen} />
                </div>
                <Editor colMain={colMain} />
            </>
        </>
    );
}
