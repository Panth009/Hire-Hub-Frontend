import { Button, Checkbox, Textarea, TextInput } from "@mantine/core";
import SelectInput from "./SelectInput";
import { useState } from "react";
import fields from "../../Data/Profile";
import { MonthPickerInput } from "@mantine/dates";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slice/ProfileSlice";
import { successNotification } from "../../Services/NotificationService";

const CertiInput = (props:any) => {
  
  const dispatch = useDispatch()
  const select = fields;
  const profile = useSelector((state:any) => state.profile)
  const form = useForm({
    mode: 'controlled',
    validateInputOnChange: true,
    initialValues: {
        name: '',
        issuer: '',
        issueDate: new Date(),
        certificateId: ''
    },
    validate: {
        name: isNotEmpty("Name is required"),
        issuer: isNotEmpty("issuer is required"),
        issueDate: isNotEmpty("issueDate is required"),
        certificateId: isNotEmpty("certificateId is required")

    }
})
  const handleSave = () => {
    form.validate();
    if(!form.isValid()) return

    let certi = [...profile.certifications]
    certi.push(form.getValues())
    certi[certi.length -1].issueDate = certi[certi.length -1].issueDate.toISOString();

    let updateProfile = {...profile, certifications:certi} 
    props.setEdit(false)
    dispatch(changeProfile(updateProfile));
    successNotification("Success", "certificate added succesfully...!")
  }
  const [issueDate, setIssueDate] = useState<Date | null>(new Date());
  
 return (
  <div className="flex flex-col gap-3">
    <div className="text-lg font-semibold">Add Certificate</div>
    
    <div className="flex gap-10 [&>*]:w-1/2">
      <TextInput label="Title" {...form.getInputProps('name')} withAsterisk placeholder="Enter title" />
      <SelectInput form={form} name='issuer' {...select[1]} />
    </div>

    <div className="flex gap-10 [&>*]:w-1/2">
      <MonthPickerInput
      {...form.getInputProps('issueDate')}
        withAsterisk
        maxDate={new Date()}
        label="Issue Date"
        placeholder="Pick date"
        value={issueDate}
        onChange={(val) => setIssueDate(val as Date | null)}
      />
      <TextInput {...form.getInputProps('certificateId')} label="Certificaet Id" withAsterisk placeholder="Enter Certificate Id" />
    </div>

    <div className="flex gap-5">
      <Button onClick={handleSave} color="brightSun.4" variant="outline">
        Save
      </Button>
      <Button color="red.8" onClick={() => props.setEdit(false)} variant="light">
        Cancel
      </Button>
    </div>
  </div>
);
};

export default CertiInput