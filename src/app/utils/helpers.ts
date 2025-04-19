export function assign(obj: any, prop: string, value: any) {
  console.log('obj', obj);
  console.log('prop', prop);
  console.log('value', value);

  obj[prop] = value;
}

export function isSSR() {
  return typeof window === 'undefined';
}
