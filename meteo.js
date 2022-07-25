#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { printHelp } from "./services/log.service.js";

const cliInit = () => {
    let args = getArgs(process.argv);
    console.log(args);
    if (args.h) {
        return printHelp();
    }
    if (args.c) {
        return saveCity();
    }
    if (args.t) {
        return saveToken();
    }

}

cliInit()