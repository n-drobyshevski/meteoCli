var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import { DATA_DICTIONARY, getKeyValue } from "./storage.service.js";
const getWeather = () => __awaiter(void 0, void 0, void 0, function* () {
    const appData = yield getKeyValue();
    const token = appData[DATA_DICTIONARY.token];
    const city = appData[DATA_DICTIONARY.city];
    const lang = appData[DATA_DICTIONARY.lang];
    const res = yield axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: token,
            lang: lang,
            units: 'metric'
        }
    });
    return res.data;
});
export { getWeather };
