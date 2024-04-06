import Main from "../components/Calendar/Main";
import AppStructure from "../components/AppStructureContainer";
import ContextWrapper from "../context/ContextWrapper";

export default function Calendar() {
    return (
        <ContextWrapper>
            <AppStructure MainComponent={Main} />
        </ContextWrapper>
    );
}
