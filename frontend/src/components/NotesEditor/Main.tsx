import { useParams } from "react-router-dom";
import Aside from "../Aside";
import Editor from "./Editor";

type Props = {
    isAsideOpen: boolean;
    colsAside: string;
    colMain: string;
    logo: string;
};

export default function Main({ isAsideOpen, colsAside, colMain }: Props) {
    const id = useParams();
    return (
        <>
            <>
                <div className={colsAside}>
                    <Aside isAsideOpen={isAsideOpen} type={id["id"]} />
                </div>
                <Editor colMain={colMain} />
            </>
        </>
    );
}
