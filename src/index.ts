import fs from "fs";
import path from "path";
import { Command } from "commander";
import { askQuestion, displayAllAnswers } from "./utils/questions.utils.js";
import {
  askForEntityName,
  askForTableName,
  askColumnName,
  askColumnType,
  askColumnLength,
  askIsPrimary,
  askIsGenerated,
  askDefaultValue,
  askIsUnique,
  askIsNullable,
  askSaveToJson,
  writeEntityToJsonFile,
} from "./questions/entity.js";

const program = new Command();
program.version("0.0.1");

program
  .command("wizard:new")
  .description("Créez une nouvelle entité")
  .option("-v","--view-answers", "Voir l'ensemble des réponses depuis le début")
  .action(async (cmd) => {
    if (cmd.viewAnswers){
      displayAllAnswers();
    }
    const entityName = await askForEntityName();

    // Utilisation de la bibliothèque pluralize pour générer le nom de table pluriel

    const tableName = await askForTableName(entityName);

    const columns = [];
    let moreColumns = true;

    let saveToJsonAsked = false; // Ajout d'une variable pour suivre si la question "saveToJson" a déjà été posée

    while (moreColumns) {
      const columnName = await askColumnName();
      const columnType = await askColumnType();
      const columnLength =
        columnType === "varchar" ? await askColumnLength() : undefined;
      const isPrimary = await askIsPrimary();
      const isGenerated = isPrimary ? await askIsGenerated() : false;
      const defaultValue = await askDefaultValue();
      const isUnique = await askIsUnique();
      const isNullable = await askIsNullable();

      columns.push({
        name: columnName,
        type: columnType,
        length: columnLength,
        isPrimary,
        isGenerated,
        default: defaultValue,
        isUnique,
        nullable: isNullable,
      });

      // Vérifier si la question "saveToJson" n'a pas encore été posée
      if (!saveToJsonAsked) {
        const response = await askSaveToJson();
        moreColumns = response === "yes";

        // Mettre à jour la variable saveToJsonAsked pour indiquer que la question a été posée
        saveToJsonAsked = true;
      } else {
        moreColumns = false; // Sortir de la boucle si la question a déjà été posée
      }
    }

    const entity = {
      name: entityName,
      tableName: tableName, // Remplacez les espaces par des underscores
      columns,
      version: 1,
    };

    // La question "saveToJson" est posée une seule fois après la boucle
    if (saveToJsonAsked) {
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
