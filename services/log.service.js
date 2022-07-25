import dedent from "dedent"
import chalk from "chalk"

const printHelp = () => {
    console.log(dedent(`
    ${chalk.bgCyan("Meteo-Cli")}
    -h to see this message
    -c [CITY] to set city 
    -t [API_TOKEN] to set token 
    `))
}

const printSuccess = (msg) => {
    console.log(`${chalk.bgGreen("SUCCESS")}
    ${msg}
    `)
} 
const printError = (msg) => {
    console.log(`${chalk.bgRed("ERROR")}
    ${msg}
    `)
}
export { printHelp, printError, printSuccess }