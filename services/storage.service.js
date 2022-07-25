import { promises } from "fs"
import { join } from "path"
import { homedir } from "os"

const FILE_PATH = join(homedir(), 'weather_data.json')

const isExist = async (file_path) => {
    try{
        await promises.stat(file_path)
        return true 
    } catch{
        return false
    }
}

const saveKeyValue = async (key, value) => {
    console.log(key)
    console.log(value)
    let data = {};
    if (await isExist(FILE_PATH)){  
        const file = await promises.readFile(FILE_PATH)
        data = JSON.parse(file)
    }
    data[key] = value;
    
    await promises.writeFile(FILE_PATH, JSON.stringify(data))

}

const getKeyValue = async () => {
    let res = {};
    const file = await promises.readFile(FILE_PATH)
    res = JSON.parse(file)
    return res
}
export { saveKeyValue, getKeyValue }