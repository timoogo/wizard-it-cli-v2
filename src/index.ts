import fs from "fs";
import path from "path";
import { Command } from "commander";
import { displayAllAnswers } from "./utils/questions.utils.js";
import {
  askForEntityName,
  askForTableName,
  askColumnDetails,
  askIfMoreColumns,
  askSaveToJson,
  writeEntityToJsonFile,
} from "./questions/entity.js";
import { askLanguage } from "./questions/language.js";
import { setCurrentLang } from "./utils/language.utils.js";

const program = new Command();
program.version("0.0.1");

program
  .command("wizard:new")
  .description("Créez une nouvelle entité")
  .option("-v","--view-answers", "Voir l'ensemble des réponses depuis le début")
  .action(async (cmd) => {
    if (cmd.viewAnswers) {
      displayAllAnswers();
    }
    const langChosen = await askLanguage();

    setCurrentLang(langChosen);
    const entityName = await askForEntityName();
    const tableName = await askForTableName(entityName);
    const columns = [];

    let shouldAddMoreColumns = true;
    while (shouldAddMoreColumns) {
        columns.push(await askColumnDetails());
        shouldAddMoreColumns = await askIfMoreColumns() === 'yes';
    }

    const shouldSaveToJson = await askSaveToJson();
    const entity = {
      name: entityName,
      tableName: tableName,
      columns,
      version: 1,
    };

    if (shouldSaveToJson) {
      const folderPath = "wizard-gen";
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }

      const jsonFilePath = path.join(folderPath, "entityConfig.json");
      writeEntityToJsonFile(jsonFilePath, entity);
      console.log(`L'entité a été enregistrée dans le fichier ${jsonFilePath}`);
    }
  });

program.parse(process.argv);
