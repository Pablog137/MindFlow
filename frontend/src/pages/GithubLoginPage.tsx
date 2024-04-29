import AppStructure from "../components/AppStructureContainer";
import { getLocalStorage } from "../helpers/localstorage";
import Github from "./Github";
import GithubLogin from "../components/Github Data Manager/GithubDataUser";

export default function GithubLoginPage() {
    if (getLocalStorage("githubData")) return <Github />;
    return <AppStructure MainComponent={GithubLogin} />;
}
