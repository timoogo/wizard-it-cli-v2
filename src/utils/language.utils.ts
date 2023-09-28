// Import resources directly
import * as en from "../resources/en.resource.js";
import * as fr from "../resources/fr.resource.js";
import { Questions, ErrorMessages, ResourceTypes } from "./types.utils.js";

export enum Language {
  EN = "English (US)",
  FR = "Français (FR)",
}

// Define a type for the system language info
interface SystemLanguageInfo {
  fullLanguage: string;
  langCode: string;
}
export enum Separator {
  UNDERSCORE = "_",
  DASH = "-",
}
// Define a function to get system language information
const getSystemLanguage = (): SystemLanguageInfo => {
  const fullLanguage = process.env.LANG || "en_US";
  const langCode = fullLanguage.split(".")[0].split("_")[0];

  return Object.freeze({ fullLanguage, langCode });
};

// Use readonly to ensure that the object isn't modified accidentally
const LANGUAGE_RESOURCES: Record<
  Language,
  Record<ResourceTypes, Record<string, string>>
> = {
  [Language.EN]: en,
  [Language.FR]: fr,
};

const languageInfo = getSystemLanguage();

// Utilize the language detected by the system as the default language, otherwise use 'en' as the default language.
let currentLang: Language =
  languageInfo.langCode === "fr" ? Language.FR : Language.EN;

export const getCurrentLang = (): Language => {
  return currentLang;
};

export const setCurrentLang = (targetedLang: Language): void => {
  currentLang = targetedLang;
};
export const setLangToSystem = (): void => {
  currentLang = languageInfo.langCode === "fr" ? Language.FR : Language.EN;
};



// Define a generic getTranslation function to fetch translations based on the resource type
export const getTranslation = <T extends ResourceTypes>(
  key: string,
  type: T
): string => {
  return LANGUAGE_RESOURCES[currentLang][type][key];
};

export function getQuestionTranslation(key: string): string {
  return getTranslation(key, "QUESTIONS");
}

export function getErrorMessageTranslation(key: string): string {
  return getTranslation(key, "ERROR_MESSAGES");
}

export function getQuestions(): Questions {
  return LANGUAGE_RESOURCES[currentLang].QUESTIONS;
}

export function replaceSpacesWithUnderscores(input: string): string {
  return input.replace(/ /g, "_");
}

export function replaceCamelCaseWithUnderscores(input: string): string {
  return input.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
}
// transform abra_cadabra to AbraCadabra
export function toCamelCase(input: string): string {
  return input.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
}
export function toCapitalCase(input: string, separator?: Separator): string {
  if (separator) {
    // camel_case
    // return CamelCase
    return input
      .split(separator)
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join("");
  } else {
    // camelCase
    return input[0].toUpperCase() + input.slice(1);
  }
}
