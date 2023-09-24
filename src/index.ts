#!/usr/bin/env ts-node

import { Command } from "commander";
import {
  askDriver,
  askHost,
  askUser,
  askPassword,
  askPort,
  askDatabase
} from "./questions/connection.js";
import { isConnectionValid } from "./utils/database.utils.js";
import { askLanguage } from "./questions/language.js";
import { getQuestions, setCurrentLang } from "./utils/language.utils.js";
import { createPool } from "./db/drivers/mysql.js";

const program = new Command();

program.version("0.0.1");

program
  .command("gen:db")
  .description("Create a new database")
  .action(async () => {
    const language = await askLanguage();
    setCurrentLang(language);

    const driver = await askDriver();
    const host = await askHost();
    const user = await askUser();
    const password = await askPassword();
    const port = await askPort();
    const database = await askDatabase({
      driver,
      host,
      user,
      password,
      port
    });


    
    const QUESTIONS = getQuestions();

    const connectionParams = {
      driver,
      host,
      user,
      password,
      port,
      database: database,      // Vous pouvez également demander le nom de la base de données à l'utilisateur si nécessaire
      connectionLimit: 10,   // Vous pouvez mettre en dur ou demander à l'utilisateur
      keepAlive: true        // De même ici
    };



    const isValid = await isConnectionValid(connectionParams, false);
    if (isValid) {
      console.log(QUESTIONS.CONNECTION_SUCCESS);

      // ...
    } else {
      console.error(QUESTIONS.CONNECTION_FAILED);
      // ...
    }
  });

program.parse(process.argv);
