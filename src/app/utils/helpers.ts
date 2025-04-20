export function assign(obj: any, prop: string, value: any) {
  try {
    obj[prop] = value;
  } catch (error) {
    console.error('Error assigning value:', error);
  }
}

export function isSSR() {
  return typeof window === 'undefined';
}
