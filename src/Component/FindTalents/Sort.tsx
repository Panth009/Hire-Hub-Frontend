import { useState } from 'react';
import { Combobox, useCombobox } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { updateSort } from '../../Slice/SortingSlice';

const opt = ['Relevance', 'Experience (Low-High)', 'Experience (High-Low)'];

const Sort = () => {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = opt.map((item) => (
    <Combobox.Option value={item} key={item} className="text-sm">
      {item}
    </Combobox.Option>
  ));

  return (
    <div className="flex items-center gap-2 text-mine-shaft-100">
        <span className="text-m font-medium text-mine-shaft-300">Sort by :</span>
      
      <Combobox
        store={combobox}
        width={200}
        position="bottom-end"
        withArrow
        onOptionSubmit={(val) => {
          setSelectedItem(val);
          dispatch(updateSort(val))
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <div 
            onClick={() => combobox.toggleDropdown()} 
            className="flex items-center gap-2 border border-bright-sun-400 px-3 py-1.5 rounded-xl cursor-pointer hover:bg-mine-shaft-800 transition-colors"
          >
            <span className="text-sm">{selectedItem || 'Relevance'}</span>
            <IconAdjustments className="text-bright-sun-400" size={16} />
          </div>
        </Combobox.Target>

        <Combobox.Dropdown className="bg-mine-shaft-900 border-mine-shaft-700">
          <Combobox.Options>
            {options}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
}

export default Sort;