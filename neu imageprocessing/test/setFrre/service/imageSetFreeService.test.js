'use strict';

const gm = require('gm');
const Stream = require('stream').Stream;

const ImageSetFreeService = require('../../../src/setFree/service/imageSetFreeService');
const ImageDownloadService = require('../../../src/common/service/imageDownloadService');
const GmResponseStreamingUtil = require('../../../src/common/util/gmResponseStreamingUtil');

describe('ImageSetFreeService', () => {
  function setupSetFreeSpies() {
    spyOn(GmResponseStreamingUtil, 'handleGmResponse').and.callFake((gmResponse, resolve) => {
      resolve(['resultChunk']);
    });

    const mockedStream = new Stream();
    mockedStream.readable = true;
    mockedStream._read = () => {
    };

    spyOn(ImageDownloadService, 'request').and.returnValue(mockedStream);

    const spies = [];
    spies.push({
      spy: spyOn(gm, 'subClass').and.returnValue((source, height, color) => {
        expect(source).toEqual(mockedStream);
        const gmObject = new gm(source, height, color);

        spies.push({
          spy: spyOn(gmObject, 'setFormat').and.returnValue(gmObject),
          expected: ['png']
        });
        spies.push({
          spy: spyOn(gmObject, 'borderColor').and.returnValue(gmObject),
          expected: ['white']
        });
        spies.push({
          spy: spyOn(gmObject, 'border').and.returnValue(gmObject),
          expected: [
            1,
            1
          ]
        });
        spies.push({
          spy: spyOn(gmObject, 'fuzz').and.returnValue(gmObject),
          expected: [
            5,
            true
          ]
        });
        spies.push({
          spy: spyOn(gmObject, 'fill').and.returnValue(gmObject),
          expected: ['rgba(0, 0, 0, 0)']
        });
        spies.push({
          spy: spyOn(gmObject, 'setDraw').and.returnValue(gmObject),
          expected: [
            'color',
            '0',
            '0',
            'floodfill'
          ]
        });
        spies.push({
          spy: spyOn(gmObject, 'quality').and.returnValue(gmObject),
          expected: [100]
        });

        return gmObject;
      }),
      expected: [{imageMagick: true}]
    });

    return spies;
  }

  it('expect to assert valid if parameters are correct', (done) => {
    ImageSetFreeService.assertValid({
      imageId: '123456',
      width: 100,
      height: 100
    })
      .then(() => {
        done();
      })
      .catch((error) => {
        done.fail(error);
      });
  });

  it('expect to assert invalid if imageId is missing', (done) => {
    ImageSetFreeService.assertValid({
      width: 100,
      height: 100
    })
      .then(() => {
        done.fail('this should not happen!!!');
      })
      .catch(() => {
        done();
      });
  });

  it('expect to assert invalid if width is not like number', (done) => {
    ImageSetFreeService.assertValid({
      imageId: '123456',
      width: '100px',
      height: 100
    })
      .then(() => {
        done.fail('this should not happen!!!');
      })
      .catch(() => {
        done();
      });
  });

  it('expect to assert invalid if height is not like number', (done) => {
    ImageSetFreeService.assertValid({
      imageId: '123456',
      width: 100,
      height: '100px'
    })
      .then(() => {
        done.fail('this should not happen!!!');
      })
      .catch(() => {
        done();
      });
  });

  it('expect to assert invalid if width is missing', (done) => {
    ImageSetFreeService.assertValid({
      imageId: '123456',
      height: 100
    })
      .then(() => {
        done.fail('this should not happen!!!');
      })
      .catch(() => {
        done();
      });
  });

  it('expect to assert invalid if height is missing', (done) => {
    ImageSetFreeService.assertValid({
      imageId: '123456',
      width: 100
    })
      .then(() => {
        done.fail('this should not happen!!!');
      })
      .catch(() => {
        done();
      });
  });

  it('expect to call gm with the correct params', (done) => {
    // given
    const spies = setupSetFreeSpies(true);

    // when
    ImageSetFreeService.setFree({
      imageId: '123456',
      width: 100,
      height: 100
    }).then((result) => {
      // then
      expect(result).toEqual(['resultChunk']);
      spies.forEach((spyExpect) => {
        expect(spyExpect.spy).toHaveBeenCalledTimes(1);
        expect(spyExpect.spy).toHaveBeenCalledWith(...spyExpect.expected);
      });
      done();
    });
  });
});
