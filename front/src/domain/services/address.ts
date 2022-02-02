export const isPostalcode = (target: string) => {
  return /^(\d{0,7}|\d{0,3}|\d{3}-\d{0,4})$/.test(target);
};

export const isCompletePostalcode = (target: string) => {
  return /^(\d{7}|\d{3}-\d{4})$/.test(target);
};

export const sanitizePostalcode = (target: string) => target.replace(/-/, "");
