export function assign(obj: any, prop: string, value: any) {
  obj[prop] = value;
}

export function isSSR() {
  return typeof window === 'undefined';
}