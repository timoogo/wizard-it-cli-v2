  import { Command } from "commander";
  import { createNewEntity } from "./cli/generate.schema.cli.js";
  import { modifyEntitySchema } from "./cli/change.schema.cli.js";
  import { Menu } from "./cli/menu.cli.js";
import { askLanguage } from "./questions/language.js";

  const program = new Command();
  program.version("0.0.1");

  program
    .command("wizard")
    .description("Lancez l'assistant de création d'entité")
    .action(() => Menu((cmd: any) => cmd));

  program
    .command("wizard:new")
    .description("Créez une nouvelle entité")
    .option(
      "-v",
      "--view-answers",
      "Voir l'ensemble des réponses depuis le début"
    )
    .action(createNewEntity);

  // Placeholder for the new command
  program
    .command("wizard:change")
    .option("--column-name <name>", "Nom de la colonne à modifier")
    .description("Modifier une entité existante")
    .action((cmd) => modifyEntitySchema(cmd));


  program
    .command("wizard:config")
    .description("Configurer l'assistant")
    .action(() => Menu((cmd: any) => cmd));
  program.parse(process.argv);
