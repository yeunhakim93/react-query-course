import { useState } from "react";
import { useQuery } from "react-query";
import IssueItem from "./IssueItem";
import { fetchWithError } from "../helpers/fetchWithError";
export default function IssuesList({ labels, status }) {
  const issuesQuery = useQuery(["issues", { labels, status }], () => {
    const statusString = status ? `&status=${status}` : "";
    const labelsString = labels.map((label) => `labels[]=${label}`).join("&");
    return fetchWithError(`/api/issues?${labelsString}${statusString}`);
  });

  const [searchValue, setSearchValue] = useState("");
  const searchQuery = useQuery(
    ["issues", "search", searchValue],
    () => {
      return fetchWithError(`/api/search/issues?q=${searchValue}`).then((res) =>
        res.json()
      );
    },
    { enabled: !!searchValue }
  );
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSearchValue(e.target.elements.search.value);
        }}
      >
        <label htmlFor="search"> Search Issues</label>
        <input
          type="search"
          placeholder="Search"
          name="search"
          id="search"
          onChange={(e) => {
            if (!e.target.value.length) {
              setSearchValue("");
            }
          }}
        ></input>
      </form>
      {issuesQuery.isLoading ? (
        <p>Loading...</p>
      ) : searchQuery.fetchStatus === "idle" &&
        searchQuery.isLoading === true ? (
        <ul className="issues-list">
          {issuesQuery.data?.map((issue) => (
            <IssueItem key={issue.id} issue={issue} />
          ))}
        </ul>
      ) : (
        <>
          <h2>Search Results</h2>
          {searchQuery.isLoading && !searchQuery.data ? (
            <p>Loading...</p>
          ) : (
            <>
              <p>{searchQuery.data.count} Results</p>
              <ul className="issues-list">
                {searchQuery.data.items?.map((issue) => (
                  <IssueItem key={issue.id} issue={issue} />
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
}
