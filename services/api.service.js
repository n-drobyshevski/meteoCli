import axios from "axios";
import { getKeyValue } from "./storage.service.js";

const getWeather = async () => {
    const appData = await getKeyValue()
    const token = appData['token']
    const city = appData['city']
    const lang = appData['lang']
    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: token,
            lang: lang,
            units: 'metric'
        }
    });
    return data;
}

export { getWeather }