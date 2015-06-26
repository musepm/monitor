var request = require('request');

class EventsClient {
  constructor(appid) {
    
  }
  
  logCalls(name, fn) {
    Scarlet.intercept(fn).on('after', f => {
      request.post(url, data);
    });
  }
}