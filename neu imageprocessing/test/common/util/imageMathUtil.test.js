'use strict';

const ImageMathUtil = require('../../../src/common/util/imageMathUtil');

describe('ImageMathUtil', () => {
  it('expect to calculate absolute number', () => {
    const total = 1337;
    const share = 666;

    const result1 = ImageMathUtil.toAbsolute(total, share);
    const result2 = ImageMathUtil.toAbsolute(share, total);

    expect(result1).toBe(8904);
    expect(result2).toBe(8904);
  });

  it('expect to calculate absolute number with negative', () => {
    const total = -545;
    const share = 99;

    const result1 = ImageMathUtil.toAbsolute(total, share);
    const result2 = ImageMathUtil.toAbsolute(share, total);

    expect(result1).toBe(-540);
    expect(result2).toBe(-540);
  });
});
