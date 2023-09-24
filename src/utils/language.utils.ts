// Import resources directly
import * as en from '../resources/en.js';
import * as fr from '../resources/fr.js';
import { Questions, ErrorMessages, ResourceTypes } from './types.utils.js';

export enum Language {
    EN = 'en',
    FR = 'fr'
}
// system lang 
function getSystemLanguage(): Readonly<{ fullLanguage: string, langCode: string }> {
    const fullLanguage = process.env.LANG || 'en_US';
    const langCode = fullLanguage.split('.')[0].split('_')[0];
    
    return Object.freeze({ fullLanguage, langCode });
}



// Use readonly to ensure that the object isn't modified accidentally
const LANGUAGE_RESOURCES: { readonly [key in Language]: { readonly QUESTIONS: Questions, readonly ERROR_MESSAGES: ErrorMessages } } = {
    [Language.EN]: en,
    [Language.FR]: fr
};

const languageInfo = getSystemLanguage();

// Utilisez la langue détectée par le système comme langue par défaut, sinon utilisez 'en' comme langue par défaut.
let currentLang: Language = (languageInfo.langCode === 'fr') ? Language.FR : Language.EN;

export function getCurrentLang(): Language {
    return currentLang;
}

export function setCurrentLang(lang: Language): void {
    currentLang = lang;
}

export function switchLanguage(): void {
    currentLang = (currentLang === Language.FR) ? Language.EN : Language.FR;
}

export function getTranslation<T extends ResourceTypes>(key: string, type: T): string {
    const translations = LANGUAGE_RESOURCES[currentLang][type];
    return translations[key] || `Translation not found for key: ${key}`;
}

export function getQuestionTranslation(key: string): string {
    return getTranslation(key, 'QUESTIONS');
}

export function getErrorMessageTranslation(key: string): string {
    return getTranslation(key, 'ERROR_MESSAGES');
}

export function getQuestions(): Questions {
    return LANGUAGE_RESOURCES[currentLang].QUESTIONS;
}
