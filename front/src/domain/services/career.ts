import { Career } from "../entity/career";

export const exitEmptyCareers = (careers: Career[]) => {
  return careers.some((c) => isEmptyCareer(c));
};

const isEmptyCareer = (career: Career) => {
  return Object.values(career).every((v) => !v);
};
