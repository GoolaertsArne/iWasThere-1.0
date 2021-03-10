import * as SQLite from "expo-sqlite";

export class UserDAL {
  createDB() {
    const db = SQLite.openDatabase("iWasThereDBTest", 1);
    return new Promise((resolve) => {
      db.transaction(
        (tx) =>
          tx.executeSql(
            this._createQueryBuilder(),
            [],
            (txr, res) => console.log(res),
            (err) => resolve(err)
          ),
        (err) => console.log("err"),
        (success) => console.log("successfull created DB")
      );
    });
  }

  insertStudents(student) {
    const db = SQLite.openDatabase("iWasThereDBTest", 1);
    console.log(this._insertQueryBuilder(student));
    return new Promise((resolve) => {
      db.transaction(
        (tx) =>
          tx.executeSql(
            this._insertQueryBuilder(student),
            [],
            (txr, res) => console.log(res),
            (err) => resolve(false)
          ),
        (err) => resolve(false),
        (success) => resolve(true)
      );
    });
  }
  insertTest() {
    const db = SQLite.openDatabase("iWasThereDBTest", 1);
    var query =
      "INSERT INTO students (studentNr, firstName, lastName) VALUES ('test', 'test', 'test')";
    db.transaction(
      (tx) =>
        tx.executeSql(
          query,
          [],
          (txr, res) => console.log(res),
          (err) => console.log(err)
        ),
      (err) => console.log("err"),
      (success) => console.log("successfull inserted data in students")
    );
  }

  getAllUsers(cols) {
    const db = SQLite.openDatabase("iWasThereDBTest", 1);
    return new Promise((resolve) => {
      db.transaction(
        (tx) =>
          tx.executeSql(
            this._selectQueryBuilder(cols, null, null),
            [],
            (txr, res) => resolve(res.rows),
            (err) => console.log("err")
          ),
        (err) => console.log("err"),
        (success) => console.log("success")
      );
    });
  }

  _selectQueryBuilder(cols, lastName, sortOption) {
    var query = "SELECT ";
    if (cols) {
      cols.forEach((col) => {
        query += ` ${col},`;
      });
      query = query.slice(0, -1);
    } else {
      query += ` *`;
    }
    query += ` FROM students `;
    if (lastName) {
      query += ` WHERE lastName LIKE %${lastName}% `;
    }
    if (sortOption) {
      query += ` ORDER BY ${sortOption.col} ${
        sortOption.desc === true ? "DESC" : "ASC"
      };`;
    }
    return query;
  }

  _insertQueryBuilder(student) {
    console.log(student);
    var query = "INSERT ";
    query += `INTO students (studentNr, firstName, lastName) VALUES
    ('${student.studentNr}', '${student.firstName}', '${student.lastName}');`;
    return query;
  }

  _createQueryBuilder() {
    var query =
      "CREATE TABLE students ( studentNr VARCHAR(7) PRIMARY KEY ,  firstName TEXT NOT NULL, lastName TEXT NOT NULL);";
    query+= "CREATE TABLE signatures ( signature_id INT NOT NULL AUTO_INCREMENT, studentNr VARCHAR(7),  date TEXT NOT NULL, signatureBase64 VARCHAR(255) NULL UNIQUE, left NULL, right NULL, top NULL, bottom NULL, total NULL,  FOREIGN KEY(studentNr) REFERENCES students (studentNr));"
    // create table validationData ( validationKey int auto_increment primary key, left, right, top, bottom, total)
    return query;
  }
}
