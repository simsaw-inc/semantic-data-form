function getName(name: any): string {
  if (!name) {
    return ''
  }

  if (Array.isArray(name)) {
    return joinNames((name || []).filter(val => !!val));
  }

  if (typeof name === 'object') {
    return joinNames((Object.keys(name) || []).filter(key => !!name[key]));
  }

  return `${name}`.trim()
}

function joinNames(items: Array<any>) {
  return items
    .map(getName)
    .filter((o: string) => o.length)
    .join(' ');
}

export default function (...args: any) {
  if (!args) {
    return ''
  }

  return joinNames(args);
}