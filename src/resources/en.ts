import { Questions } from "./Question.type.js";

export const QUESTIONS: Questions = {
    DATABASE_NAME: "What is the name of the database?",
    SELECT_DRIVER: "Which driver would you like to use (MySql, Postgres, MariaDB)?",
    HOST_NAME: "What is the host name?",
    USER_NAME: "What is the user name?",
    PORT: "What is the port?",
    PASSWORD: "Please enter your password:",
    GENERATE_TABLE: "Do you want to generate your first table?",
    TABLE_NAME: "What is the name of the table?",
    COLUMN_NAME: "What is the name of the column?",
    COLUMN_TYPE: "What is the type of the column?",
    SELECT_LANGUAGE: "Which language would you like to use?",
    // ------------------------------------
    ENTITY_NAME: "What is the name of the entity?",
    COLUMN_LENGTH: "What is the length of the column?",
    IS_PRIMARY: "Is this a primary key?",
    IS_GENERATED: "Is this a generated column?",
    IS_UNIQUE: "Is this a unique column?",
    IS_NULLABLE: "Is this a nullable column?",
    SAVE_TO_JSON: "Do you want to save the entity to a JSON file?",
    DEFAULT_VALUE: "What is the default value?",
    MORE_COLUMNS: "Do you want to add another column?",
    SAVE_JSON: "Do you want to save the entity to a JSON file?",  

    
    // ... autres questions
  };

  export const ERROR_MESSAGES = {
    INVALID_DRIVER: "The specified driver is not supported.",
    INVALID_LANGUAGE: "The specified language is not supported.",
    INVALID_PORT: "The specified port is invalid.",
    INVALID_COLUMN_TYPE: "The specified column type is invalid.",
    INVALID_DATABASE_NAME: "The specified database name is invalid.",
    INVALID_TABLE_NAME: "The specified table name is invalid.",
    INVALID_COLUMN_NAME: "The specified column name is invalid.",
    CONNECTION_FAILED: "Failed to connect to the database.",
    QUERY_EXECUTION_FAILED: "Query execution failed.",
    DATABASE_ALREADY_EXISTS: "The specified database already exists.",
    TABLE_ALREADY_EXISTS: "The specified table already exists.",
    COLUMN_ALREADY_EXISTS: "The specified column already exists in the table.",
    MISSING_REQUIRED_FIELDS: "Required fields are missing.",
    UNSUPPORTED_OPERATION: "The requested operation is not supported.",
    PERMISSION_DENIED: "Permission denied for this operation.",
    TIMEOUT_ERROR: "The query timed out.",
    UNKNOWN_ERROR: "An unknown error occurred.",
    // ... add other error messages as needed
  };
  
  