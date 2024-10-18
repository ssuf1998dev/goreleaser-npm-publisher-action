const format = (value: unknown): string => {
  if (typeof value === 'undefined') {
    return 'undefined';
  }

  if (value === null) {
    return 'null';
  }

  return value.toString();
};

export const fmt = (
  templates: TemplateStringsArray,
  ...data: unknown[]
): string => {
  return templates.reduce((firsBlock, secondBlock, index) => {
    return firsBlock + format(data[index - 1]) + secondBlock;
  });
};
