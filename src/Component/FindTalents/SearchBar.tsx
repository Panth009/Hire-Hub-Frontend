import { Divider, Input, RangeSlider } from "@mantine/core"
import React, { useState } from "react"; // Fragment key ke liye zaroori hai
import MultiInput from "./MultiInput";
import { searchFields } from "../../Data/TalentData";
import { IconUserCircle } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../../Slice/FilterSlice";

const SearchBar = () => {
    const [value, setValue] = useState<[number, number]>([0, 50]);
    const dispatch = useDispatch()

    const [name, setName] = useState('');
    const handleChange =(name:any, event:any) =>{
        if (name == "exp")
            dispatch(updateFilter({exp:event}))
        else {
            setName(event.target.value)
            dispatch(updateFilter({name:event.target.value}))
        }
    }

    return (
        // Main container ko full width (w-full) di hai taaki andar ke items expand ho sakein
        <div className="flex items-center bg-mine-shaft-900 rounded-xl px-5 py-4 w-full">
            
            {/* 1. Talent Name Section - flex-1 se equal width milegi */}
            <div className="flex items-center flex-1">
                <div className="text-bright-sun-400 bg-mine-shaft-900 rounded-full p-1 mr-2">
                    <IconUserCircle size={20}/>
                </div>
                <Input 
                    className="[&_input]:!placeholder-mine-shaft-200 w-full" 
                    variant="unstyled" 
                    placeholder="Talent Name" 
                    defaultValue={name} onChange={(e)=>handleChange("name",e)}
                />
            </div>

            <Divider 
                size="sm" 
                orientation="vertical" 
                color="mineShaft.6" 
                style={{ height: '32px', opacity: 0.8 }} 
                className="mx-5" 
            />
            
            {
                searchFields.map((item, index) => (
                    <React.Fragment key={index}>
                        {/* 2. Dynamic Search Fields - flex-1 ensures equality */}
                        <div className="flex-1">
                            <MultiInput {...item} />
                        </div>
                        <Divider 
                            size="sm" 
                            orientation="vertical" 
                            color="mineShaft.6" 
                            style={{ height: '32px', opacity: 0.8 }} 
                            className="mx-2"
                        />
                    </React.Fragment>
                ))
            }

            <div className="flex-1 px-2">
                <div className="flex justify-between text-sm mb-1 text-mine-shaft-200">
                    <div>Experiance [Years]</div>
                    <div>&#8377; {value[0]} - &#8377; {value[1]} </div>
                </div>
                <RangeSlider 
                    color="brightSun.5" 
                    size="xs" 
                    value={value} 
                    onChange={setValue} 
                    min={0}
                    max={50}
                    onChangeEnd={(e)=>handleChange("exp",e)}
                    labelTransitionProps={{transition: 'skew-down', duration: 150, timingFunction: 'linear'}} 
                    minRange={1}
                />
            </div>
        </div>
    )
}

export default SearchBar