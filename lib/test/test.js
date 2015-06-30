'use strict';

var monitor = require('../index.js')('myapp1');

function ex() {
  console.log('ex');
}

ex = monitor.logCalls('', 'ex', ex);
ex();

setTimeout(function (f) {}, 1000);