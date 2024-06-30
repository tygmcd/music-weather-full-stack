import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './css/Home.css'
import { ZipToState } from "./utilities/ZipToState";
import { UnixToDate } from "./utilities/UnixToDate";
import { CapitalizeString } from "./utilities/CapitalizeString";
import loading from './images/loading.gif'
import { IconContext } from "react-icons";
import { CiLocationOn } from "react-icons/ci";
import { FiSunset } from "react-icons/fi";
import { FiSunrise } from "react-icons/fi";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { PiVinylRecordFill } from "react-icons/pi";

import OpenAI from "openai";
import useDataFetcher from "./useDataFetcher";

const Home = () => {
    const { state } = useLocation();
    const zipcode = state.zip.zipcode;
    <IconContext.Provider value={{ className: 'react-icons' }}></IconContext.Provider>

    const { weatherData, musicData, isPending, error } =  useDataFetcher(zipcode);

    return ( 
        <IconContext.Provider value={{ className: 'react-icons' }}>
            <div className="back-button">
                <Link to="/">
                    <IoArrowBackCircleOutline size="3rem" cursor="pointer" color="white"/>
                </Link>
            </div>
            { (error) && 
            <div className="error-wrapper">
                <div className='error-title'><h1>Woops!</h1></div>
                <h3 className='error-subtitle'>An error has occured... <Link className="error-link" to="/">Back to home</Link></h3>
            </div>}
            <div className="home-wrapper">
                { (isPending) && <div className="loading-wrapper"><img className='loading' src={loading} alt="Loading..."></img></div> }
                { weatherData && musicData &&
                <>
                <div className="weather-section">
                    <div className="row-1">
                        <h1 className="w-temp">{ Math.round((weatherData.main.temp - 273.15) * 1.8 + 32) }<span className="w-deg-l">&deg;</span></h1>
                        <img className="w-icon" src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="condition-img"></img>
                    </div>
                    <div className="row-2">
                        <p className="hi-lo">H: { Math.round((weatherData.main.temp_max- 273.15) * 1.8 + 32) }<span className="w-deg-s">&deg;</span></p>
                        <p className="hi-lo">L: { Math.round((weatherData.main.temp_min - 273.15) * 1.8 + 32) }<span className="w-deg-s">&deg;</span></p>
                    </div>
                    <div className="row-3">
                        {/* <h1>{ weatherData.weather[0].description }</h1> */}
                        <h1 className="w-city"><CiLocationOn />{ weatherData.name }, { ZipToState(String(zipcode)) }</h1>
                    </div>
                    <div className="row-4">
                        <p className="w-realfeel">Feels Like: { Math.round((weatherData.main.feels_like - 273.15) * 1.8 + 32)}<span className="w-deg-s">&deg;</span></p>
                        <p className="w-sunrise"><FiSunrise color="#ffa700" />{ UnixToDate(weatherData.sys.sunrise) }</p>
                        <p className="w-sunset"><FiSunset color="#2F1D7E"/>{ UnixToDate(weatherData.sys.sunset) }</p>
                    </div>
                </div> 
                <div className="music-section">
                    <div className="m-desc">
                        <h1>Here are some songs that match your weather:</h1>
                    </div>
                    <div className="m-songs">
                    {musicData.songs.map((song) => (
                        <p className="m-song"><span className="m-song-title">{song.title}<br></br></span><span className="m-song-artist">{song.artist}</span></p>
                    ))}
                    </div>
                
                </div>
                </>
                }
            </div>
        </IconContext.Provider>
        
    );
}
 
export default Home;