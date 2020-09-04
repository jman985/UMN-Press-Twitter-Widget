import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// loads csv rows onto DOM
function* loadCsv(action) {
  action.payload.pop();
  try {
    yield put({ type: "SET_CSV_DATA", payload: action.payload });
  } catch (err) {
    console.log("CSV SAGA ERROR", err);
  }
}

// posts csv rows to publication table
function* sendCsv(action) {
  try {
    const response = yield axios.post("/publications/csv", {
      payload: action.payload,
    });
    console.log("SendCSV", response);
  } catch (err) {
    console.log("CSV SAGA ERROR", err);
  }
}

function* csvSaga() {
  yield takeLatest("LOAD_CSV_INTO_STORE", loadCsv);
  yield takeLatest("SEND_CSV_TO_DB", sendCsv);
}

export default csvSaga;
