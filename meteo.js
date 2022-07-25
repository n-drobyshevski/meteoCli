#!/usr/bin/env node
// ab1c76e9b0b9a762d74b32366a201ba9

import { getArgs } from "./helpers/args.js";
import { getWeather } from "./services/api.service.js";
import { printError, printHelp, printSuccess } from "./services/log.service.js";
import { DATA_DICTIONARY, saveKeyValue } from "./services/storage.service.js";

const saveToken = async (token) => {
    if (!token.length) {
        printError("Token value not provided");
        return;
    }
    try {
        await saveKeyValue(DATA_DICTIONARY.token, token);
        printSuccess("Token was successfully saved");
    } catch (e) {
        printError(e.msg);
    }
}

const saveCity = async (city) => {
    if (!city.length) {
        printError("City value not provided");
        return;
    }
    try {
        await saveKeyValue(DATA_DICTIONARY.city, city);
        printSuccess(`City was successfully saved to ${city}`);
    } catch (e) {
        printError(e.message);
    }

}

const setLanguage = async (lang) => {
    if (!lang.length) {
        printError("Language value not provided");
        return;
    }
    if (lang.length > 2) {
        printError("Language argument must be a string of two characters");
        return;
    }
    try {
        await saveKeyValue(DATA_DICTIONARY.lang, lang);
        printSuccess(`Language was successfully saved to ${lang}`);
    } catch (e) {
        printError(e.message);
    }
}

const getForecast = async () => {
    try {
        const data = await getWeather();
        console.log(data);
    }
    catch (e) {
        if (e.code == "ENOTFOUND") {
            printError(`API api.openweathermap.org NOT FOUND\ntry to check your connection`);
            return;
        }
        else if (e?.response?.status == 404) {
            printError(`City ${city} not exist`);
        } else if (e?.response?.status == 401) {
            printError('Wrong token');
        } else {
            printError(e.message);
        }

    }
}

const cliInit = () => {
    let args = getArgs(process.argv);
    if (args.h) {
        return printHelp();
    }
    if (args.c) {
        return saveCity(args.c);
    }
    if (args.t) {
        return saveToken(args.t);
    }
    if (args.l) {
        return setLanguage(args.l)
    }
    return getForecast();

}

cliInit();