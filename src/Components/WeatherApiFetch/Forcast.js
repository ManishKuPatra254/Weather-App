import stylesfrommodule from './Forcast.module.css';
import { useEffect, useState } from 'react';


export function WeatherContext() {

    const [renderData, setRenerData] = useState()
    const [searchforData, setSearchforData] = useState()

    useEffect(() => {
        dataFetch()
    }, [searchforData])

    async function dataFetch() {
        const fetchApi = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchforData}&appid=41e2fef04df9501a8ef6612673083c16`)
        const conversion = await fetchApi.json()
        console.log(conversion)
        if (fetchApi.ok) {
            setRenerData(conversion)
        }
    }


    function changesWhileRender(event) {
        setSearchforData(event.target.value);
    }
    return (
        <>
            <div className={stylesfrommodule.main_container}>

                <h1>Weather <span>Forcast</span></h1>
                <input type="text" name='search' placeholder='Enter the name of the place' value={searchforData} onChange={changesWhileRender} />
                {renderData ? <div className='conditional-rendering'>
                    <img src={"http://openweathermap.org/img/w/" + renderData.weather[0].icon + ".png"} alt="" className='images-specification' />
                    <p>Temperature : {renderData.main.temp}</p>
                    <br />
                    <p>Humidity : {renderData.main.humidity}</p>
                    <br />
                    <p>Sea Level  : {renderData.main.sea_level}</p>
                    <br />
                    <p>Pressure  : {renderData.main.pressure}</p>
                </div>
                    : <div id='last-div'>Try Again</div>}
            </div>
        </>
    )
}