import { useEffect, useState } from "react";

const useDataFetcher = (zipcode) => {
    const [weatherData, setWeatherData] = useState(null);
    const [musicData, setMusicData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const fetchWeatherData = async (z) => {
        const key = process.env.REACT_APP_OW_KEY;
        try {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${z},us&appid=${key}`);
          const data = await response.json();
          return data;
        } catch (error) {
          throw error;
        }
    };

    const fetchMusicData = async (w) => {
        try {
            const response = await fetch("http://localhost:8000/api/generate/",
            {
                method : "POST",
                headers : { "Content-Type" : "application/json" },
                body : JSON.stringify(w)
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("error")
            throw error;
        }
    };


    useEffect(() => {
        fetchWeatherData(zipcode)
        .then(data => {
            setWeatherData(data);
            return fetchMusicData(data);
        })
        .then(mdata => {
            setMusicData(mdata);
            setIsPending(false);
        })
        .catch(err => {
            setError(err.message);
            setIsPending(false);
            console.log(err.message);
        })
    }, [zipcode])

    return { weatherData, musicData, isPending, error }
}
 
export default useDataFetcher;



