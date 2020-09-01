import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* loadCsv(action) {
  //const response = yield axios.get('/api/user', config);
  try {
    console.log("loadCsv");
    yield put({ type: "SET_CSV_DATA", payload: action.payload });
  } catch (err) {
    console.log("CSV SAGA ERROR", err);
  }
}

function* sendCsv(action) {
  //const response = yield axios.get('/api/user', config);
  try {
    console.log("sendCsv");
    const response = yield axios.post("/publications/csv", {
      payload: action.payload,
    });
    console.log("SendCSV", response);
    //yield put({ type: "SEND_CSV_DATA", payload: action.payload });
  } catch (err) {
    console.log("CSV SAGA ERROR", err);
  }
}

function* csvSaga() {
  console.log("inside csvSaga");
  yield takeLatest("LOAD_CSV_INTO_STORE", loadCsv);
  yield takeLatest("SEND_CSV_TO_DB", sendCsv);
}

export default csvSaga;
