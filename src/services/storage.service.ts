import { promises } from "fs"
import { join } from "path"
import { homedir } from "os"

const FILE_PATH = join(homedir(), 'weather_data.json')


interface IDataDictionary {
    [key: string]: string
}

const DATA_DICTIONARY: IDataDictionary = {
    'token' : 'token',
    'city': 'city',
    'lang': 'lang',
}

const isExist = async (file_path: string):Promise<boolean> => {
    try{
        await promises.stat(file_path);
        return true ;
    } catch{
        return false;
    }
}

const saveKeyValue = async (key: string, value: string):Promise<void> => {
    let data: IDataDictionary = {};
    if (await isExist(FILE_PATH)){  
        const file: any = await promises.readFile(FILE_PATH);
        data = JSON.parse(file);
    }
    data[key] = value;
    
    await promises.writeFile(FILE_PATH, JSON.stringify(data));

}

const getKeyValue = async () => {
    let res = {};
    const file : any= await promises.readFile(FILE_PATH);
    res = JSON.parse(file);
    return res;
}
export { saveKeyValue, getKeyValue, DATA_DICTIONARY }