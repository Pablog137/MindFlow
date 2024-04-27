import { useEffect, useRef } from "react";
import "../../styles/components/Note/Editor.css";
import Header from "./Header";
import { setLocalStorage, getLocalStorage } from "../../helpers/localstorage";
import { SearchPageContext } from "../AppStructureContainer";
import { useContext } from "react";
import { useParams } from "react-router-dom";

type Props = {
    colMain: string;
};

export default function Editor({ colMain }: Props) {
    const { id } = useParams();
    const timeoutIdRef = useRef<number>();
    const { setNotePages, notePages } = useContext(SearchPageContext);

    useEffect(() => {
        // Guardar en localStorage antes de salir de la página
        const handleBeforeUnload = () => {
            setLocalStorage("notePages", JSON.stringify(notePages));
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            clearTimeout(timeoutIdRef.current);
        };
    }, [notePages]);

    const content = () => {
        const savedContent = getLocalStorage("notePages");
        if (savedContent) {
            const notePages = JSON.parse(savedContent);
            const page = notePages.find((page: any) => page.id === id);
            if (page) {
                return page.content || "";
            }
        }
        return "";
    };

    const handleOnChangeContent = (e: React.ChangeEvent<HTMLDivElement>) => {
        const newContent = e.target.innerHTML;

        if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
        }
        timeoutIdRef.current = window.setTimeout(() => {
            saveText(newContent);
        }, 1000);
    };

    const saveText = (text: string) => {
        const savedContent = getLocalStorage("notePages");
        if (savedContent) {
            const parsedContent = JSON.parse(savedContent);
            const updatedPages = parsedContent.map((page: any) => {
                if (page.id === id) {
                    return { ...page, content: text };
                }
                return page;
            });
            setNotePages(updatedPages);
        }
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
                dangerouslySetInnerHTML={{ __html: content() }}
                onInput={handleOnChangeContent}
            ></div>
        </div>
    );
}
