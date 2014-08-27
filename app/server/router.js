var Router = require('koa-router');
var thunkify = require("thunkify");

var router = new Router();

var GoogleSpreadsheet = require("google-spreadsheet");
var sheet = new GoogleSpreadsheet('1El5lOQrH-X9GgPRxWpMFw7AAI4i7DMDDYnBFQ82io08');

router.get('/', function *() {
  var rows = yield getRows();
  var context = {
    rows: rows
  };
  yield this.render("index", context);
});


function getRows () {
  return new Promise(function (resolve, reject) {
    sheet.getRows("od6", function (err, row_data) {
      if (err) {
        reject(err);
      } else {
        resolve(row_data);
      }
    });
  });
}

module.exports = router;