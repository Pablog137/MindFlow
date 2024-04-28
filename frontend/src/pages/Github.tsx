import AppStructure from "../components/AppStructureContainer";
import GithubLogin from "../pages/GithubLogin";
import Main from "../components/Github Data Manager/Main";
import { getLocalStorage } from "../helpers/localstorage";

export default function Github() {
    if(!getLocalStorage("user")) return <GithubLogin />
    return <AppStructure MainComponent={Main} />;
}
