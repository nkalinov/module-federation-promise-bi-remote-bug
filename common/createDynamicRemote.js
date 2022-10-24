const createDynamicRemote = (name, remoteUrl) =>
  `promise new Promise(async resolve => {
  
  // Base API URL is the public path of the current chunk.
  const baseUrl = __webpack_require__.p;

  const proxy = {
    get: (request) => window['${name}'].get(request),
    init: (arg) => {
      try {
        return window['${name}'].init(arg)
      } catch(e) {
        console.log('Remote container "${name}" already initialized')
      }
    }
  }
 
  // if (window['${name}']) {
  //   console.log('Remote "${name}" already loaded.');
  //   return resolve(proxy);
  // }

  __webpack_require__.l(
    '${remoteUrl}',
    event => {
      if (event?.type === 'load') {
        // the injected script has loaded and is available on window
        // we can now resolve this Promise
        return resolve(proxy)
      }
      const realSrc = event?.target?.src;
      const error = new Error();
      error.message = 'Loading script failed. (missing: ' + realSrc + ')';
      error.name = 'ScriptExternalLoadError';
      reject(error);
    },
    '${name}'
  );
})
`;

module.exports = createDynamicRemote;
