import AppStructure from "../components/AppStructureContainer";
import GithubLoginPage from "./GithubLoginPage";
import Main from "../components/GithubDataManager/Main";
import { getLocalStorage } from "../helpers/localstorage";

export default function Github() {
    if (!getLocalStorage("githubData")) return <GithubLoginPage />;
    return <AppStructure MainComponent={Main} />;
}
