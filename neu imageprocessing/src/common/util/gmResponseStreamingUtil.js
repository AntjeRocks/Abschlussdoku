'use strict';

function toErrorMessage(chunks) {
  const concatedErrorChunks = Buffer.concat(chunks);
  let errorMessage = '';
  concatedErrorChunks
    .forEach((chunk) => {
      errorMessage += String.fromCharCode(chunk);
    });
  return errorMessage;
}

function wrapStreamWithPromise(stream) {
  return new Promise((resolve) => {
    const chunks = [];
    stream
      .on('data', (chunk) => {
        chunks.push(chunk);
      })
      .on('end', () => {
        resolve(chunks);
      });
  });
}

class GmResponseStreamingUtil {
  static handleGmResponse(gmResponse, resolve, reject) {
    console.info('collecting imagemagick response chunks');
    if (gmResponse.error) {
      console.error(`error before imagemagick execution: ${JSON.stringify(gmResponse.error)}`);
    }
    Promise
      .all([
        wrapStreamWithPromise(gmResponse.stdout),
        wrapStreamWithPromise(gmResponse.stderr)
      ])
      .then(([
        chunks,
        errorChunks
      ]) => {
        if (errorChunks.length > 0) {
          const errorMessage = toErrorMessage(errorChunks);
          console.error(`error during imagemagick execution: ${errorMessage}`);
          reject(errorMessage);
          return;
        } else if (chunks.length === 0) {
          const errorMessage = 'error during imagemagick execution. No result received';
          console.error(errorMessage);
          reject(errorMessage);
          return;
        }
        resolve(chunks);
      });
  }
}

module.exports = GmResponseStreamingUtil;
