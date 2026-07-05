import { Divider, RangeSlider } from "@mantine/core";
import { dropdownData } from "../../Data/JobsData";
import MultiInput from "./MultiInput";
import React, { useState } from "react";
import { updateFilter } from "../../Slice/FilterSlice";
import { useDispatch } from "react-redux";

const SearchBar = () => {
    
    const dispatch = useDispatch();
    const [value, setValue] = useState<[number, number]>([1, 300])
    const handleChange = (event: any) => {

        dispatch(updateFilter({ salary: event }))

    }

    return (
        <div className="flex items-center bg-mine-shaft-900 rounded-xl px-5 py-4 gap-3">
            
            {
                dropdownData.map((item, index) => (
                    <React.Fragment key={index}>
                        
                        {/* Equal width for all inputs */}
                        <div className="flex-1">
                            <MultiInput {...item} />
                        </div>

                        {/* Divider except last */}
                        {index !== dropdownData.length - 1 && (
                            <Divider 
                                size="sm" 
                                orientation="vertical" 
                                color="mineShaft.6" 
                                style={{ height: '32px', opacity: 0.8 }} 
                            />
                        )}

                    </React.Fragment>
                ))
            }

<Divider 
                                size="sm" 
                                orientation="vertical" 
                                color="mineShaft.6" 
                                style={{ height: '32px', opacity: 0.8 }} 
                            />
            {/* Salary Section */}
            <div className="flex-1 px-2">
                <div className="flex justify-between text-sm mb-1 text-mine-shaft-200">
                    <div>Salary</div>
                    <div>&#8377; {value[0]} LPA - &#8377; {value[1]} LPA</div>
                </div>

                <RangeSlider 
                    color="brightSun.5" 
                    size="xs" 
                    value={value} 
                    onChange={setValue} 
                    labelTransitionProps={{
                        transition: 'skew-down',
                        duration: 150,
                        timingFunction: 'linear'
                    }}
                    onChangeEnd={handleChange} 
                />
            </div>

        </div>
    );
};

export default SearchBar;