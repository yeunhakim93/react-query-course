import { Link } from "react-router-dom";
import { GoIssueOpened, GoIssueClosed, GoComment } from "react-icons/go";
import { relativeDate } from "../helpers/relativeDate";

export default function IssueItem({ issue }) {
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
