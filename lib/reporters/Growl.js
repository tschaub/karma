var util = require('util');
var growly = require('growly');

var helper = require('../util');

var MSG_SUCCESS = '%s SUCCESS\n%d tests passed in %s.';
var MSG_FAILURE = '%s FAILURE\n%d/%d tests failed in %s.';
var MSG_ERROR = '%s ERROR';

var GrowlReporter = function() {
  growly.register('Testacular', '', [{
    label: 'success',
    dispname: 'Success',
    title: 'Specs passed.'
  }, {
    label: 'failure',
    dispname: 'Failed',
    title: 'Specs failed.'
  }, {
    label: 'error',
    dispname: 'Failed',
    title: 'Specs failed.'
  }]);

  this.onBrowserComplete = function(browser) {
    var results = browser.lastResult;
    var time = helper.formatTimeInterval(results.totalTime);

    if (results.disconnected || results.error) {
      return growly.notify(util.format(MSG_ERROR, browser.name), 'error');
    }

    if (results.failed) {
      return growly.notify(util.format(MSG_FAILURE, browser.name, results.failed, results.total, time), 'failure');
    }

    growly.notify(util.format(MSG_SUCCESS, browser.name, results.success, time), 'success');
  };
};



// PUBLISH
module.exports = GrowlReporter;
