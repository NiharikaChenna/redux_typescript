import { put, takeLatest } from "redux-saga/effects";
import { ActionType } from "../Actions/Action";
import { Contact } from "../Reducer/contactReducer";

// Generator functions handle adding, editing and deleting contacts
function* addContactSaga(action: ActionType) {
  try {
    const contact: Contact = action.payload as Contact;
    yield put({ type: "ADDING_CONTACT", payload: contact });
  } catch (error) {
    console.log(error);
  }
}

function* updateContactSaga(action: ActionType) {
  try {
    const contact: Contact = action.payload as Contact;
    yield put({ type: "UPDATE_CONTACT", payload: contact });
  } catch (error) {
    console.log(error);
  }
}

function* deleteContactSaga(action: ActionType) {
  try {
    const id: number = action.payload as number;
    yield put({ type: "REMOVE_CONTACT", payload: id });
  } catch (error) {
    console.log(error);
  }
}

export function* contactSagas() {
  // Use takeLatest to listen for the latest instance of the specified action types and run the corresponding sagas
  yield takeLatest("ADDING_CONTACT", addContactSaga);
  yield takeLatest("UPDATE_CONTACT", updateContactSaga);
  yield takeLatest("REMOVE_CONTACT", deleteContactSaga);
}
