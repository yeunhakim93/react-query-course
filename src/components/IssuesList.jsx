import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { GoIssueOpened, GoIssueClosed, GoComment } from "react-icons/go";
import { relativeDate } from "../helpers/relativeDate";

function IssueItem({ issue }) {
  const {
    title,
    number,
    assignee,
    comments,
    createdBy,
    createdDate,
    labels,
    status,
  } = issue;
  const commentCount = comments.length;
  return (
    <li>
      {status === "done" || status === "cancelled" ? (
        <GoIssueClosed style={{ color: "red" }} />
      ) : (
        <GoIssueOpened style={{ color: "green" }} />
      )}
      <div className="issue-content">
        <span>
          <Link to={`/issue/${number}`}>{title}</Link>
          {labels.map((label) => (
            <span key={label} className={`label red`}>
              {label}
            </span>
          ))}
        </span>
        <small>
          #{number} opened {relativeDate(createdDate)} by {createdBy}
        </small>
      </div>
      {assignee && <div>{assignee}</div>}
      <span className="comment-count">
        {commentCount > 0 && (
          <>
            <GoComment /> {commentCount}
          </>
        )}
      </span>
    </li>
  );
}

export default function IssuesList() {
  const issuesQuery = useQuery(["issues"], () =>
    fetch("/api/issues").then((res) => res.json())
  );
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
