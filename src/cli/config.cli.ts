import fs from 'fs';
import path from 'path';
import url from 'url';
import { askQuestion } from "../utils/questions.utils.js";
import { modifyEntitySchema } from "./change.schema.cli.js";
import { createNewEntity } from "./generate.schema.cli.js";
import { Language, setCurrentLang, getQuestions } from "../utils/language.utils.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const WIZARDBOOK_PATH = path.join(__dirname, '..', '.wizardbook.js');

const packageJsonPath = path.join(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString());

const wizardbook = fs.existsSync(WIZARDBOOK_PATH) ? JSON.parse(fs.readFileSync(WIZARDBOOK_PATH).toString()) : {};



export async function Menu(command: any) {
    command = await askForCommand();

    switch (command) {
        case "wizard":
            Menu(command);
            break;
        case "wizard:new":
            createNewEntity(command);
            break;
        case "wizard:change":
            modifyEntitySchema(command);
            break;
        case "wizard:language":
            setCurrentLang(wizardbook.preferredLanguage || {});
            break;
        // Vous pouvez ajouter d'autres cas ici pour d'autres commandes
        default:
            break;
    }
}

function askForCommand() {

    const scripts = packageJson.scripts || {};
    const wizardCommands = Object.keys(scripts).filter(scriptName => scriptName.startsWith("wizard"));

    console.log(wizardCommands);

    return askQuestion("SELECT_COMMAND", {
        type: 'list',
        name: 'command',
        choices: wizardCommands,
        askAnswered: true
    });
}
