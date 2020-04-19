export const isPostalcode = (target: string) =>
  /^(\d{0,7}|\d{0,3}|\d{3}-\d{0,4})$/.test(target);
