function factory(first) {
  return { jquery: '1', first: first };
}

define('jquery', ['./first.js'], factory);