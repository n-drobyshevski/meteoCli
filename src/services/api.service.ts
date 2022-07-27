import axios from "axios";
import { DATA_DICTIONARY, getKeyValue } from "./storage.service.js";

interface IApi {
    coord: { lon: number, lat: number },
    weather: [{ id: number, main: string, description: string, icon: string }],
    base: string,
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number
    },
    visibility: number,
    wind: { speed: number, deg: number },
    clouds: { all: number },
    dt: number,
    sys: {
        type: number,
        country: string,
        sunrise: number,
        sunset: number
    },
    timezone: number,
    id: number,
    name: string,
    cod: number
}

const getWeather = async (): Promise<any> => {
    const appData: {[key :string]:string} = await getKeyValue();
    const token = appData[DATA_DICTIONARY.token];
    const city = appData[DATA_DICTIONARY.city];
    const lang = appData[DATA_DICTIONARY.lang];
    const res:any = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: token,
            lang: lang,
            units: 'metric'
        }
    });
    return res.data;
}

export { getWeather, IApi }