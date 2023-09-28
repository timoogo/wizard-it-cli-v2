import inquirer from "inquirer";
import { Language, getTranslation } from "../utils/language.utils.js";
import fs from 'fs';
import path from 'path';
import url from 'url';

// @ts-ignore
import * as wizardbook from '../.wizardbook.json' assert { type: "json" };

import { config } from "yargs";

const currentDir = path.dirname(url.fileURLToPath(import.meta.url));

export const askLanguage = async (): Promise<Language> => {
    const question = getTranslation('SELECT_LANGUAGE', 'QUESTIONS');

    const { language } = await inquirer.prompt({
        type: 'list',
        name: 'language',
        message: question,
        choices: Object.values(Language)
    });
    
    // Créer une copie de l'objet wizardbook
    const updatedWizardBook = { ...wizardbook, preferredLanguage: language };

    // Mettez à jour le fichier .wizardbook.json avec la langue préférée mise à jour
    const wizardbookPath = path.join(currentDir, '../.wizardbook.json');
    fs.writeFileSync(wizardbookPath, JSON.stringify(updatedWizardBook, null, 2));

    return language as Language;
};
