import { useState, useEffect } from "react";
import {
    CommitShowProject,
    ContributorShowProject,
    IssueShowProject,
    Language,
} from "../data/github";

type RepoDetails = {
    repoInfo: any;
    contributors: ContributorShowProject[];
    languages: Language;
    commits: CommitShowProject[];
    issues: IssueShowProject[];
    isLoading: boolean;
    getFormattedDate: (date: string) => string;
    getTotalLines: () => number;
    getVisibilityIcon: () => any;
    commitCount: number;
    setIssues: (issues: IssueShowProject[]) => void;
    githubUserData: any;
};

export function useRepoDetails(state: any, icons: any): RepoDetails {
    const { repo, githubUserData, commitCount } = state || {};

    const [repoInfo] = useState(repo);
    const [contributors, setContributors] = useState<ContributorShowProject[]>(
        []
    );
    const [languages, setLanguages] = useState<Language>({});
    const [commits, setCommits] = useState<CommitShowProject[]>([]);
    const [issues, setIssues] = useState<IssueShowProject[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    function getFormattedDate(date: string) {
        const newDate = new Date(date);
        return newDate.toISOString().split("T")[0];
    }

    async function fetchData(url: string, API_TOKEN: string): Promise<any> {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
            },
        });
        const data = await response.json();
        return data.message ? [] : data;
    }

    useEffect(() => {
        if (!repoInfo || !githubUserData) return;

        const API_TOKEN = githubUserData.access_token;
        const URLS = [
            repoInfo.contributors_url,
            repoInfo.languages_url,
            repoInfo.commits_url.replace("{/sha}", ""),
            repoInfo.issues_url.replace("{/number}", ""),
        ];

        async function fetchDataAndSetState() {
            setIsLoading(true);

            try {
                const [
                    contributorsData,
                    languagesData,
                    commitsData,
                    issuesData,
                ] = await Promise.all(
                    URLS.map((url) => fetchData(url, API_TOKEN))
                );

                setContributors(contributorsData);
                setLanguages(languagesData);
                setCommits(commitsData);
                setIssues(issuesData);
                console.log(issuesData)
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false); // Handle loading state on error
            }
        }

        fetchDataAndSetState();
    }, [repoInfo, githubUserData]);

    const getTotalLines = (): number => {
        return Object.values(languages).reduce((acc, lines) => acc + lines, 0);
    };

    const getVisibilityIcon = () => {
        return icons.visibility[
            repoInfo?.visibility as keyof typeof icons.visibility
        ];
    };

    return {
        repoInfo,
        contributors,
        languages,
        commits,
        issues,
        isLoading,
        getFormattedDate,
        getTotalLines,
        getVisibilityIcon,
        commitCount,
        setIssues,
        githubUserData,
    };
}
