var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { promises } from "fs";
import { join } from "path";
import { homedir } from "os";
const FILE_PATH = join(homedir(), 'weather_data.json');
const DATA_DICTIONARY = {
    'token': 'token',
    'city': 'city',
    'lang': 'lang',
};
const isExist = (file_path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield promises.stat(file_path);
        return true;
    }
    catch (_a) {
        return false;
    }
});
const saveKeyValue = (key, value) => __awaiter(void 0, void 0, void 0, function* () {
    let data = {};
    if (yield isExist(FILE_PATH)) {
        const file = yield promises.readFile(FILE_PATH);
        data = JSON.parse(file);
    }
    data[key] = value;
    yield promises.writeFile(FILE_PATH, JSON.stringify(data));
});
const getKeyValue = () => __awaiter(void 0, void 0, void 0, function* () {
    let res = {};
    const file = yield promises.readFile(FILE_PATH);
    res = JSON.parse(file);
    return res;
});
export { saveKeyValue, getKeyValue, DATA_DICTIONARY };
