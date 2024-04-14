import { useState } from "react";
import { Repo } from "../../data/github";
import { MouseEventHandler } from "react";

type Props = {
    originalRepos: Repo[];
    setRepos: (repos: Repo[]) => void;
};

export default function SearchRepo({ originalRepos, setRepos }: Props) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [filterValue, setFilterValue] = useState("All categories");

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    const onChangeSearchValue = (newValue: string) => {
        setSearchValue(newValue);
        const searchResults = originalRepos.filter((repo) =>
            repo.name.startsWith(newValue)
        );
        setRepos(searchResults);
    };

    const onSubmitForm = (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();

        const searchResults = originalRepos.filter((repo) =>
            repo.name.startsWith(searchValue)
        );
        setRepos(searchResults);
    };

    const onChangeFilter: MouseEventHandler<HTMLButtonElement> = (e) => {
        const newValue = e.currentTarget.value;
        setFilterValue(newValue);
        filterData(newValue);
    };

    const filterData = (value: string) => {
        let filteredData;
        switch (value) {
            case "Private":
                filteredData = originalRepos.filter(
                    (repo) => repo.visibility === "private"
                );
                break;
            case "Public":
                filteredData = originalRepos.filter(
                    (repo) => repo.visibility === "public"
                );
                break;
            case "Updated recently":
                filteredData = getRecentlyUpdatedRepos(originalRepos);
                break;
            default:
                filteredData = originalRepos;
                break;
        }

        setRepos(filteredData);
    };
    const getRecentlyUpdatedRepos = (repos: Repo[]) => {
        const sortedRepos = repos.sort(compareByLastUpdated);
        const recentlyUpdatedRepos = sortedRepos.slice(0, 3);

        return recentlyUpdatedRepos;
    };
    const compareByLastUpdated = (repoA: Repo, repoB: Repo): number => {
        const lastUpdatedA = new Date(repoA.updated_at);
        const lastUpdatedB = new Date(repoB.updated_at);

        return lastUpdatedB - lastUpdatedA;
    };

    return (
        <form className="max-w-lg mx-auto" onSubmit={onSubmitForm}>
            <div className="flex">
                <button
                    id="dropdown-button"
                    data-dropdown-toggle="dropdown"
                    className="flex-shrink-0 w-44 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200   dark:text-white dark:border-gray-600"
                    type="button"
                    onClick={toggleDropdown}
                    aria-expanded={dropdownOpen}
                >
                    {filterValue}
                    <svg
                        className="w-2.5 h-2.5 ms-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 4 4 4-4"
                        />
                    </svg>
                </button>
                <div
                    id="dropdown"
                    className={`absolute ${
                        dropdownOpen ? "block" : "hidden"
                    } mt-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                    style={{ minWidth: "160px" }}
                >
                    <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdown-button"
                    >
                        {filterValue !== "All categories" && (
                            <li>
                                <button
                                    type="button"
                                    value="Private"
                                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={onChangeFilter}
                                >
                                    All categories
                                </button>
                            </li>
                        )}

                        <li>
                            <button
                                type="button"
                                value="Private"
                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={onChangeFilter}
                            >
                                Private
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                value="Public"
                                onClick={onChangeFilter}
                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Public
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                value="Updated recently"
                                onClick={onChangeFilter}
                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Updated recently
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="relative w-full">
                    <input
                        type="search"
                        id="search-dropdown"
                        className="block p-2.5 md:w-96 z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                        placeholder="Search repositories"
                        maxLength={30}
                        onChange={(e) => onChangeSearchValue(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-purple-400 rounded-e-lg border border-white hover:bg-purple-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        <svg
                            className="w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                </div>
            </div>
        </form>
    );
}
