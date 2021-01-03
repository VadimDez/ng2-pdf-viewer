export function assign(obj: Object, prop: string, value: any) {
  obj[prop] = value;
}

export function isSSR() {
  return typeof window === 'undefined';
}