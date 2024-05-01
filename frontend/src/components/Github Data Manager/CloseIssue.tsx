import { IssueShowProject } from "../../data/github";

type Props = {
    issue: IssueShowProject;
    setIssues: (issue: IssueShowProject[]) => void;
    issues: IssueShowProject[];
    repoName: string;
    githubUserData: GithubData;
};

export default function CloseIssue({
    issue,
    setIssues,
    issues,
    repoName,
    githubUserData,
}: Props) {
    const handleCloseIssue = () => {
        const updatedIssues = issues.filter((i) => i.id !== issue.id);
        setIssues(updatedIssues);
        closeIssuePatch();
    };

    const closeIssuePatch = () => {
        const URL = `https://api.github.com/repos/${githubUserData.username}/${repoName}/issues/${issue.number}`;
        fetch(URL, {
            method: "PATCH",
            body: JSON.stringify({
                state: "closed",
            }),
            headers: {
                Authorization: `Bearer ${githubUserData.access_token}`,
            },
        }).then((res) => res.json());
    };

    return (
        <i
            className="fa-solid fa-trash text-red-500 hover:text-red-300 hover:text-xl text-lg"
            aria-hidden="true"
            onClick={handleCloseIssue}
        ></i>
    );
}
