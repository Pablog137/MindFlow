import { useEffect, useState } from "react";
import "../../styles/components/Note/Editor.css";

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
            className={`text-white bg-[#161922] px-10 md:px-28 pt-20 md:pt-40 flex flex-col height ${colMain} editable-div`}
            contentEditable="true"
            dangerouslySetInnerHTML={{ __html: content }}
            onInput={handleOnChangeContent}
        ></div>
    );
}
