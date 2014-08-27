var Router = require('koa-router');
var thunkify = require("thunkify");

var router = new Router();

var GoogleSpreadsheet = require("google-spreadsheet");
var sheet = new GoogleSpreadsheet('1El5lOQrH-X9GgPRxWpMFw7AAI4i7DMDDYnBFQ82io08');

var Cacheman = require("cacheman");
var cache = new Cacheman("rows", {
  ttl: "1m",
  engine: 'memory'
});

router.get('/', function *() {
  var rows = yield getRows();
  var context = {
    rows: rows
  };
  yield this.render("index", context);
});


function getRows () {
  return new Promise(function (resolve, reject) {
    cache.get("rows", function (err, rows) {
      if (!err && rows) {
        resolve(rows);
      } else {
        sheet.getRows("od6", function (err, row_data) {
          if (err) {
            reject(err);
          } else {
            cache.set("rows", row_data, function () {
              resolve(row_data);
            });
          }
        });
      }
    });
  });
}

module.exports = router;