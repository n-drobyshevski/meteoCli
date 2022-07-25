#!/usr/bin/env node
// ab1c76e9b0b9a762d74b32366a201ba9

import { getArgs } from "./helpers/args.js";
import { printHelp } from "./services/log.service.js";
import { saveKeyValue } from "./services/storage.service.js";

const saveToken = async (token) => {
    if (token) {
        await saveKeyValue('token', token)
    }
}
const cliInit = () => {
    let args = getArgs(process.argv);
    if (args.h) {
        return printHelp();
    }
    if (args.c) {
        const city = args.c;
        console.log(city);
        return saveCity();
    }
    if (args.t) {
        return saveToken(args.t);
    }

}

cliInit()