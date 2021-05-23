export function assign(obj: Object, prop: string, value: any) {
  obj[prop] = value;
}

export function isNode(): boolean {
  // The `window` can be mocked on the server side, e.g. `global.window = {}`.
  return (
    typeof process !== 'undefined' &&
    // Checking only for `process` isn't enough to identify whether or not we're in a Node
    // environment, because Webpack can polyfill the `process`.
    Object.prototype.toString.call(process) === '[object process]'
  );
}
