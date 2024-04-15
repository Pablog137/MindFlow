import { IssueShowProject } from "../../data/github";

type Props = {
    issue: IssueShowProject;
    setIssues: (issue: IssueShowProject[]) => void;
    issues: IssueShowProject[];
    repoName: string;
};

export default function CloseIssue({
    issue,
    setIssues,
    issues,
    repoName,
}: Props) {
    const handleCloseIssue = () => {
        const updatedIssues = issues.filter((i) => i.id !== issue.id);
        setIssues(updatedIssues);
        closeIssuePatch();
    };

    const closeIssuePatch = () => {
        const username = "Pablog137";
        const URL = `https://api.github.com/repos/${username}/${repoName}/issues/${issue.number}`;
        fetch(URL, {
            method: "PATCH",
            body: JSON.stringify({
                state: "closed",
            }),
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_GIT_TOKEN}`,
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
