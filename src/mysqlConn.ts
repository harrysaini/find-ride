import { createConnection, Connection, Pool, createPool, ConnectionOptions } from 'mysql2/promise';
import config from './config';

const { db } = config


const creds: ConnectionOptions = {
  host: db.host,
  user: db.username,
  database: db.database,
  password: db.password,
  //   debug: true
}

class DatabaseConnection {
  private static setupConnection: Connection;
  private static pool: Pool;

  static async getSetupConnection() {
    const connection = this.setupConnection || await createConnection({
      ...creds,
      multipleStatements: true,

    });
    this.setupConnection = connection;
    return connection;
  }


  static async checkConnection(connection: Connection) {
    const [rows] = await connection.query('SELECT 1 + 1;');
    console.log(rows);
    console.log("Connected successfully");
  }


  static async getConnectionPool() {
    const pool = this.pool || await createPool({
      ...creds,
      waitForConnections: true,
      connectionLimit: 20,
      queueLimit: 100
    });
    this.pool = pool;
    return pool;
  }
}


export default DatabaseConnection;
