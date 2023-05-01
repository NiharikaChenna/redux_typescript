interface Contact {
  //an object that will be used as a payload for the AddContactAction, EditContactAction, and DeleteContactAction interfaces.
}
//The ActionType is a union type that combines all possible action types in to single type

export interface ActionType {
  type: "ADD_CONTACT" | "EDIT_CONTACT" | "DELETE_CONTACT";
  payload: Contact;
}

//These functions use object literals syntax to create the action object with 'type' & 'payload
export const addContact = (contact: Contact): ActionType => ({
  type: "ADD_CONTACT",
  payload: contact,
});

export const editContact = (contact: Contact): ActionType => ({
  type: "EDIT_CONTACT",
  payload: contact,
});

export const deleteContact = (contact: Contact): ActionType => ({
  type: "DELETE_CONTACT",
  payload: contact,
});
