'use strict';

function sin(angle) {
  return Math.sin(angle / 180 * Math.PI);
}

function cos(angle) {
  return Math.cos(angle / 180 * Math.PI);
}

function transformToPositiveDegree(angle) {
  return (angle + 360) % 360;
}

class ImageMathUtil {
  static toAbsolute(total, share) {
    return Math.round(total * share / 100);
  }

  static calculateRotationOffset(rotation, partImageWidth, partImageHeight) {
    let imageHeightAfterRotation = 0;
    let imageWidthAfterRotation = 0;
    const positiveRotation = transformToPositiveDegree(rotation);
    if (positiveRotation >= 0 && positiveRotation < 90 || positiveRotation >= 180 && positiveRotation < 270) {
      imageWidthAfterRotation = Math.abs(
        partImageWidth * cos(rotation) + partImageHeight * sin(rotation));
      imageHeightAfterRotation = Math.abs(
        partImageWidth * sin(rotation) + partImageHeight * cos(rotation));
    } else {
      imageWidthAfterRotation = Math.abs(
        partImageHeight * cos(rotation - 90) + partImageWidth * sin(rotation - 90));
      imageHeightAfterRotation = Math.abs(
        partImageHeight * sin(rotation - 90) + partImageWidth * cos(rotation - 90));
    }
    return {
      x: (imageWidthAfterRotation - partImageWidth) / 2,
      y: (imageHeightAfterRotation - partImageHeight) / 2
    };
  }
}

module.exports = ImageMathUtil;
