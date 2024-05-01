import AppStructure from "../components/AppStructureContainer";
import GithubLoginPage from "./GithubLoginPage";
import Main from "../components/Github Data Manager/Main";
import { getLocalStorage } from "../helpers/localstorage";

export default function Github() {
    if (!getLocalStorage("githubData")) return <GithubLoginPage />;
    return <AppStructure MainComponent={Main} />;
}
