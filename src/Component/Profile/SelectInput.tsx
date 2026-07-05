import { Combobox, InputBase, ScrollArea, useCombobox } from '@mantine/core';
import { useEffect, useState } from 'react';

const SelectInput = (props: any) => {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const [data, setData] = useState<string[]>([]);
    const [value, setValue] = useState<string | null>(null);
    const [search, setSearch] = useState('');

    
    useEffect(() => {
        setData(props.options || []);
        setValue(props.form.getInputProps(props.name).value) ;
        setSearch(props.form.getInputProps(props.name).value);
    }, [props.options, props.value]);

    const exactOptionMatch = data.some((item) => item === search);

    const filteredOptions = exactOptionMatch
        ? data
        : data.filter((item) =>
              item.toLowerCase().includes((search || '').toLowerCase().trim())
          );

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
                    setSearch(search);
                    props.form.setFieldValue(props.name,search);
                } else {
                    setValue(val);
                    setSearch(val);
                    props. form.setFieldValue(props.name, val);
                }

                combobox.closeDropdown();
            }}
        >
            <Combobox.Target>
                <InputBase {...props.form.getInputProps(props.name)}
                    withAsterisk
                    leftSection={
                        props.leftSection ? <props.leftSection stroke={1.5} /> : null
                    }
                    label={props.label}
                    rightSection={<Combobox.Chevron />} 
                    value={search}
                    onChange={(event) => {
                        const val = event.currentTarget.value;
                        setSearch(val);
                        combobox.openDropdown();
                        combobox.updateSelectedOptionIndex();
                    }}
                    onClick={() => combobox.openDropdown()}
                    onFocus={() => combobox.openDropdown()}
                    onBlur={() => {
                        combobox.closeDropdown();
                        setSearch(value || '');
                    }}
                    placeholder={props.placeholder || "Search value"}
                    rightSectionPointerEvents="none"
                    className='text-md text-mine-shaft-300 [&_input]:font-medium gap-5'
                />
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>
                    <ScrollArea.Autosize mah={200} type="scroll">
                        {options.length > 0 ? options : <Combobox.Empty>Nothing found</Combobox.Empty>}

                        {!exactOptionMatch && search.trim().length > 0 && (
                            <Combobox.Option value="$create">
                                + Create {search}
                            </Combobox.Option>
                        )}
                    </ScrollArea.Autosize>
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
};

export default SelectInput;