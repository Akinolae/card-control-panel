import { Actions } from "./actions";
import intState, { InitialState } from "../initialState";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const GLOBAL_STATE_KEY_PREFIX = "globalState";
const dataKey = Object.keys(intState).join("|");
type Keys = typeof dataKey;

const reducer = (
  appState: InitialState,
  action: Actions,
  payLoad: unknown
): InitialState => {
  switch (action) {
    case "SET_USER":
      return {
        ...appState,
        user: payLoad,
      };
    case "SET_CARDS":
      return {
        ...appState,
        cards: payLoad as unknown[],
      };
    case "SET_CARD_TRANSACTIONS":
      return {
        ...appState,
        cardTransactions: payLoad as unknown[],
      };
    case "SET_SIGN_IN":
      return {
        ...appState,
        isSignedIn: payLoad as boolean,
      };
    default:
      return appState;
  }
};

export const useDataReducer = (key: Keys) => {
  const { data } = useQuery<InitialState>({
    queryKey: [GLOBAL_STATE_KEY_PREFIX, key],
    staleTime: Infinity
  });

  return data;
};

export const useStateDispatch = () => {
  const queryClient = useQueryClient();
  const dispatch = (action: Actions, key: string, data: unknown) => {
    queryClient.setQueryData([key], (oldData: InitialState) => {
      return reducer(oldData, action, data);
    });
  };

  return dispatch;
};
export default reducer;
