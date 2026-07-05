import { Divider } from "@mantine/core"
import PostJob from "../Component/PostJob/PostJob"
import { useParams } from "react-router-dom"
import { useState } from "react";
import { useSelector } from "react-redux";

const PostJobPage = ()=>{
    

    return (
        <div className="min-h-[100vh] bg-mine-shaft-900 font-['poppins']">
            <Divider size="sm"  color="mineShaft.7" className="mx-5" />
            <PostJob />
        </div>)
}

export default PostJobPage