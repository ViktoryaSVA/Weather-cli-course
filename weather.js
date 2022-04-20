#!/usr/bin/env node
import { getArgs } from './helpers/args.js ';
import {printError, printHelp, printSuccess, prinWeather} from "./services/log.service.js";
import {getKeyValue, saveKeyValue, TOKEN_DICT} from "./services/storage.service.js";
import {getIcon, getWeather} from "./services/api.service.js";

const saveToken = async (token) => {
    if (!token.length){
        printError('Token не передано')
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICT.token, token)
        printSuccess('Saved token');
    } catch (e){
        printError(e.message);
    }
}

const saveCity = async (city) => {
    if (!city.length){
        printError('City не передано')
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICT.city, city)
        printSuccess('Saved city');
    } catch (e){
        printError(e.message);
    }
}

const getForcast = async () => {
    try {
        const city = process.env.CITY ?? await getKeyValue(TOKEN_DICT.city);
        const weather = await getWeather(city);
        prinWeather(weather, getIcon(weather.weather[0].icon));
    } catch (e) {
        if (e?.response?.status == 404) {
            printError('Неправильне місто');
        } else if (e?.response?.status == 401) {
            printError('Неправильний токен');
        } else {
            printError(e.message);
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv);

    if (args.h) {
        return printHelp()
    }
    else if (args.s) {
        return saveCity(args.s);
    }
    else if (args.t) {
        return saveToken(args.t)
    }
    return getForcast();
};

initCLI();
