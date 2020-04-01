import { Career } from "../entity/career";

export const isEmptyCareer = (career: Career) => {
  return values(career).every(v => !v);
};

export const exitEmptyCareers = (careers: Career[]) =>
  careers.length !== 0 && careers.map(c => isEmptyCareer(c)).some(c => c);

const values = (career: Career) => Object.values(career);
