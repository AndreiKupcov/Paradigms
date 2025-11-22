'use strict';

const fs = require('node:fs');

class Future {
  // Put implementation here
}

const futurify = (fn) =>
  (...args) =>
    new Future((reject, resolve) =>
      fn(...args, (error, result) =>
        error ? reject(error) : resolve(result),
      ),
    );

const readFuture = futurify(fs.readFile);
const writeFuture = futurify(fs.writeFile);

readFuture('future.js', 'utf8')
  .map((text) => text.toUpperCase())
  .chain((text) => writeFuture('future.md', text))
  .fork(
    (error) => console.error('FS error:', error),
    () => console.log('Done'),
  );
