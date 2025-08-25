/* eslint-disable @typescript-eslint/no-explicit-any */

export interface InitialState {
  user: any;
  cards: any[];
  cardTransactions: any[];
  isSignedIn: boolean;
}
const intState: InitialState = {
  user: {},
  cards: [],
  cardTransactions: [],
  isSignedIn: false,
};

export default intState;
