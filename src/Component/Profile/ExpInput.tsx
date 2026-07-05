import { Button, Checkbox, Textarea } from "@mantine/core";
import SelectInput from "./SelectInput";
import { useEffect, useState } from "react";
import fields from "../../Data/Profile";
import { MonthPickerInput } from "@mantine/dates";
import { useDispatch, useSelector } from "react-redux";
import { isNotEmpty, useForm } from "@mantine/form";
import { changeProfile } from "../../Slice/ProfileSlice";
import { successNotification } from "../../Services/NotificationService";
import { formatMonth } from "../../Services/Utilities";

const ExpInput = (props:any) => {
  
  const profile = useSelector((state:any)=>state.profile)

  const dispatch = useDispatch()

  const form = useForm({
    mode: 'controlled',
    validateInputOnChange: true,
    initialValues: {
        title: '',
        company: '',
        location: '',
        description: '',
        startDate: new Date(),
        endDate: new Date(),
        working: false
    },
    
    validate: {
      title: isNotEmpty("Title is required"),
      company: isNotEmpty("Company is required"),
      location: isNotEmpty("Location is required"),
      description: isNotEmpty("Description is required"),
    }
  });

  useEffect(() => {
    if (!props.add) form.setValues({
      title: props.title,
      company: props.company,
      location: props.location,
      description: props.description,
      startDate: new Date(props.startDate),
      endDate: new Date(props.endDate),
      working: props.working
    })
  },[])

  const select = fields;
  const [desc, setDesc] = useState(props.description)
      const handleSave = () => {
        form.validate();
        if (!form.isValid()) return;

        let exp = [...profile.experiences]

        if (props.add) {
            exp.push(form.getValues());
            exp[exp.length - 1].startDate = formatMonth(exp[exp.length - 1].startDate);
            exp[exp.length - 1].endDate = formatMonth(exp[exp.length - 1].endDate);
        }
        else {
            exp[props.index] = form.getValues();
            
            exp[props.index].startDate = formatMonth(exp[props.index].startDate) ;
            exp[props.index].endDate = formatMonth(exp[props.index].endDate) ;
        }

        let updatedProfile = { ...profile, experiences: exp }
        props.setEdit(false)
        dispatch(changeProfile(updatedProfile))
        successNotification("Success", `Experiences ${props.add ? 'Added' : 'Updated'} updated Successfully`)
    }


  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold justify-center">{props.add ? "Add Experience" : "Edit Experience"}</div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <SelectInput form={form} name="title" {...select[0]} />
        <SelectInput form={form} name="company" {...select[1]} />
      </div>
      <SelectInput form={form} name="location" {...select[2]} />
      <Textarea withAsterisk
        {...form.getInputProps('description')}
       label = "Summary"
        placeholder="Enter Summary"
        autosize
        minRows={3}
      />
      <div className="flex gap-10 [&>*]:w-1/2">
        <MonthPickerInput withAsterisk
        {...form.getInputProps('startDate')}
          label="Start Date"
          placeholder="Pick date"
          maxDate={form.getValues().endDate || undefined}
          valueFormat="MMM YYYY"
        />
         <MonthPickerInput withAsterisk
        {...form.getInputProps('endDate')}
          disabled={form.getValues().working}
          label="End Date"
          placeholder="Pick date"
          minDate={form.getValues().startDate || undefined}
          maxDate={new Date()}
          valueFormat="MMM YYYY"
        />
        </div>
        <Checkbox {...form.getInputProps('working')} checked={form.getValues().working} onChange={(event) => form.setFieldValue("working", event.currentTarget.checked)} autoContrast label="Currently working here"/>
        <div className="flex gap-5 justify-center">
          <Button onClick={handleSave} color="brightSun.4" variant="outline">Save</Button>
          <Button color="red.8" onClick={()=>props.setEdit(false)} variant="light">Cancel</Button>
        </div>
    </div>
  );
  
};

export default ExpInput