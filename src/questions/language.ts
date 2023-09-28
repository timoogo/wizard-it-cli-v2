import inquirer from "inquirer";
import { Language, getTranslation } from "../utils/language.utils.js";
import fs from 'fs';
import path from 'path';
import url from 'url';
// @ts-ignore
import { wizardbook } from '../../.wizardbook.js';

import { config } from "yargs";

const currentDir = path.dirname(url.fileURLToPath(import.meta.url));

export const askLanguage = async (): Promise<Language> => {
    const question = getTranslation('SELECT_LANGUAGE', 'QUESTIONS');
    const packageJsonPath = path.join(currentDir, '../package.json');
     
    
    
    
    const { language } = await inquirer.prompt({
        type: 'list',
        name: 'language',
        message: question,
        choices: Object.values(Language)
    });

    return language as Language;
};
