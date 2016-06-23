System.config({
  map: {
    condition: 'conditions.js'
  },
  packages: {
    'pkg': {
      map: {
        './env-condition': {
          'browser': './env-condition-browser'
        }
      }
    }
  }
});
