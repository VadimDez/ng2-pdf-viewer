//exports.build = false;

define(function() {
  return {
    fetch: function() {
      return '';
    },
    listAssets: function(loads) {
      return loads.map(function(load) {
        return {
          url: load.address,
          contentType: 'text/plain'
        };
      });
    }
  };
});