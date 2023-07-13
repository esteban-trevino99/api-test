import Database from '../config/database'
import fs from 'fs'

export const install = () => {
    const dbConnection = new Database(false).getConnection();
    const sql = fs.readFileSync('./scheme.sql').toString();
    dbConnection.query(sql, (err: any, _results: any) => {
        if (err) throw err;
        console.log("Database 'codifin_test_esteban' created!");
        process.exit()
    })
}

