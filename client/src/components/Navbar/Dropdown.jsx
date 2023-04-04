import React , {useState , useEffect} from 'react';
import {MdLightMode} from 'react-icons/md';
import {IoMdMoon} from 'react-icons/io';

const Dropdown = () => {

  const [themeType, setThemeType] = useState(
    localStorage.getItem("themeType") || "dark-theme"
  );

  useEffect(() => {
    document.body.className = themeType;
    localStorage.setItem("themeType", themeType);
  }, [themeType]);

  const handleTheme = () => {
    if (themeType === "dark-theme") {
      setThemeType("light-theme");
    } else {
      setThemeType("dark-theme");
    }
  };


  return (
    <>
        <div className="nav-dropdown">

            {
            (themeType === 'light-theme') ? <>
            <IoMdMoon className='icon'/> 
            <p className='roboto' style = {{cursor : 'pointer'}} onClick = {() => handleTheme()}>Dark Mode</p>
            </>
            :
            <>
            <MdLightMode className='icon'/>
            <p className='roboto' style = {{cursor : 'pointer'}} onClick = {() => handleTheme()}>Light Mode</p>
            </>

            }
        </div>
    </>
  )
}

export default Dropdown