import { Dispatch } from "redux";
import profileActions from "./actions";
import { Address } from "../../domain/entity/address";

import { isCompletePostalcode, sanitizePostalcode } from "../../domain/services/address";

export const searchAddressFromPostalcode = (code: string) => async(
    dispatch: Dispatch
) => {
    if(!isCompletePostalcode(code)) return;

    const res = await fetch(
        `https://apis.postcode-jp.com/api/v3/postcodes?apikey=wfdEFpaAqxasZQorbsmJ3FBc2AGVXl8S42F4F5R&postcode=${sanitizePostalcode(code)}`
    );
    const result = await res.json();
    
    if (!result.data[0]) return;

    const address: Partial<Address> = {
        prefecture: result.data[0].pref,
        city: result.data[0].city + result.data[0].town
    };

    dispatch(profileActions.searchAddress.done({ result: address, params: {} }));
};