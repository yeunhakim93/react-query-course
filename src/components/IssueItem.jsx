import { Link } from "react-router-dom";
import { GoIssueOpened, GoIssueClosed, GoComment } from "react-icons/go";
import { relativeDate } from "../helpers/relativeDate";
import { useUserData } from "../helpers/useUserData";
import { Label } from "./Label";

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

  const assigneeUser = useUserData(assignee);
  const createdByUser = useUserData(createdBy);

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
            <Label key={label} label={label} />
          ))}
        </span>
        <small>
          #{number} opened {relativeDate(createdDate)} by{" "}
          {createdByUser?.data?.name}
        </small>
      </div>
      {assignee && (
        <img
          src={assigneeUser.isSuccess && assigneeUser.data.profilePictureUrl}
          className="assigned-to"
          alt={`assigned to ${assigneeUser?.data?.name}`}
        />
      )}
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
