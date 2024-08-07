import React, {useEffect, useState} from "react"
import s from "./Header.module.scss"
import {GlobalSvgSelector} from "../../assets/icons/global/GlobalSvgSelector";
import Select from 'react-select'
import {useTheme} from "../../hooks/useTheme";
import {Theme} from "../../context/ThemeContext";
import {useDispatch} from "react-redux";
import {setTemperature} from "../../store/tempSlice";
import {weatherApi} from "../../axios/WeatherApi";



const Header = () => {


    const themeObj = useTheme()

    const dispatch = useDispatch()


    const options: any = [
        {value: 'Vilnius', label: 'Visaginas'},
        {value: 'Ipswich', label: 'Ipswich'},
        {value: 'London', label: 'London'}
    ]

    const colourStyles = {
        control: (styles: any) => ({
            ...styles,
            backgroundColor: themeObj.theme === Theme.DARK ? '#4F4F4F' : 'rgba(71, 147, 255, 0.2)',
            width: '194px',
            height: '37px',
            border: 'none',
            boarderRadius: '10px',
            zIndex: 100,
        }),
        singleValue: (styles: any) => ({
            ...styles,
            color: themeObj.theme === Theme.DARK ? '#fff' : '#000'
        })
    }

    function changeTheme() {
        themeObj.changeTheme(themeObj.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT)

    }


    const [selectedOption, setSelectedOption] =
        useState(options[0])


    // Function to handle select change and trigger redraw
    const handleSelectChange = async (selectedOption: any) => {
        setSelectedOption(selectedOption);
        weatherApi.get(`&q=${selectedOption.value}`)
            .then(response => {
                dispatch(setTemperature(response.data.current.temp_c))
            })
            .catch(error => {
                // Handle error scenarios
                console.error('Error fetching data:', error);
            });

    };


    return (
        <header className={s.header}>
            <div className={s.wrapper}>
                <div className={s.logo}><GlobalSvgSelector id={'header-logo'}/></div>
                <div className={s.title}>Weather</div>
            </div>
            <div className={s.wrapper}>
                <div className={s.change_theme} onClick={changeTheme}>
                    <GlobalSvgSelector id={'change-theme'}/>
                </div>
                <Select value={selectedOption}
                        styles={colourStyles}
                        options={options}
                        onChange={(e) => handleSelectChange(e)}
                        placeholder="Select an option"
                />
            </div>
        </header>
    )
}


export default Header