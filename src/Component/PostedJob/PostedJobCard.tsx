import { Link, useParams } from "react-router-dom";
import { timeAgo } from "../../Services/Utilities";

const PostedJobCard = (props:any)=>{
    const {id} = useParams(); 

    return (
        <Link to={`/posted-jobs/${props.id}`} className={`bg-mine-shaft-800 rounded-xl p-2 border-l-2 border-l-bright-sun-400 ${String(props.id) === String(id)? "bg-bright-sun-700  text-black":"bg-mine-shaft-800 text-mine-shaft-300"}`}>
            <div className="text-sm font-semibold">{props.jobTitle}</div>
            <div className="text-xs  font-medium">{props.location}</div>
            <div className="text-xs ">{props.jobStatus=="ACTIVE" ? "Posted"  : props.jobStatus=="DRAFT" ? "Drafted"  : "Closed" } { timeAgo(props.postTime)}</div>
        </Link>
    )
}

export default PostedJobCard