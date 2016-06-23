System.register(['./second.js'], function($__export) {
  return {
    setters: [function() {}],
    execute: function() {
      $__export('some', 'exports');
      $__export('pi', 'π');
      $__export('name', __moduleName);
    }
  };
});