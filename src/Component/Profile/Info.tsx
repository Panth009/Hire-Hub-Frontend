import { useEffect, useState } from "react";
import fields from "../../Data/Profile";
import { getProfile, updateProfile } from "../../Services/ProfileService";
import { useDispatch, useSelector } from "react-redux";
import { ActionIcon, NumberInput, TextInput } from "@mantine/core";
import { IconBriefcase, IconCheck, IconMapPin, IconPencil, IconX } from "@tabler/icons-react";
import SelectInput from "./SelectInput";
import { useForm } from "@mantine/form";
import { setProfile } from "../../Slice/ProfileSlice";
import { successNotification } from "../../Services/NotificationService";

const Info = () => {

    const select = fields;
    const user = useSelector((state: any) => state.user);
    const profile = useSelector((state: any) => state.profile);

    const dispatch = useDispatch();

    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm({
        mode: 'controlled',
        initialValues: {
            name: '',
            jobTitle: '',
            company: '',
            location: '',
            totalExp: 0,       // ✅ matches backend field name
        },
        validate: {
            name: (value) => value.trim().length === 0 ? 'Name is required' : null,
            totalExp: (value) =>
                value < 0 ? 'Cannot be negative' :
                value > 50 ? 'Value seems too high' : null,
        },
    });

    const handleEdit = async () => {
        if (!edit) {
            setEdit(true);
            form.setValues({
                name: profile.name || user.name || '',   // ✅ prefer profile.name if available
                jobTitle: profile.jobTitle || '',
                company: profile.company || '',
                location: profile.location || '',
                totalExp: profile.totalExp || 0,         // ✅ correct field name
            });
        } else {
            const validation = form.validate();
            if (validation.hasErrors) return;

            setLoading(true);

            // ✅ merge all form values directly into profile — no field splitting needed
            const updatedProfile = { ...profile, ...form.getValues() };

            try {
                const res = await updateProfile(updatedProfile);
                dispatch(setProfile(res));
                setEdit(false);
                successNotification("Success", "Profile Updated Successfully!");
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleCancelEdit = () => {
        form.reset();
        setEdit(false);
    };

    useEffect(() => {
        getProfile(user.profileId)
            .then((res: any) => {
                dispatch(setProfile(res));
            })
            .catch((err: any) => console.log(err));
    }, []);

    return (
        <div className="px-3 mt-20 flex flex-col gap-1 my-3">

            {/* Name row with action buttons */}
            <div className="text-3xl font-semibold flex justify-between items-center">
                {edit ? (
                    <TextInput
                        {...form.getInputProps('name')}
                        placeholder="Your Name"
                        size="md"
                        classNames={{
                            input: "text-2xl font-semibold bg-transparent border-mine-shaft-600 text-mine-shaft-100",
                        }}
                        className="flex-1 mr-4"
                    />
                ) : (
                    <span>{profile.name || user.name || 'Name'}</span>
                )}

                <div className="flex items-center gap-1 shrink-0">
                    {edit && (
                        <ActionIcon
                            variant="subtle"
                            size="lg"
                            onClick={handleEdit}
                            loading={loading}
                            color="green.6"
                        >
                            <IconCheck className="w-4/5 h-4/5" />
                        </ActionIcon>
                    )}
                    <ActionIcon
                        variant="subtle"
                        size="lg"
                        onClick={edit ? handleCancelEdit : handleEdit}
                        loading={loading}
                        color={edit ? "red.6" : "brightSun.4"}
                    >
                        {edit
                            ? <IconX className="w-4/5 h-4/5" />
                            : <IconPencil className="w-4/5 h-4/5" />
                        }
                    </ActionIcon>
                </div>
            </div>

            {/* Edit mode */}
            {edit ? (
                <>
                    {/* Job Title & Company */}
                    <div className="flex gap-10 [&>*]:w-1/2">
                        <SelectInput form={form} name="jobTitle" {...select[0]} />
                        <SelectInput form={form} name="company" {...select[1]} />
                    </div>

                    {/* Location */}
                    <SelectInput form={form} name="location" {...select[2]} />

                    {/* Total Experience — field name matches backend */}
                    <NumberInput
                        {...form.getInputProps('totalExp')}
                        label="Years of Experience"
                        placeholder="e.g. 3"
                        min={0}
                        max={50}
                        suffix=" yrs"
                        size="sm"
                        classNames={{
                            label: "text-mine-shaft-300 mb-1",
                            input: "bg-transparent border-mine-shaft-600 text-mine-shaft-100",
                        }}
                        className="w-1/2"
                    />
                </>
            ) : (
                <>
                    {/* Job Title & Company */}
                    <div className="text-xl flex gap-1 items-center">
                        <IconBriefcase className="h-5 w-5" />
                        {profile.jobTitle || ''} • {profile.company || ''}
                    </div>

                    {/* Location */}
                    <div className="text-lg flex gap-1 items-center">
                        <IconMapPin className="h-5 w-5" />
                        {profile.location || ''}
                    </div>

                    {/* Total Experience */}
                    {(profile.totalExp !== undefined && profile.totalExp !== null) && (
                        <div className="text-lg flex gap-1 items-center text-mine-shaft-300">
                            <span className="font-medium text-mine-shaft-100">
                                {profile.totalExp}
                            </span>
                            {profile.totalExp === 1 ? 'year' : 'years'} of experience
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Info;
// // import { useEffect, useState } from "react";
// // import fields from "../../Data/Profile"
// // import { getProfile, updateProfile } from "../../Services/ProfileService";
// // import { useDispatch, useSelector } from "react-redux";
// // import { ActionIcon } from "@mantine/core";
// // import { IconBriefcase, IconDeviceFloppy, IconMapPin, IconPencil } from "@tabler/icons-react";
// // import SelectInput from "./SelectInput";
// // import { useForm } from "@mantine/form";
// // import {  setProfile } from "../../Slice/ProfileSlice";

// // const Info = ()=>{

// //     const select = fields
// //     const user = useSelector((state:any)=>state.user)
// //     const profile = useSelector((state:any)=>state.profile)

// //     const dispatch = useDispatch()

// //     const [edit, setEdit] = useState(false)

// //     const form = useForm({
// //     mode: 'controlled',
// //     initialValues: { jobTitle: '', company: '', location:''},
// //     validate: {
// //       },
// //   });


// //     const handleEdit = ()=>{
// //         if(!edit)
// //         {
// //             setEdit(true)
// //             form.setValues({jobTitle : profile.jobTitle , company : profile.company, location : profile.location})
// //         }
// //         else
// //         {
// //             setEdit(false)
// //             let updatedProfile = { ...profile, ...form.getValues() };

// //             try {
// //                     const res = await updateProfile(updatedProfile); // 🔥 API call
// //                     dispatch(setProfile(res)); // update store
// //                 } catch (err) {
// //                     console.log(err);
// //                 }
// //     }

// //     useEffect(()=>{
// //         getProfile(user.profileId)
// //             .then((res:any)=>{
// //                 console.log(res);
// //                 dispatch(setProfile(res))
// //             })
// //             .catch((error:any)=>{console.log(error)})
// //     },[])

// //     return (
// //                     <div className="px-3 mt-20 flex flex-col gap-1 my-3">
// //                 <div className="text-3xl text-mine-shaft-300 font-semibold flex justify-between items-center">
// //                     {user.name || 'Name'}
// //                     <ActionIcon variant="subtle" size={"lg"} color="brightSun.4" onClick={handleEdit}>
// //                         {edit ? <IconDeviceFloppy className="w-4/5 h-4/5" /> : <IconPencil className="w-4/5 h-4/5" />}
// //                     </ActionIcon>
// //                 </div>
                
// //                 {
// //                     edit ? 
// //                     <>
// //                         <div className="flex gap-10 [&>*]:w-1/2">
// //                             <SelectInput form={form} name="jobTitle" {...select[0]} />
// //                             <SelectInput form={form} name="company" {...select[1]} />
// //                         </div>
// //                         <SelectInput form={form} name="location" {...select[2]} />
// //                     </>
// //                     :
// //                     <>
// //                         <div className="text-xl flex gap-1 items-center text-mine-shaft-300">
// //                             <IconBriefcase className="h-5 w-5 text-mine-shaft-400" stroke={1.5} /> 
// //                             {profile.jobTitle || ''} &bull; {profile.company || ''}
// //                         </div>
// //                         <div className="text-lg flex gap-1 items-center text-mine-shaft-300">
// //                             <IconMapPin className="h-5 w-5" stroke={1.5} /> 
// //                             {profile.location || ''}
// //                         </div>
// //                     </> 
// //                 }
// //             </div>
// //     )
// // }
// // }

// // export default Info

// import { useEffect, useState } from "react";
// import fields from "../../Data/Profile";
// import { getProfile, updateProfile } from "../../Services/ProfileService";
// import { useDispatch, useSelector } from "react-redux";
// import { ActionIcon } from "@mantine/core";
// import { IconBriefcase, IconCheck, IconDeviceFloppy, IconMapPin, IconPencil, IconX } from "@tabler/icons-react";
// import SelectInput from "./SelectInput";
// import { useForm } from "@mantine/form";
// import { setProfile } from "../../Slice/ProfileSlice";
// import { successNotification } from "../../Services/NotificationService";

// const Info = () => {

//     const select = fields;
//     const user = useSelector((state: any) => state.user);
//     const profile = useSelector((state: any) => state.profile);

//     const dispatch = useDispatch();

//     const [edit, setEdit] = useState(false);
//     const [loading, setLoading] = useState(false);

//     const form = useForm({
//         mode: 'controlled',
//         initialValues: { jobTitle: '', company: '', location: '' },
//     });

//     const handleEdit = async () => {
//         if (!edit) {
//             setEdit(true);
//             form.setValues({
//                 jobTitle: profile.jobTitle,
//                 company: profile.company,
//                 location: profile.location
//             });
//         } else {
//             setLoading(true);

//             let updatedProfile = { ...profile, ...form.getValues() };

//             try {
//                 const res = await updateProfile(updatedProfile);
//                 dispatch(setProfile(res));
//                 setEdit(false);
//             } catch (err) {
//                 console.log(err);
//             } finally {
//                 setLoading(false);
//             }

//             successNotification("Succsess", "Profile Updated Successfully!")
//         }
//     };

//     const handleCancleEdit = ()=>{
//         setEdit(false);
//     }

//     useEffect(() => {
//         getProfile(user.profileId)
//             .then((res: any) => {
//                 dispatch(setProfile(res));
//             })
//             .catch((err: any) => console.log(err));
//     }, []);

//     return (
//         <div className="px-3 mt-20 flex flex-col gap-1 my-3">

//             <div className="text-3xl font-semibold flex justify-between items-center">
//                 {user.name || 'Name'}
//                 <div>
//                     { 
//                         edit && <ActionIcon
//                                     variant="subtle"
//                                     size="lg"
//                                     onClick={handleEdit}
//                                     loading={loading}
//                                     color="green.8"
//                                 >
//                                     <IconCheck className="w-4/5 h-4/5" />
                                
//                                 </ActionIcon>
//                     }
//                     <ActionIcon
//                         variant="subtle"
//                         size="lg"
//                         onClick={edit ? handleCancleEdit : handleEdit }
//                         loading={loading}
//                         color={edit ? "red.8" : "brightSun.4"}
//                     >
//                         {edit
//                             ? <IconX className="w-4/5 h-4/5" />
//                             : <IconPencil className="w-4/5 h-4/5" />
//                         }
//                     </ActionIcon>
//                 </div>
//             </div>

//             {
//                 edit ?
//                     <>
//                         <div className="flex gap-10 [&>*]:w-1/2">
//                             <SelectInput form={form} name="jobTitle" {...select[0]} />
//                             <SelectInput form={form} name="company" {...select[1]} />
//                         </div>
//                         <SelectInput form={form} name="location" {...select[2]} />
//                     </>
//                     :
//                     <>
//                         <div className="text-xl flex gap-1 items-center">
//                             <IconBriefcase className="h-5 w-5" />
//                             {profile.jobTitle || ''} • {profile.company || ''}
//                         </div>

//                         <div className="text-lg flex gap-1 items-center">
//                             <IconMapPin className="h-5 w-5" />
//                             {profile.location || ''}
//                         </div>
//                     </>
//             }
//         </div>
//     );
// };

// export default Info;