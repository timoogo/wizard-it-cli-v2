import inquirer, { Question } from 'inquirer';
import { getTranslation } from './language.utils.js';
import { ResourceTypes } from './types.utils.js';


export const askQuestion = async <T extends Question>(questionKey: string, config: T, translationType: ResourceTypes = "QUESTIONS"): Promise<any> => {
    const questionText = getTranslation(questionKey, translationType);
    const question = {
        ...config,
        message: questionText
    };
    const answer = await inquirer.prompt([question]);
    allAnswers.push(answer[config.name!]); // Ajout de la réponse à allAnswers
    return answer[config.name!];
};

export const allAnswers: string[] = [];

export const displayAllAnswers = () => {
    console.log("Réponses depuis le début :");
    allAnswers.forEach((answer, index) => {
      console.log(`Étape ${index + 1}: ${answer}`);
    });
  };