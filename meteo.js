#!/usr/bin/env node
// ab1c76e9b0b9a762d74b32366a201ba9

import { getArgs } from "./helpers/args.js";
import { getWeather } from "./services/api.service.js";
import { printHelp } from "./services/log.service.js";
import { saveKeyValue } from "./services/storage.service.js";

const saveToken = async (token) => {
    if (token) {
        await saveKeyValue('token', token)
    }
}

const saveCity = async (city) => {
    if (city) {
        await saveKeyValue('city', city)
    }
}

const setLanguage = async (lang) => {
    if (lang) {
        await saveKeyValue('lang', lang)
    }
}
const getForecast = async () => {
    const data = await getWeather()
    console.log(data)
}

const cliInit = () => {
    let args = getArgs(process.argv);
    if (args.h) {
        return printHelp();
    }
    if (args.c) {
        const city = args.c;
        return saveCity(city);
    }
    if (args.t) {
        return saveToken(args.t);
    }
    if(args.l){
        return setLanguage(args.l)
    }
    return getForecast()

}

cliInit()