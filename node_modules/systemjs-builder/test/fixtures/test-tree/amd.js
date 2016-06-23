define(['./global.js', './some.js!./plugin.js', './text.txt!./text-plugin.js'], function(a, b, c) {
  return { is: 'amd', text: c };
});
