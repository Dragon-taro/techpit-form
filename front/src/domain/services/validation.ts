import { Profile } from "../entity/profile";
import { Validation } from "../entity/vaildation";
import { PROFILE } from "./profile";
import { College } from "../entity/college";
import { Career } from "../entity/career";

export const calculateValidation = (profile: Profile) => {
  const message: Validation = {
    name: emptyValidation(profile.name, PROFILE.NAME),
    description: lengthValidation(profile.description, 1000),
    birthday: emptyValidation(profile.birthday, PROFILE.BIRTHDAY),
    gender: emptyValidation(profile.gender, PROFILE.GENDER),
    address: {
      postalcode: emptyValidation(
        profile.address.postalcode,
        PROFILE.ADDRESS.POSTALCODE
      ),
      prefecture: emptyValidation(
        profile.address.prefecture,
        PROFILE.ADDRESS.PREFECTURE
      ),
      city: emptyValidation(profile.address.city, PROFILE.ADDRESS.CITY),
      restAddress: emptyValidation(
        profile.address.restAddress,
        PROFILE.ADDRESS.RESTADDRES
      ),
    },
    college: {
      faculty: facilityValidation(profile.college),
    },
    careers: careerValidation(profile.careers),
  };

  return message;
};

export const isValid = (message: Validation) => {
  const falttenValues = Object.values(message)
    .map(extractValues)
    .flat() as string[];

  return falttenValues.every((fv) => !fv);
};

const extractValues = (obj: any): any[] | string => {
  if (typeof obj === "string") return obj;
  return Object.values(obj).map(extractValues);
};

// 必須項目
const emptyValidation = (target: string, col: string) =>
  isEmpty(target) ? `${col}を入力してください。` : "";

// 文字数制限
const lengthValidation = (target: string, maxLen: number) =>
  isTooLong(target, maxLen) ? `${maxLen}文字以下で入力してください。` : "";

const careerValidation = (careers: Career[]) =>
  careers.map((c) => ({
    company: emptyValidation(c.company, PROFILE.CAREERS.COMPANY),
    position: emptyValidation(c.position, PROFILE.CAREERS.POSITION),
    startAt: emptyValidation(c.startAt, PROFILE.CAREERS.START_AT),
    endAt: emptyValidation(c.endAt, PROFILE.CAREERS.END_AT),
  }));

const facilityValidation = (college: College) =>
  college.name && !college.faculty
    ? `${PROFILE.COLLEGE.FACULTY}を入力してください`
    : "";

const isEmpty = (str: string) => !str.trim();

const isTooLong = (str: string, maxLen: number) => str.trim().length >= maxLen;
