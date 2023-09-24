import inquirer from 'inquirer';
import { askQuestion } from '../utils/questions.utils.js';
import { showAllDatabases } from '../utils/database.utils.js';

enum Driver {
    MySql = 'MySql',
    Postgres = 'Postgres',
    MariaDB = 'MariaDB'
}

export const askDriver = async (): Promise<string> => {

    

    return askQuestion('SELECT_DRIVER', {
        type: 'list',
        name: 'driver',
        choices: ['MySql', 'Postgres', 'MariaDB']
    });
};

export const askHost = async (): Promise<string> => {
    return askQuestion('HOST_NAME', {
        type: 'input',
        name: 'host',
        default: 'localhost'
    });
};


export const askUser = async (): Promise<string> => {
    return askQuestion('USER_NAME', {
        type: 'input',
        name: 'user',
        default: 'root'
    });
};

export const askPassword = async (): Promise<string> => {
    
    return askQuestion('PASSWORD', {
        type: 'password',
        name: 'password'
    });
};
export const askPort = async (): Promise<number> => {
    return askQuestion('PORT', {
        type: 'number',
        name: 'port',
        default: 3306
    });
}
export const askDatabase = async (connectionParams: any): Promise<string> => {
    const databases = await showAllDatabases(connectionParams);
    return askQuestion('SELECT_DATABASE', {
      type: 'list',
      name: 'database',
      choices: databases,
      message: 'Choisissez une base de données'
    });
  };
