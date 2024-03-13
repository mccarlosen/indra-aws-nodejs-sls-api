const mysql = require('serverless-mysql')
import { ServerlessMysql } from "serverless-mysql"
require('dotenv').config();

export class DBService {
  private db: ServerlessMysql

  constructor () {
    this.db = mysql({
      config: {
        host     : process.env.DB_HOST,
        database : process.env.DB_DATABASE,
        user     : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        port: process.env.DB_PORT
      }
    })
  }

  getConfig () {
    return {
      host     : process.env.DB_HOST,
      database : process.env.DB_DATABASE,
      user     : process.env.DB_USER,
      password : process.env.DB_PASSWORD
    }
  }

  async executeQuery (sql: string, values: any[]): Promise<any> {
    try {
      await this.db.connect()
      const result = await this.db.query(sql, values)
      await this.db.quit()
      return result
    } catch (error) {
      console.error('Error al ejecutar la consulta SQL:', error);
      throw error;
    } finally {
      await this.db.end()
    }
  }
}