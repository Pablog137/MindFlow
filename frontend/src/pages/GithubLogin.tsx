import AppStructure from "../components/AppStructureContainer";
import GithubLogin from "../components/Github Data Manager/GithubLoginMain";

export default function Github() {
    return <AppStructure MainComponent={GithubLogin} />;
}
