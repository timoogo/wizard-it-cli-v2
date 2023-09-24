// language.ts
import inquirer from "inquirer";
import { Language, getTranslation } from "../utils/language.utils.js";

export const askLanguage = async (): Promise<Language> => {
    const question = getTranslation('SELECT_LANGUAGE', 'QUESTIONS');
    const { language } = await inquirer.prompt({
        type: 'list',
        name: 'language',
        message: question,
        choices: Object.values(Language)
    });
    return language as Language;
};
