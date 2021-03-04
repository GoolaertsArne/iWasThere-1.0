import * as SQLite from "expo-sqlite";

export class UserDAL {
  getAllUsers(cols) {
    const db = SQLite.openDatabase("iWasThere", 1);
    return new Promise(resolve => {
        db.transaction(
            (tx) => tx.executeSql(this._selectQueryBuilder(cols, null, null), [], (txr, res) => resolve(res.rows), (err) => console.log("err")),
            (err) => console.log("err"),
            (success) => console.log("success"));
    });
  }
  
  _selectQueryBuilder(cols, lastName, sortOption) {
    var query = "SELECT ";
    if(cols) {
        cols.forEach(col => {
            query += ` ${col},`;
        });
        query = query.slice(0, -1);
    } else {
        query += ` *`
    }
    query += ` FROM users `;
    if(lastName) {
        query += ` WHERE lastName LIKE %${lastName}% `;
    }
    if(sortOption) {
        query += ` ORDER BY ${sortOption.col} ${sortOption.desc === true ? "DESC" : "ASC"};`;
    }
    return query;
  }
  _insertQueryBuilder(user) {

  }
}
