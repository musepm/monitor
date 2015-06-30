var request = require('request'),
    Scarlet = require('scarlet'),
    conf = require('../default.json'),
    scarlet = Scarlet();

require('better-log').install();

class EventsClient {
  constructor(appid) {
    this.appid = appid;
  }

  logCalls(entity, name, fn) {
    fn = scarlet.intercept(fn)
      .using((proceed) => {
        var url = `${conf.usagebase}/events`;
        proceed();
        var data = {
          appid: this.appid,
          entity: entity,
          action: name,
          intipaddr: '1.2.3.4',
          type: 'call'
        }
        request.post(url, {json:true, body: data})
        .on('response', res => {
          console.log(res.statusCode);
          console.log(res.body);
        });
      }).proxy();
    return fn;
  }
}

module.exports = appid => {
  return new EventsClient(appid);
}
