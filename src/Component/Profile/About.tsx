import { ActionIcon, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCheck, IconDeviceFloppy, IconPencil, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile } from "../../Services/ProfileService";
import { setProfile } from "../../Slice/ProfileSlice";
import { successNotification } from "../../Services/NotificationService";

const About = ()=>{
    
    const user = useSelector((state: any) => state.user);
    const profile = useSelector((state: any) => state.profile);

    const dispatch = useDispatch();

    const [about, setAbout] = useState('');
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleEdit = async () => {
        if (!edit) {
            setEdit(true);
            setAbout(profile.about)            
        } else {
            setLoading(true);

            let updatedProfile = { ...profile, about:about };

            try {
                const res = await updateProfile(updatedProfile);
                dispatch(setProfile(res));
                setEdit(false);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }

            successNotification("Succsess", "About Section Updated Successfully!")
        }
    };

    const handleCancleEdit = ()=>{
        setEdit(false);
    }

    useEffect(() => {
        getProfile(user.profileId)
            .then((res: any) => {
                dispatch(setProfile(res));
            })
            .catch((err: any) => console.log(err));
    }, []);


    return (
        <div className="px-5 py-3">
                        <div className="flex justify-between">
                            <div className="text-2xl font-semibold mb-3 text-mine-shaft-300">About</div>
                            <div>
                                { 
                                    edit && <ActionIcon
                                                variant="subtle"
                                                size="lg"
                                                onClick={handleEdit}
                                                loading={loading}
                                                color="green.8"
                                            >
                                                <IconCheck className="w-4/5 h-4/5" />
                                            
                                            </ActionIcon>
                                }
                                <ActionIcon
                                    variant="subtle"
                                    size="lg"
                                    onClick={edit ? handleCancleEdit : handleEdit }
                                    loading={loading}
                                    color={edit ? "red.8" : "brightSun.4"}
                                >
                                    {edit
                                        ? <IconX className="w-4/5 h-4/5" />
                                        : <IconPencil className="w-4/5 h-4/5" />
                                    }
                                </ActionIcon>
                            </div>
                        </div>
                        
                        {
                            edit ? 
                            <Textarea
                                autosize
                                minRows={3}
                                value={about}
                                placeholder="Tell about yourself..."
                                onChange={(event) => setAbout(event.currentTarget.value)}
                            />
                            :
                            <div className="text-md text-justify flex gap-1 items-center text-mine-shaft-300">
                                {profile.about}
                            </div>
                        }
                        <br />
                    </div> 
    )
}

export default About