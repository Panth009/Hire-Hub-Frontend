import { Button } from "@mantine/core";
import { useState } from "react";
import ExpInput from "./ExpInput";
import { formatDate } from "../../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slice/ProfileSlice";
import { successNotification } from "../../Services/NotificationService";

const ExpCard = (props: any) => {
    
    const [edit,setEdit] = useState(false)
    
    const profile = useSelector((state:any)=>state.profile);
    const dispatch = useDispatch()

    const handleDelete = () => {
        let exp = [...profile.experiences];
        exp.splice(props.idx, 1);
        let updatedProfile = {...profile, experiences:exp} 
        dispatch(changeProfile(updatedProfile))
        successNotification('Success', 'Experience deleted succesfully')
    }
    return (
    !edit ? 
    <div className="flex flex-col gap-2 mt-2">
        <div className="flex justify-between">
            <div className="flex gap-2 items-center">
                <div className="p-2 bg-mine-shaft-800 rounded-md">
                    <img className="h-7" src={`/Icons/${props.company}.png`} alt={props.company} />
                </div>
                <div className="flex flex-col">
                    <div className="font-semibold text-mine-shaft-100">{props.title}</div>
                    <div className="text-sm text-mine-shaft-300">
                        {props.company} &bull; {props.location}
                    </div>
                </div>
            </div>
            <div className="text-sm text-mine-shaft-300">
                {formatDate(props.startDate)} - {props.working ? "Present" :  formatDate(props.endDate)}
            </div>
        </div>

        <div className="text-sm text-mine-shaft-300 text-justify">
            {props.description}
        </div>

        {
            props.edit && 
            <div className="flex gap-5">
                <Button 
                    color="brightSun.4" 
                    variant="outline"
                    onClick={() => setEdit(true)}
                >
                    Edit
                </Button>
                <Button onClick={handleDelete} color="red.9" variant="light">Delete</Button>
            </div>
        }
    </div> 
    : 
    <ExpInput {...props} setEdit={setEdit}/>
)
};

export default ExpCard