'use strict';function _interopDefault(e){return(e&&(typeof e==='object')&&'default'in e)?e['default']:e}var path=_interopDefault(require('path')),express=_interopDefault(require('express')),reactDom=_interopDefault(require('react-dom/server')),React=_interopDefault(require('react')),styledComponents=require('styled-components');var pkg = {name:"eft",version:"1.0.0",main:"dist/server.js",module:"dist/server.esm.js",repository:"https://github.com/enessefak/eft.git",author:"enes.sefa.k <enes.sefa.k@gmail.com>",license:"MIT",scripts:{build:"rollup -c --environment BUILD:production",dev:"rollup -cw --environment BUILD:development"},files:["dist"],dependencies:{"core-js":"3",express:"^4.17.1",react:"^16.13.1","react-dom":"^16.13.1","styled-components":"^5.0.1"},devDependencies:{"@babel/core":"^7.9.0","@babel/plugin-proposal-class-properties":"^7.8.3","@babel/plugin-syntax-decorators":"^7.8.3","@babel/preset-env":"^7.9.0","@babel/preset-react":"^7.9.4","@rollup/plugin-commonjs":"^11.0.2","@rollup/plugin-json":"^4.0.2","@rollup/plugin-node-resolve":"^7.1.1","@rollup/plugin-replace":"^2.3.1","@types/express":"^4.17.3","@types/react":"^16.9.27","@types/react-dom":"^16.9.5","@types/styled-components":"^5.0.1","@typescript-eslint/eslint-plugin":"^2.26.0","@typescript-eslint/parser":"^2.26.0","babel-plugin-styled-components":"^1.10.7",eslint:"^6.8.0","eslint-config-prettier":"^6.10.1","eslint-plugin-prettier":"^3.1.2","eslint-plugin-react":"^7.19.0",nodemon:"^2.0.2",prettier:"^2.0.2",rollup:"^2.3.1","rollup-plugin-babel":"^4.4.0","rollup-plugin-filesize":"^6.2.1","rollup-plugin-peer-deps-external":"^2.2.2","rollup-plugin-progress":"^1.1.1","rollup-plugin-typescript2":"^0.27.0","rollup-plugin-uglify":"^6.0.4","rollup-plugin-visualizer":"^4.0.2",typescript:"^3.8.3"}};
var app = express();
var port = 81;
var GLOBAL_STATE = {
  text: 'Deneme'
};
var layout = {
  head: "\n<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>" + pkg.name + " Fragment</title>\n    <script>var GLOBAL_STATE = " + JSON.stringify(GLOBAL_STATE) + "</script>\n</head>\n\n<body>\n    <div id=\"root\">",
  foot: "</div>\n  <script src=\"" + pkg.name + ".js\"></script>\n</body>\n\n</html>\n"
};
app.use(express["static"](path.resolve(__dirname, 'public')));
app.get('/', function (req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');
  delete require.cache[require.resolve('./app')]; // eslint-disable-next-line @typescript-eslint/no-var-requires

  var Application = require('./app');

  var sheet = new styledComponents.ServerStyleSheet();
  var jsx = sheet.collectStyles( /*#__PURE__*/React.createElement(Application, {
    state: GLOBAL_STATE
  }));
  var bodyStream = sheet.interleaveWithNodeStream(reactDom.renderToNodeStream(jsx));
  res.write(layout.head);
  bodyStream.on('data', function (chunk) {
    return res.write(chunk);
  });
  bodyStream.on('error', function (err) {
    console.error('react render error:', err);
  });
  bodyStream.on('end', function () {
    res.write(layout.foot);
    res.end();
  });
});
app.listen(port, function () {
  return console.log(pkg.name + " app listening on port " + port + "!");
});