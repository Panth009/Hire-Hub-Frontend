import { Button, Divider, FileInput, LoadingOverlay, NumberInput, Textarea, TextInput } from "@mantine/core";
import { IconCheck, IconPaperclip } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Notification, rem } from '@mantine/core';
import { timeAgo } from "../../Services/Utilities";
import ApplicationForm from "./ApplyJobForm";
const ApplyJob=(props:any)=>{



    return (
        <>
        
        <div className="w-2/3 mx-auto">
            <div className="mx-auto flex gap-2 items-center">
                    <div className="p-3 bg-mine-shaft-800 rounded-xl">
                        <img className="h-10" src={`/Icons/${props.company}.png`} alt="" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="font-semibold text-xl">
                            {props.jobTitle}
                        </div>
                        <div className="text-md text-mine-shaft-300">
                            {props.comapany} &bull; {timeAgo(props.postTime)} &bull; {props.applicants? `${props.applicants.length} Applicants` : "0 Applicants"}
                        </div>
                    </div>
            </div>

            <Divider size="xs"  color="mineShaft.7" className="my-5" />

            <ApplicationForm/>
            
        </div>

        </>
)    }
export default ApplyJob;