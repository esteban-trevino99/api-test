import mysql, { Pool } from 'mysql'
import fs from 'fs'

class Database {
    private connection: Pool
    constructor(database: boolean) {
        const connectionData: {
            host: string,
            user: string,
            password: string,
            port: number,
            multipleStatements: boolean,
            database?: string
        } = {
            host: process.env.MYSQL_HOST as string,
            user: process.env.MYSQL_USER as string,
            password: process.env.MYSQL_PASSWORD as string,
            port: Number(process.env.MYSQL_PORT) || 3306,
            multipleStatements: true,
        }
        if (database) connectionData.database = 'codifin_test_esteban'
        this.connection = mysql.createPool(connectionData);
    }
    getConnection() {
        return this.connection;
    }
    async query(query: string, data: Array<any>, callback: Function | null) {
        this.connection.getConnection(function (_err, connection) {
            connection.query(query, data, function(err, result){
                if (err) throw err;
                if(callback) callback(result)
            })
            connection.release()
        })

    }
}

export default Database;

