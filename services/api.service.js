import axios from "axios";
import { getKeyValue } from "./storage.service.js";

const getWeather = async () => {
    const appData = await getKeyValue()
    const token = appData['token']

    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: "london",
            appid: token,
            lang: 'ru',
            units: 'metric'
        }
    });
    return data;
}

export { getWeather }