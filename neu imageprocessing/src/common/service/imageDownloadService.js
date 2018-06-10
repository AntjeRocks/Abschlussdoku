'use strict';

const createOutputStream = require('create-output-stream');
const request = require('request');

const HttpHeader = require('../web/httpHeader');
const ImageMathUtil = require('../util/imageMathUtil');
const CommonUtil = require('../../common/util/commonUtil');

function getAbsoluteImageWidth(options, width) {
  if (options.style) {
    if (options.style.setFree) {
      return 800;
    }
    if (options.style.width) {
      return ImageMathUtil.toAbsolute(width, options.style.width);
    }
  }
  return width;
}

function getAbsoluteImageHeight(options, height) {
  if (options.style) {
    if (options.style.setFree) {
      return 800;
    }
    if (options.style.height) {
      ImageMathUtil.toAbsolute(height, options.style.height);
    }
  }
  return height;
}

function sizeUrlParameter(options, width, height) {
  const absoluteImageWidth = getAbsoluteImageWidth(options, width);
  const absoluteImageHeight = getAbsoluteImageHeight(options, height);
  return `?maxW=${absoluteImageWidth}&maxH=${absoluteImageHeight}`;
}

class ImageDownloadService {
  static request(url) {
    return request({
      headers: {
        [HttpHeader.USER_AGENT]: CommonUtil.IMAGEPROCESSING_USER_AGENT_STRING
      },
      uri: url
    });
  }

  static getImageServerUrl(options, width, height) {
    return `http://${CommonUtil.BASEURL}/${options.imageId}${
      sizeUrlParameter(options, width, height)}`;
  }

  static download(options, width, height) {
    return new Promise((resolve, reject) => {
      const imageUrl = `http://${CommonUtil.BASEURL}/${options.imageId}${sizeUrlParameter(
        options, width, height)}`;
      request({
        headers: {
          [HttpHeader.USER_AGENT]: CommonUtil.IMAGEPROCESSING_USER_AGENT_STRING
        },
        uri: imageUrl
      })
        .on('error', (error) => {
          console.error(`Could not download image with url ${imageUrl} : ${error}`);
          reject(error);
        })
        .pipe(createOutputStream(`'/tmp/imageprocessing/resources/img'/${options.imageId}`))
        .on('error', () => {
          reject();
        })
        .on('finish', () => {
          resolve();
        });
    });
  }
}

module.exports = ImageDownloadService;
