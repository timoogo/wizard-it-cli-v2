import { Questions } from "./Question.type.js";

export const QUESTIONS: Questions = {
  DATABASE_NAME: "Quel est le nom de la base de données?",
  SELECT_DRIVER: "Quel driver souhaitez-vous utiliser (MySql, Postgres, MariaDB)?",
  HOST_NAME: "Quel est le nom de l'hôte?",
  USER_NAME: "Quel est le nom d'utilisateur?",
  PORT: "Quel est le port?",
  PASSWORD: "Veuillez entrer votre mot de passe:",
  GENERATE_TABLE: "Voulez-vous générer votre première table?",
  TABLE_NAME: "Quel est le nom de la table?",
  COLUMN_NAME: "Quel est le nom de la colonne?",
  COLUMN_TYPE: "Quel est le type de la colonne?",
  SELECT_LANGUAGE: "Quelle langue souhaitez-vous utiliser?",

  // ... autres questions
};
export const ERROR_MESSAGES = {
  INVALID_DRIVER: "Le driver spécifié n'est pas pris en charge.",
  INVALID_LANGUAGE: "La langue spécifiée n'est pas prise en charge.",
  INVALID_PORT: "Le port spécifié n'est pas valide.",
  INVALID_COLUMN_TYPE: "Le type de colonne spécifié n'est pas valide.",
  INVALID_DATABASE_NAME: "Le nom de la base de données spécifié n'est pas valide.",
  INVALID_TABLE_NAME: "Le nom de la table spécifié n'est pas valide.",
  INVALID_COLUMN_NAME: "Le nom de la colonne spécifié n'est pas valide.",
  CONNECTION_FAILED: "La connexion à la base de données a échoué.",
  QUERY_EXECUTION_FAILED: "L'exécution de la requête a échoué.",
  DATABASE_ALREADY_EXISTS: "La base de données spécifiée existe déjà.",
  TABLE_ALREADY_EXISTS: "La table spécifiée existe déjà.",
  COLUMN_ALREADY_EXISTS: "La colonne spécifiée existe déjà dans la table.",
  MISSING_REQUIRED_FIELDS: "Des champs obligatoires sont manquants.",
  UNSUPPORTED_OPERATION: "L'opération demandée n'est pas prise en charge.",
  PERMISSION_DENIED: "Permission refusée pour cette opération.",
  TIMEOUT_ERROR: "La requête a expiré.",
  UNKNOWN_ERROR: "Une erreur inconnue est survenue.",
  // ... ajoutez d'autres messages d'erreur selon vos besoins
};
