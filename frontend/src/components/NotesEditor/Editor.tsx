import { useEffect, useState } from "react";
import "../../styles/components/Note/Editor.css";
import Header from "./Header";

type Props = {
    colMain: string;
};

export default function Editor({ colMain }: Props) {
    const [content, setContent] = useState("");
    let timeoutId: number;

    useEffect(() => {
        const savedContent = localStorage.getItem("content");
        if (savedContent) {
            setContent(JSON.parse(savedContent));
        }
    }, []);

    const handleOnChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newContent = e.target.innerHTML;

        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            saveText(newContent);
        }, 2000);
    };

    const saveText = (text: string) => {
        localStorage.setItem("content", JSON.stringify(text));
    };

    return (
        <div
            className={`text-white bg-[#161922] flex flex-col height ${colMain}`}
        >
            <div className="flex justify-center">
                <Header />
            </div>

            <div
                className="h-screen p-4 md:p-8 lg:p-14 editable-div"
                contentEditable="true"
                dangerouslySetInnerHTML={{ __html: content }}
                onInput={handleOnChangeContent}
            ></div>
        </div>
    );
}
