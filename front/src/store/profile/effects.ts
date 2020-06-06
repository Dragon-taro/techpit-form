import { Dispatch } from "redux";
import profileActions from "./actions";
import { Address } from "../../domain/entity/address";
import {
  isCompletePostalcode,
  sanitizePostalcode
} from "../../domain/services/address";

export const searchAddressFromPostalcode = (code: string) => async (
  dispach: Dispatch
) => {
  // 以下の行を追加する
  if (!isCompletePostalcode(code)) return;

  const result = await fetch(
    // sanitizePostalcode()の処理を追加する
    `https://apis.postcode-jp.com/api/v3/postcodes?apikey=KGuEMR1mqmuZt5qZjGUtoHtA7XjBGdWYIzv5TBF&postcode=${sanitizePostalcode(
      code
    )}`
  ).then(res => res.json());

  const address: Partial<Address> = {
    prefecture: result.data[0].pref,
    city: result.data[0].city + result.data[0].town
  };

  dispach(profileActions.searchAddress.done({ result: address, params: {} }));
};
