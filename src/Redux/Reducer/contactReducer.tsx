export interface Contact {
  id: number;
  name: string;
  number: number | string;
  email: string;
}
//The Action type is a union type that combines all possible action types in to single type
type Action =
  | { type: "ADD_CONTACT"; payload: Contact }
  | { type: "EDIT_CONTACT"; payload: Contact }
  | { type: "DELETE_CONTACT"; payload: number };

let initialState: Contact[] = [
  {
    id: 0,
    name: "Niharika",
    number: 8106676382,
    email: "niharikachenna567@gmail.com",
  },
  {
    id: 1,
    name: "sathvika",
    number: 8106276382,
    email: "sathvikachenna@gmail.com",
  },
  {
    id: 3,
    name: "swarna",
    number: 9876543210,
    email: "swarnalathachenna@gmail.com",
  },
  {
    id: 4,
    name: "vamshi",
    number: 8309021028,
    email: "vamshikrishna@gmail.com",
  },
];
// 'ContactReducer' function is responsible for handling actions and updating the state
const contactReducer = (
  state: Contact[] = initialState,
  action: Action
): Contact[] => {
  switch (action.type) {
    case "ADD_CONTACT":
      return [...state, action.payload];
    case "EDIT_CONTACT":
      const updatedState = state.map((contact) =>
        contact.id === action.payload.id ? action.payload : contact
      );
      return updatedState;
    case "DELETE_CONTACT":
      const deletedState = state.filter(
        (contact) => contact.id !== action.payload && contact
      );
      return deletedState;
    default:
      return state;
  }
};
export default contactReducer;
