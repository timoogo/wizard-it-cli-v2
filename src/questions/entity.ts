import { askQuestion } from '../utils/questions.utils.js';
import pluralize from 'pluralize';
import { replaceSpacesWithUnderscores, replaceCamelCaseWithUnderscores, toCamelCase, toCapitalCase, Separator } from '../utils/language.utils.js';
import fs from 'fs';
import { ENTITIES_NAME_SAMPLES } from '../resources/entities.constants.js';
import { QUESTIONS } from '../resources/en.js';
import { ColumnDetails, DEFAULT_PROPERTIES } from '../resources/default_properties.constant.js';
enum Driver {
    MySql = 'MySql',
    Postgres = 'Postgres',
    MariaDB = 'MariaDB'
}

enum ColumnType {
    Number = 'number',
    Varchar = 'varchar',
    Timestamp = 'timestamp',
    Boolean = 'boolean',
    Bytea = 'bytea'
}

export const askForEntityName = async (): Promise<string> => {
    const randomIndex = Math.floor(Math.random() * ENTITIES_NAME_SAMPLES.length);
    const randomEntityName = toCapitalCase(ENTITIES_NAME_SAMPLES[randomIndex], Separator.UNDERSCORE);

    return askQuestion("ENTITY_NAME",
        { type: 'input', name: 'entity_name', default: randomEntityName });
};

export const askForTableName = async (entityName?: string): Promise<string> => {
    
    if (entityName) {
        return askQuestion("TABLE_NAME", {
            type: 'input',
            name: 'table_name',
            default: replaceCamelCaseWithUnderscores(replaceSpacesWithUnderscores(pluralize(entityName)))
        });
    } else {
    return askQuestion("TABLE_NAME", { type: 'input', name: 'table_name' });
    }
};

export const askColumnName = async (): Promise<string> => {
    return askQuestion("COLUMN_NAME", { type: 'input', name: 'column_name' });
};

export const askColumnType = async (): Promise<ColumnType> => {
    return askQuestion("COLUMN_TYPE", {
        type: 'list',
        name: 'type',
        choices: Object.values(ColumnType)
    });
};

export const askColumnLength = async (): Promise<number | null> => {
    const result = await askQuestion("COLUMN_LENGTH", {
        type: 'input',
        name: 'length'
    });
    return result ? parseInt(result) : null;
};

export const askIsPrimary = async (): Promise<boolean> => {
    return askQuestion("IS_PRIMARY", {
        type: 'confirm',
        name: 'isPrimary',
        default: false
    });
};

export const askIsGenerated = async (): Promise<boolean> => {
    return askQuestion("IS_GENERATED", {
        type: 'confirm',
        name: 'isGenerated',
        default: false
    });
};

export const askDefaultValue = async (): Promise<string> => {
    return askQuestion("DEFAULT_VALUE", {
        type: 'input',
        name: 'default'
    });
};

export const askIsUnique = async (): Promise<boolean> => {
    return askQuestion("IS_UNIQUE", {
        type: 'confirm',
        name: 'isUnique',
        default: false
    });
};

export const askIsNullable = async (): Promise<boolean> => {
    return askQuestion("IS_NULLABLE", {
        type: 'confirm',
        name: 'nullable',
        default: false
    });
};
export const askIfMoreColumns = async (): Promise<string> => {
    return askQuestion("MORE_COLUMNS", {
        type: 'list',
        name: 'moreColumns',
        choices: ['yes', 'no']
    });
}
export const askSaveToJson = async (): Promise<string> => {
    return askQuestion("SAVE_JSON", {
        type: 'confirm',
        name: 'saveToJson',
        default: false
    }); 
}

export function writeEntityToJsonFile(filePath: string, entity: any) {
    //log the entity  jsonified to the console);
    console.log(JSON.stringify(entity, null, 2));

    
    
    const jsonData = JSON.stringify(entity, null, 2);
    fs.writeFileSync(filePath, jsonData, "utf-8");
  }


export async function askColumnDetails(): Promise<ColumnDetails> {
    const columnName = await askColumnName();

    // Propriétés par défaut des colonnes en fonction du nom de la colonne

    // Si le nom de la colonne a des propriétés prédéfinies
    if (DEFAULT_PROPERTIES[columnName]) {
        // Affichez les propriétés prédéfinies à l'utilisateur
        console.log("Propriétés prédéfinies pour la colonne:", DEFAULT_PROPERTIES[columnName]);
        
        // Demandez à l'utilisateur s'il souhaite accepter ces propriétés
        const acceptDefaults = await askIfAcceptDefaults();
        if (acceptDefaults) {
            return DEFAULT_PROPERTIES[columnName] as ColumnDetails;
        }
    }

    // Si la colonne n'a pas de propriétés prédéfinies ou si l'utilisateur a refusé les propriétés prédéfinies
    // Posez les questions habituelles
    const columnType = await askColumnType();
    const columnLength = columnType === "varchar" ? await askColumnLength() : undefined;
    const isPrimary = await askIsPrimary();
    const isGenerated = isPrimary ? await askIsGenerated() : false;
    const defaultValue = await askDefaultValue();
    const isUnique = await askIsUnique();
    const isNullable = await askIsNullable();

    return {
      name: columnName,
      type: columnType,
      length: columnLength,
      isPrimary,
      isGenerated,
      default: defaultValue,
      isUnique,
      nullable: isNullable,
    };
}
export async function askIfAcceptDefaults(): Promise<boolean> {
    return askQuestion("ACCEPT_DEFAULT", {
        type: 'confirm',
        name: 'acceptDefaults',
        default: false
    });
}
export async function askColumnToModify(columns: ColumnDetails[]): Promise<string> {
    return askQuestion("COLUMN_TO_MODIFY", {
        type: 'list',
        name: 'columnToModify',
        choices: columns.map(col => col.name)
    });
}