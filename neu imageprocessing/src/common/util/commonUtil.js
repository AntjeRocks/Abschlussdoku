'use strict';

class CommonUtil {
  static get IMAGEPROCESSING_USER_AGENT_STRING() {
    return 'OTTOImageProcessor/1.0 (www.otto.de)';
  }

  static get BASEURL() {
    return 'i.otto.de/i/otto';
  }

  static get IMAGE_FORMAT_PNG_HEADER() {
    return 'image/png';
  }
}

module.exports = CommonUtil;
