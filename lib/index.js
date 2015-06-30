'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var request = require('request'),
    Scarlet = require('scarlet'),
    conf = require('../default.json'),
    scarlet = Scarlet();

require('better-log').install();

var EventsClient = (function () {
  function EventsClient(appid) {
    _classCallCheck(this, EventsClient);

    this.appid = appid;
  }

  _createClass(EventsClient, [{
    key: 'logCalls',
    value: function logCalls(entity, name, fn) {
      var _this = this;

      fn = scarlet.intercept(fn).using(function (proceed) {
        var url = '' + conf.usagebase + '/events';
        proceed();
        var data = {
          appid: _this.appid,
          entity: entity,
          action: name,
          intipaddr: '1.2.3.4',
          type: 'call'
        };
        request.post(url, { json: true, body: data }).on('response', function (res) {
          console.log(res.statusCode);
          console.log(res.body);
        });
      }).proxy();
      return fn;
    }
  }]);

  return EventsClient;
})();

module.exports = function (appid) {
  return new EventsClient(appid);
};