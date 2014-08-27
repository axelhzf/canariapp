var koa = require("koa");
var _ = require("underscore");
var co = require("co");
var views = require("koa-views");
var mount = require("koa-mount");
var staticCache = require('koa-static-cache');

var thunkify = require("thunkify")

var router = require("./router");
var app = koa();
app.use(views('views', {
  default: 'jade'
}));
app.use(router.middleware());

mountStatic("/assets", __dirname + '/../assets');


var port = process.env.port || 3000;
app.listen(port);


function mountStatic (url, path) {
  var assets = koa();
  assets.use(staticCache(path, {
    maxAge: 2 * 60 * 60
  }));
  app.use(mount(url, assets));
}

