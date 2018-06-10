'use strict';

const HttpStatus = require('http-status');
const HttpHeader = require('./src/common/web/httpHeader');
const ImageSetFreeService = require('./src/setFree/service/imageSetFreeService');
const CommonUtil = require('./src/common/util/commonUtil');

const ERROR_PREFIX = '[SetFree]';

exports.setFree = (event, context, respond) => {
  if (!event.queryStringParameters || !event.queryStringParameters.imageId ||
    !event.queryStringParameters.width || !event.queryStringParameters.height) {
    console.error(`${ERROR_PREFIX} missing required imageId, width or height`);
    respond(null, {
      statusCode: HttpStatus.NOT_ACCEPTABLE,
      body: `Request not acceptable`
    });
    return;
  }

  const options = {
    imageId: event.queryStringParameters.imageId,
    width: event.queryStringParameters.width,
    height: event.queryStringParameters.height
  };

  ImageSetFreeService.assertValid(options)
    .then(() => {
      return ImageSetFreeService.setFree(options)
        .then((resultChunks) => {
          const result = Buffer.concat(resultChunks);
          const SetFreeResponse = {
            statusCode: HttpStatus.OK,
            body: result.toString('base64'),
            isBase64Encoded: true,
            headers: {
              [HttpHeader.CONTENT_TYPE]: CommonUtil.IMAGE_FORMAT_PNG_HEADER
            }
          };
          respond(null, SetFreeResponse);
        })
        .catch((error) => {
          console.error(`Could not remove image background from image ${options.imageId} : ${error}`);
          respond(null, {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR
          });
        })
        .catch(() => {
          respond(null, {
            statusCode: HttpStatus.BAD_REQUEST
          });
        });
    });
};
