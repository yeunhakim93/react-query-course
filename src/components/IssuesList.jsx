import { useQuery } from "react-query";
import IssueItem from "./IssueItem";
export default function IssuesList({ labels, status }) {
  const issuesQuery = useQuery(["issues", { labels, status }], () => {
    const statusString = status ? `&status=${status}` : "";
    const labelsStr = labels.map((label) => `labels[]=${label}`).join("&");
    return fetch(`/api/issues?${labelsStr}${statusString}`).then((res) =>
      res.json()
    );
  });
  return (
    <div>
      <h1>Issues List</h1>
      {issuesQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="issues-list">
          {issuesQuery.data.map((issue) => (
            <IssueItem key={issue.id} issue={issue} />
          ))}
        </ul>
      )}
    </div>
  );
}
