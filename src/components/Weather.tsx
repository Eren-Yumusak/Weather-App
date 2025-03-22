import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import thunder_icon from '../assets/thunder.png'

type WeatherData = {
    humidity: number;
    windSpeed: number;
    temperature: number;
    location: string;
    icon: string;
};

const Weather = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    const allIcons = {
        "01d" : clear_icon,
        "01n" : clear_icon,
        "02d" : cloud_icon,
        "03d" : cloud_icon,
        "03n" : cloud_icon,
        "04d" : cloud_icon,
        "04n" : cloud_icon,
        "09d" : drizzle_icon,
        "09n" : drizzle_icon,
        "10d" : rain_icon,
        "10n" : rain_icon,
        "11d" : thunder_icon,
        "11n" : thunder_icon,
        "13d" : snow_icon,
        "13n" : snow_icon

    }
    const search = async (city: string)=>{
        if(city == ""){
            alert("Enter a Location Please")
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            const icon = allIcons[data.weather[0].icon as keyof typeof allIcons] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        } catch (error) {
            console.log("Error fetching data");
        }
    }
    
    useEffect(()=>{
        search("London")
    },[])

  return (
    <div className='weather'>
        <img src={weatherData?.icon} alt="weather icon" className='weather-icon'/>
        <p className='temperature'>{weatherData?.temperature}</p>
        <p className='location'>{weatherData?.location}</p>
        <div className='weather-data'>
            <div className='col'>
                <img src={humidity_icon} alt="humidity icon" />
                <div>
                    <p>{weatherData?.humidity}</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className='col'>
                <img src={wind_icon} alt="wind icon" />
                <div>
                    <p>{weatherData?.windSpeed}</p>
                    <span>Wind</span>
                </div>
            </div>
        </div>
        <div className="search-bar">
            <input  ref={inputRef} type="text" placeholder='Search'/>
            <img src={search_icon} alt="search icon" onClick={()=>search(inputRef.current.value)}/>
        </div>
    </div>
  )
}

export default Weather