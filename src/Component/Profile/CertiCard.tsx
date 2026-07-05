import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { formatDate } from "../../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slice/ProfileSlice";
import { successNotification } from "../../Services/NotificationService";

const CertiCard = (props: any) => {
    const dispatch = useDispatch(); 
    const profile = useSelector((state: any) => state.profile)
    const handleDelete = () => {
        let certis = [...profile.certifications];
        certis.splice(props.index, 1);
        let updatedProfile = {...profile, certifications:certis} 
        dispatch(changeProfile(updatedProfile))
        successNotification('Success', 'Certificate deleted succesfully')
    }
    return (
        <div className="flex justify-between">
            <div className="flex gap-2 items-center">
                <div className="p-2 bg-mine-shaft-800 rounded-md">
                    <img className="h-7" src={`/Icons/${props.issuer}.png`} alt={props.issuer} />
                </div>
                <div className="flex flex-col">
                    <div className="font-semibold text-mine-shaft-100">{props.name}</div>
                    <div className="text-sm text-mine-shaft-300">{props.issuer}</div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <div className="flex flex-col items-end">
                    <div className="text-sm text-mine-shaft-300">Issued : {formatDate(props.issueDate)}</div>
                    <div className="text-sm text-mine-shaft-300">ID: {props.certificateId}</div>
                </div>
                {
                    props.edit && 
                    <ActionIcon color="red.8" variant="subtle" onClick={handleDelete}>
                        <IconTrash className="h-4/5 w-4/5" stroke={1.5} />
                    </ActionIcon>
                }
            </div>
        </div>
    );
};
export default CertiCard