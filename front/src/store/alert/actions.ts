import actionCreatorFactory from "typescript-fsa";
import { AlertState } from "../../domain/entity/alert";

const actionCreator = actionCreatorFactory();

type AlertPayload = Omit<AlertState, "open">;

export const alertActions = {
  openAlert: actionCreator<AlertPayload>("OPEN_ALERT"),
  closeAlert: actionCreator<{}>("CLOSE_ALERT"),
};
