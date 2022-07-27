import dedent from "dedent"
import chalk from "chalk"

const printHelp = (): void => {
    console.log(dedent(`
    ${chalk.bgCyan("Meteo-Cli")}
    -h to see this message
    -c [CITY] to set city 
    -t [API_TOKEN] to set token 
    -l to set main output language 
    `));
}

const printWeather = (data: any): void => {
    console.log(dedent(`
    ${chalk.bgGreen("WEATHER")}
    city: ${data.name}
    description: ${data.weather[0].description}
    temperature: ${chalk.bold(data.main.temp)}
    feels like: ${data.main.feels_like}
    humidity : ${data.main.humidity}
    wind speed: ${data.wind.speed}
    `
    ))
}

const printSuccess = (msg: string): void => {
    console.log(dedent(`${chalk.bgGreen("SUCCESS")}
    ${msg}
    `));
}
const printError = (msg:string): void => {
    console.log(dedent(`${chalk.bgRed("ERROR")}
    ${msg}
    `));
}
export { printHelp, printError, printSuccess, printWeather }