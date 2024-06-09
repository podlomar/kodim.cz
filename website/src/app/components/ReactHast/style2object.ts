interface Css {
  [key: string]: string;
}

const camelCase = (str: string): string => {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};

export const style2object = (style: string): Css => {
  return style.split(';').reduce((acc, style) => {
    const [key, value] = style.split(':');
    if (key === '' || value === '') {
      return acc;
    }

    acc[camelCase(key.trim())] = value.trim();
    return acc;
  }, {} as Css);
}
