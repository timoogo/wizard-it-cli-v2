import inquirer from 'inquirer';

export const askDatabaseName = async (): Promise<string> => {
    const { dbName } = await inquirer.prompt({
        type: 'input',
        name: 'dbName',
        message: 'Nom de la base de données:',
    });
    return dbName;
};

// ... autres fonctions pour demander des infos sur les tables ...
