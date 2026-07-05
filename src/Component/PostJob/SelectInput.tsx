// import { Combobox, InputBase, ScrollArea, useCombobox } from '@mantine/core';
// import { useEffect, useState } from 'react';

// const SelectInput = (props: any) => {
//     const combobox = useCombobox({
//         onDropdownClose: () => combobox.resetSelectedOption(),
//     });

//     // Data ko empty array se initialize karna zaroori hai
//     const [data, setData] = useState<string[]>([]);
//     const [value, setValue] = useState<string | null>(null);
//     const [search, setSearch] = useState('');

//     useEffect(() => {
//         if (props.options) {
//             setData(props.options);
//         }
//     }, [props.options]);

//     // Safety check: data undefined na ho
//     const exactOptionMatch = data.some((item) => item === search);
//     const filteredOptions = exactOptionMatch
//         ? data
//         : data.filter((item) => item.toLowerCase().includes(search.toLowerCase().trim()));

//     const options = filteredOptions.map((item) => (
//         <Combobox.Option value={item} key={item}>
//             {item}
//         </Combobox.Option>
//     ));

//     // Icon ko ek variable mein store karke check karte hain taaki undefined error na aaye
//     const Icon = props.icon;

//     return (
//         <Combobox
//             store={combobox}
//             withinPortal={false}
//             onOptionSubmit={(val) => {
//                 if (val === '$create') {
//                     setData((current) => [...current, search]);
//                     setValue(search);
//                     setSearch(search);
//                 } else {
//                     setValue(val);
//                     setSearch(val);
//                 }

//                 combobox.closeDropdown();
//             }}
//         >
//             <Combobox.Target>
//                 <InputBase withAsterisk
//                     // Error Fix: Pehle check karein ki Icon exist karta hai
//                     leftSection={Icon ? <Icon stroke={1.5} size={20} /> : null}
//                     label={props.label}
//                     rightSection={<Combobox.Chevron />}
//                     value={search}
//                     onChange={(event) => {
//                         combobox.openDropdown();
//                         combobox.updateSelectedOptionIndex();
//                         setSearch(event.currentTarget.value);
//                     }}
//                     onClick={() => combobox.openDropdown()}
//                     onFocus={() => combobox.openDropdown()}
//                     onBlur={() => {
//                         combobox.closeDropdown();
//                         setSearch(value || '');
//                     }}
//                     placeholder={props.placeholder || "Search value"}
//                     rightSectionPointerEvents="none"
//                     className='text-md text-mine-shaft-300[&_input] :font-medium gap-5'
//                 />
//             </Combobox.Target>

//             <Combobox.Dropdown>
//                 <Combobox.Options>
//                     <ScrollArea.Autosize mah={200} type="scroll">
//                         {options.length > 0 ? options : <Combobox.Empty>Nothing found</Combobox.Empty>}
                        
//                         {!exactOptionMatch && search.trim().length > 0 && (
//                             <Combobox.Option value="$create">+ Create {search}</Combobox.Option>
//                         )}
//                     </ScrollArea.Autosize>
//                 </Combobox.Options>
//             </Combobox.Dropdown>
//         </Combobox>
//     );
// }

// export default SelectInput;

import { useEffect, useState } from 'react';
import { Combobox, InputBase, ScrollArea, useCombobox } from '@mantine/core';



const SelectInput = (props: any) => {
  useEffect(() => {
    setData(props.options)
    setValue(props.form.getInputProps(props.name).value )
    setSearch(props.form.getInputProps(props.name).value )
  }, [props])
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [data, setData] = useState<string[]>([]);
  const [value, setValue] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const exactOptionMatch = data.some((item) => item === search);
  const filteredOptions = exactOptionMatch
    ? data
    : data.filter((item) => item.toLowerCase().includes(search?.toLowerCase().trim()));

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        if (val === '$create') {
          setData((current) => [...current, search]);
          setValue(search);
          props.form.setFieldValue(props.name, search);
        } else {
          setValue(val);
          setSearch(val);
          props.form.setFieldValue(props.name, val);
        }

        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase withAsterisk className='[&_input]:font-medium'
          {...props.form.getInputProps(props.name)}
          label={props.label}
          rightSection={<Combobox.Chevron />}
          value={search}
          onChange={(event) => {
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            setSearch(value || '');
          }}
          placeholder={props.placeholder}
          rightSectionPointerEvents="none"
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          <ScrollArea.Autosize mah={200} type="scroll">
            {options}
            {!exactOptionMatch && search?.trim().length > 0 && (
              <Combobox.Option value="$create">+ Create {search}</Combobox.Option>
            )}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export default SelectInput;