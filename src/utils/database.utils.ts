// src/db/utils.ts

// Importation des drivers spécifiques
import * as mysql from "../db/drivers/mysql.js";
import { createConnection, RowDataPacket } from "mysql2/promise";


// Interface pour les paramètres de connexion
export interface DBConnectionParams {
  driver: string;
  host: string;
  user: string;
  password: string;
  port: number;
  database?: string;
  connectionLimit?: number;
  keepAlive?: boolean;


}

// Fonction pour vérifier la validité de la connexion
export const isConnectionValid = async (params: DBConnectionParams, withPool?: boolean): Promise<boolean> => {
  switch (params.driver) {
    case "MySql":
      return mysql.isConnectionValid(params);
    // ... autres drivers ...
    default:
      return false;
  }
};


export const showAllDatabases = async (connectionParams: any): Promise<string[]> => {
  const connection = await createConnection(connectionParams);
  const [rows] = await connection.query('SHOW DATABASES');
  await connection.end();
  return (rows as RowDataPacket[]).map(row => row.Database);
}