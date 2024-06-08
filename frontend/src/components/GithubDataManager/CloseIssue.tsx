import { IssueShowProject } from "../../data/github";
import { useState } from "react";
import RemoveItem from "../UI-Items/RemoveItem";

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCloseIssue = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
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
        <RemoveItem
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleDelete={handleCloseIssue}
        />
    );
}
