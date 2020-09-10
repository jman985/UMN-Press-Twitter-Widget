import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

//GET book data from the database to display on book page

function* fetchBookData(action){
  try{
      console.log('querying with', action.payload);
      
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.get('/api/books/' + action.payload);
    console.log('response from server: ', response.data);
    //configure title to match UMN press bookpage urls, then add to response
    let urlTitle = response.data[0].title.toLowerCase().replace(/ /g,'-').replace(/'/,'a').replace(/,/g,'')

    response.data[0].urlTitle = urlTitle;

    console.log('this is the book url', urlTitle);
    
    yield put({type:'SET_BOOK_DATA', payload: response.data[0] });
  }
  catch (error) {
    console.log('Error with fetchBookData Saga:', error);
  }
}

function* getTweetIDSaga() {
  yield takeLatest('FETCH_BOOK_DATA', fetchBookData);
}
  
export default getTweetIDSaga;