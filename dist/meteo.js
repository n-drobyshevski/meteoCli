#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getArgs } from "./helpers/args.js";
import { getWeather } from "./services/api.service.js";
import { printError, printHelp, printSuccess, printWeather } from "./services/log.service.js";
import { DATA_DICTIONARY, saveKeyValue } from "./services/storage.service.js";
import axios from "axios";
const saveToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token.length) {
        printError("Token value not provided");
        return;
    }
    try {
        yield saveKeyValue(DATA_DICTIONARY.token, token);
        printSuccess("Token was successfully saved");
    }
    catch (e) {
        if (e instanceof Error) {
            printError(e.message + " -- from saveToken");
        }
        else {
            printError(e + " occurred");
        }
    }
});
const saveCity = (city) => __awaiter(void 0, void 0, void 0, function* () {
    if (!city.length) {
        printError("City value not provided");
        return;
    }
    try {
        yield saveKeyValue(DATA_DICTIONARY.city, city);
        printSuccess(`City was successfully saved to ${city}`);
    }
    catch (e) {
        if (e instanceof Error) {
            printError(e.message + " -- from saveCity");
        }
        else {
            printError(e + " occurred");
        }
    }
});
const setLanguage = (lang) => __awaiter(void 0, void 0, void 0, function* () {
    if (!lang.length) {
        printError("Language value not provided");
        return;
    }
    if (lang.length > 2) {
        printError("Language argument must be a string of two characters");
        return;
    }
    try {
        yield saveKeyValue(DATA_DICTIONARY.lang, lang);
        printSuccess(`Language was successfully saved to ${lang}`);
    }
    catch (e) {
        if (e instanceof Error) {
            printError(e.message + " -- from setLanguage");
        }
        else {
            printError(e + " occurred");
        }
    }
});
const getForecast = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const data = yield getWeather();
        printWeather(data);
    }
    catch (e) {
        if (axios.isAxiosError(e)) {
            if (e.code == "ENOTFOUND") {
                printError(`API api.openweathermap.org NOT FOUND\ntry to check your connection`);
                return;
            }
            else if (((_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.status) == 404) {
                printError(`Provided city not exist`);
            }
            else if (((_b = e === null || e === void 0 ? void 0 : e.response) === null || _b === void 0 ? void 0 : _b.status) == 401) {
                printError('Wrong token');
            }
        }
        else {
        }
        console.log(e);
        printError(e + " -- from getForecast");
    }
});
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
        return setLanguage(args.l);
    }
    return getForecast();
};
cliInit();
