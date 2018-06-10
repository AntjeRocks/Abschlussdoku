'use strict';

const HttpHeader = require('../../../src/common/web/httpHeader');

describe('HttpHeader', () => {
  it('expect to return correct name for httpHeader', () => {
    const accept = HttpHeader.ACCEPT;
    const cacheControl = HttpHeader.CACHE_CONTROL;
    const contentType = HttpHeader.CONTENT_TYPE;
    const crossOrigin = HttpHeader.CROSS_ORIGN;
    const surrogateControl = HttpHeader.SURROGATE_CONTROL;
    const xTrackable = HttpHeader.X_TRACKABLE;
    const xAmpAuth = HttpHeader.X_AMP_AUTH;

    expect(accept).toBe('Accept');
    expect(cacheControl).toBe('Cache-Control');
    expect(contentType).toBe('Content-Type');
    expect(crossOrigin).toBe('Access-Control-Allow-Origin');
    expect(surrogateControl).toBe('Surrogate-Control');
    expect(xTrackable).toBe('X-Trackable');
    expect(xAmpAuth).toBe('X-Amp-Auth');
  });
});
