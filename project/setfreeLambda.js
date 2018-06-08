'use strict';

const HttpStatus = require('http-status');

const {logger: log} = require('turing-logging');

const HttpHeader = require('../../common/web/httpHeader');
const ImageSetFreeService = require('../service/imageSetFreeService');

class ImageSetFreeController {
    static setFree(request, response) {
        const options = {
            imageId: request.params.imageId,
            width: request.query.width,
            height: request.query.height
        };
        ImageSetFreeService.assertValid(options)
            .then(() => {
                return ImageSetFreeService.setFree(options)
                    .then((resultChunks) => {
                        response.setHeader(HttpHeader.CACHE_CONTROL, 'public,max-age=300');
                        response.setHeader(HttpHeader.CONTENT_TYPE, 'image/png');
                        response.send(Buffer.concat(resultChunks));
                    })
                    .catch((error) => {
                        log.error(`Could not remove image background from image ${options.imageId} : ${error}`);
                        response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
                    });
            })
            .catch((error) => {
                response.status(HttpStatus.BAD_REQUEST).send(error);
            });
    }
}

module.exports = ImageSetFreeController;