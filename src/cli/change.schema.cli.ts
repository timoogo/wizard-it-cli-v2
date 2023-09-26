
import fs from "fs";
import path from "path";
import { askColumnToModify, askColumnDetails, askSaveToJson } from "../questions/entity.js";
import { ColumnDetails } from "../resources/default_properties.constant.js";
import { program } from "commander";

export async function modifyEntitySchema(cmd?: any) {
    // 1. Read the entityConfig.json
    const configPath = path.join("wizard-gen", "entityConfig.json");
    const configContent = fs.readFileSync(configPath, "utf-8");
    const entityConfig = JSON.parse(configContent);

    // 2. List columns and ask which one to modify
    const columns = entityConfig.columns;
    
    const selectedColumn = cmd?.column || await askColumnToModify(columns);

    // 3. Create a backup copy
    const backupFilename = `${entityConfig.name}-${Date.now()}.json`;
    const backupPath = path.join("wizard-gen", backupFilename);
    fs.writeFileSync(backupPath, configContent);

    // 4. Ask questions about the column and modify the entityConfig.json
    const newColumnDetails = await askColumnDetails();
    const columnIndex = columns.findIndex((col: ColumnDetails) => col.name === selectedColumn);
    columns[columnIndex] = newColumnDetails;

    // Increment the version
    entityConfig.version += 1;

    // 5. Ask if the user wants to save the changes
    const shouldSaveToJson = await askSaveToJson();
    if (shouldSaveToJson) {

    // Save the updated entityConfig
    fs.writeFileSync(configPath, JSON.stringify(entityConfig, null, 2));
    console.log("Modifications saved successfully.");
    } else {
        console.log("Modifications not saved.");
    }
}

