const logger = require("../utils/logger");

class ExampleController {
  constructor(db) {
    this.db = db;
  }

  login(username, password) {
    return new Promise((resolve, resolve) => {
      this.db.query(
        "SELECT id, details FROM users WHERE username = ? AND password = ?",
        [username, password],
        (err, docs) => {
          if (err) {
            logger.Log({
              level: logger.LEVEL.ERROR,
              component: "CONTROLLER.EXAMPLE",
              code: "CONTROLLER.QUERY.ERROR",
              description: err.toString(),
              category: "",
              ref: {}
            });
            reject(err);
            return;
          }
          if (docs.length > 0) {
            resolve({ code: 200, data: docs[0] });
          } else {
            resolve({ code: 404, msg: "Access Denied !" });
          }
        }
      );
    });
  }
}

module.exports = db => {
  return new ExampleController(db);
};
