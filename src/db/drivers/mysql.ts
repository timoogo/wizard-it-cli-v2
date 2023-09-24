import mysql, { Pool } from 'mysql2/promise';
import { DBConnectionParams } from '../../utils/database.utils.js';

let pool: Pool | null = null;

export function createPool(params: DBConnectionParams): Pool {
    if (!pool) {
      pool = mysql.createPool(params);
    }
    return pool;
  }

  export function getPool(): Pool {
    if (!pool) {
      throw new Error("Connection pool hasn't been created yet.");
    }
    return pool;
  }

export async function isConnectionValid(params: DBConnectionParams, withPool?: boolean): Promise<boolean> {

    if (withPool) {
      const testPool = createPool(params);
      try {
        await testPool.getConnection();
        return true;
      } catch (error) {
        return false;
      }
    } else {
      const connection = await mysql.createConnection(params);
      try {
        await connection.connect();
        return true;
      } catch (error) {
        return false;
      } finally {
        await connection.end();
      }
    }
  }



