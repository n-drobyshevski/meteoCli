#!/usr/bin/env node
// ab1c76e9b0b9a762d74b32366a201ba9

import { getArgs } from "./helpers/args.js";
import { getWeather, IApi } from "./services/api.service.js";
import { printError, printHelp, printSuccess, printWeather } from "./services/log.service.js";
import { DATA_DICTIONARY, saveKeyValue } from "./services/storage.service.js";
import axios,{AxiosError} from "axios";

const saveToken = async (token: string):Promise<void> => {
    if (!token.length) {
        printError("Token value not provided");
        return;
    }
    try {
        await saveKeyValue(DATA_DICTIONARY.token, token);
        printSuccess("Token was successfully saved");
    } catch (e: unknown) {
        if (e instanceof Error) {
            printError(e.message + " -- from saveToken");
        }
        else {
            printError(e + " occurred")
        }

    }
}

const saveCity = async (city: string):Promise<void> => {
    if (!city.length) {
        printError("City value not provided");
        return;
    }
    try {
        await saveKeyValue(DATA_DICTIONARY.city, city);
        printSuccess(`City was successfully saved to ${city}`);
    } catch (e: unknown) {
        if (e instanceof Error) {
            printError(e.message + " -- from saveCity");
        } else {
            printError(e + " occurred")
        }
    }

}

const setLanguage = async (lang: string):Promise<void> => {
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
    } catch (e: unknown) {
        if (e instanceof Error) {
            printError(e.message + " -- from setLanguage");
        } else {
            printError(e + " occurred");
        }
    }
}

const getForecast = async ():Promise<void> => {
    try {
        const data: any = await getWeather();
        printWeather(data);
    }
    catch (e: unknown) {
        if (axios.isAxiosError(e)) {
            if (e.code == "ENOTFOUND") {
                printError(`API api.openweathermap.org NOT FOUND\ntry to check your connection`);
                return;
            }
            else if (e?.response?.status == 404) {
                printError(`Provided city not exist`);
            } else if (e?.response?.status == 401) {
                printError('Wrong token');
            }
        }
        else {
        }
        console.log(e)
        printError(e + " -- from getForecast");

    }
}

const cliInit = () => {
    let args: any = getArgs(process.argv);
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