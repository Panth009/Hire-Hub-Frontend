import { Menu, Button, Text, Avatar, Switch, rem } from '@mantine/core';
import { GearSixIcon, MagnifyingGlassIcon, ImageIcon, ChatCircleIcon, TrashIcon, MoonIcon, SunIcon } from '@phosphor-icons/react';
import { IconArrowsLeftRight, IconFileText, IconLogout2, IconMoonStars, IconSun, IconUserCircle } from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeUser } from '../../Slice/UserSlice';
import { removeJwt } from '../../Slice/JwtSlice';

const ProfileMenu = ()=>{
  const dispatch = useDispatch()
  const [checked, setChecked] = useState(false);
  const [opened, setOpened] = useState(false);
  const user = useSelector((state:any)=>state.user)
  const profile = useSelector((state:any)=>state.profile)


  const handleLogout = ()=>{
    localStorage.removeItem("jwt");
                  localStorage.removeItem("user"); 
                  // Redux clear
                  dispatch(removeJwt());
                  dispatch(removeUser());

  }

  return (
    <Menu shadow="md" width={200}opened={opened} onChange={setOpened}>
      <Menu.Target>
        <div className="flex items-center gap-3 cursor-pointer">
          <div>{profile?.name}</div>
          <Avatar src={profile?.picture?`data:image/jpeg;base64,${profile.picture}`:"../Icons/Avatar.png"}  alt="it's me" />
        </div>
      </Menu.Target>

      <Menu.Dropdown onClick={()=>setOpened(true)}>
        <Link to="/profile">
          <Menu.Item leftSection={<IconUserCircle size={14} />}>
            Profile
          </Menu.Item>
        </Link>
        <Menu.Item leftSection={<ChatCircleIcon size={14} />}>
          Messages
        </Menu.Item>
        <Menu.Item leftSection={<IconFileText size={14} />}>
          Resume
        </Menu.Item>

        <Menu.Item
          leftSection={<MoonIcon size={14} />}
          rightSection={
            <Switch
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}
              size="md"
              color="dark.4"
              onLabel={
                <IconSun
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={2.5}
                  color="cyan"
                />
              }
              offLabel={
                <IconMoonStars
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={2.5}
                  color="cyan"
                />
              }
            />
          }
        >
          Dark Mode
        </Menu.Item>

        <Menu.Divider />
        <Menu.Item color="red" onClick={handleLogout} leftSection={<IconLogout2 size={14} />}>
          Logout
        </Menu.Item>

      </Menu.Dropdown>
    </Menu>
  );
}

export default ProfileMenu;