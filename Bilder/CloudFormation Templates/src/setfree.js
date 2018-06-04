'use strict';

const gm = require('gm');
const Joi = require('joi');

const {logger: log} = require('turing-logging');

const ImageDownloadService = require('../../common/service/imageDownloadService');
const GmResponseStreamingUtil = require('../../common/util/gmResponseStreamingUtil');

class ImageSetFreeService {
    static assertValid(options) {
        return new Promise((resolve, reject) => {
            const schema = {
                imageId: Joi.string().required(),
                width: Joi.number().required(),
                height: Joi.number().required()
            };
        Joi.validate(options, schema, (error) => {
            if (error) {
                reject(error);
            }
            resolve();
    });
    });
    }

    static setFree({imageId, width, height}) {
        const subclassedGm = gm.subClass({imageMagick: true});
        return new Promise((resolve, reject) => {
            subclassedGm(ImageDownloadService.request(ImageDownloadService
                .getImageServerUrl({imageId}, width, height)))
                    .setFormat('png')
                    .borderColor('white')
                    .border(1, 1)
                    .fuzz(5, true)
                    .fill('rgba(0, 0, 0, 0)')
                    .setDraw('color', '0', '0', 'floodfill')
                    .quality(100)
                    .stream((error, stdout, stderr) => {
                    GmResponseStreamingUtil.handleGmResponse({
                    error,
                    stdout,
                    stderr
        }, resolve, reject);
    })
    .on('error', (error) => {
            log.error('error during image download');
        reject(error);
    });
    });
    }
}

module.exports = ImageSetFreeService;