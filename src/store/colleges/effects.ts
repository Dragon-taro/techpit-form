import { Dispatch } from "redux";
import collegesActions from "./actions";

export const searchColleges = (name: string) => async (dispach: Dispatch) => {
  dispach(collegesActions.searchCollege.started);

  const url = `http://localhost:18001/colleges?name=${name}`;
  // const url = `https://us-central1-techpit-form-4e462.cloudfunctions.net/api/colleges?name=${name}`;

  const result = await fetch(url).then(res => res.json());

  dispach(
    collegesActions.searchCollege.done({
      result: result.results.school,
      params: {}
    })
  );
};
