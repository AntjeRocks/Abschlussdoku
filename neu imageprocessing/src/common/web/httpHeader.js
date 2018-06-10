'use strict';

class HttpHeader {
  static get ACCEPT() {
    return 'Accept';
  }

  static get CACHE_CONTROL() {
    return 'Cache-Control';
  }

  static get CONTENT_TYPE() {
    return 'Content-Type';
  }

  static get CROSS_ORIGN() {
    return 'Access-Control-Allow-Origin';
  }

  static get SURROGATE_CONTROL() {
    return 'Surrogate-Control';
  }

  static get USER_AGENT() {
    return 'User-Agent';
  }

  static get X_TRACKABLE() {
    return 'X-Trackable';
  }

  static get X_AMP_AUTH() {
    return 'X-Amp-Auth';
  }

  static toLower(name) {
    return name.toLowerCase();
  }
}

module.exports = HttpHeader;
