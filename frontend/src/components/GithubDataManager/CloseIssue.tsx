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
    const closeIssuePatch = async () => {
        const URL = `https://api.github.com/repos/${githubUserData.username}/${repoName}/issues/${issue.number}`;
        try {
            const response = await fetch(URL, {
                method: "PATCH",
                body: JSON.stringify({ state: "closed" }),
                headers: {
                    Authorization: `Bearer ${githubUserData.access_token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error closing issue:", error);
            throw error;
        }
    };

    const handleCloseIssue = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const updatedIssues = issues.filter((i) => i.id !== issue.id);
        setIssues(updatedIssues);

        try {
            await closeIssuePatch();
        } catch (error) {
            setIssues([...issues, issue]);
        }
    };

    return (
        <RemoveItem
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleDelete={handleCloseIssue}
            type="issue"
        />
    );
}
