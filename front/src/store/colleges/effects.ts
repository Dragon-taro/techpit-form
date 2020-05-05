import { Dispatch } from "redux";
import collegesActions from "./actions";

export const searchColleges = (name: string) => async (dispach: Dispatch) => {
  const url = `http://localhost:18001/colleges?name=${name}`;

  const result = await fetch(url).then(res => res.json());

  dispach(
    collegesActions.searchCollege.done({
      result: result.results.school,
      params: {}
    })
  );
};
