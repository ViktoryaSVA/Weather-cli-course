import chalk from 'chalk';
import dedent from "dedent-js";

const printError = (error) => {
    console.log(chalk.bgRed('ERROR') + ' ' + error);
};

const printSuccess = (error) => {
    console.log(chalk.bgGreen('SUCCESS') + ' ' + error);
};

const printHelp = () => {
    console.log(
        dedent`${chalk.bgCyan('HELP')}
        Без параметрів - вивід погоди
        -s [CITY] для встановлення міста
        -h для виводу допомоги
        -t [API_KEY] для збереження токену
        `
    );
};

const prinWeather = (res, icon) => {
    console.log(
        dedent`${chalk.bgBlue('WEATHER')} Погода в місті ${res.name}
        ${icon} ${res.weather[0].description}
        Температура: ${res.main.temp} (відчувається як  ${res.main.feels_like})
        Вологість: ${res.main.humidity}%
        Швидкість повітря:  ${res.wind.speed}
        `
    );
};

export { printError, printSuccess, printHelp, prinWeather };
