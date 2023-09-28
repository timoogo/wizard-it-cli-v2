import { askQuestion } from "../utils/questions.utils.js";
import { modifyEntitySchema } from "./change.schema.cli.js";
import { createNewEntity } from "./generate.schema.cli.js";
import { askLanguage } from "../questions/language.js";
import { setCurrentLang } from "../utils/language.utils.js";
import path from 'path';
import url from 'url';
import fs from 'fs';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


function askForCommand() {
    const packageJsonPath = path.join(__dirname, '../package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString());
    
    // Ensure the scripts section exists and is an object
    const scripts = packageJson.scripts || {};
    
    // Filter the script names that start with "wizard"
    const wizardCommands = Object.keys(scripts).filter(scriptName => scriptName.startsWith("wizard"));
    
    console.log(wizardCommands);
    
    // Transform the commands to a list of choices
    return askQuestion("SELECT_COMMAND", {
        type: 'list',
        name: 'command',
        choices: wizardCommands,
        askAnswered: true
    });
    }

export async function Menu(command: any) {
    // ask the user what he wants to do
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
        
        case "wizard:language":
            askLanguage();
            break; 
        default:
            break;
    }
}