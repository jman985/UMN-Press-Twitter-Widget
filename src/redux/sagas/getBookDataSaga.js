import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';


//GET book data from the database to display on book page
function* fetchBookData(action){
  try{
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.get('/api/books/' + action.payload);
    //configure title to match UMN press bookpage urls, then add to response
    let urlTitle = response.data[0].title.toLowerCase().replace(/ /g,'-').replace(/'/,'a').replace(/,/g,'')
    let authorName= response.data[0].author1.split(',')[1] + ' ' +response.data[0].author1.split(',')[0]

    response.data[0].urlTitle = urlTitle;
    response.data[0].authorName = authorName;

    yield put({type:'SET_BOOK_DATA', payload: response.data[0] });
  }
  catch (error) {
    console.log('Error with fetchBookData Saga:', error);
  }
}

function* getBookDataSaga() {
  yield takeLatest('FETCH_BOOK_DATA', fetchBookData);
}
  
export default getBookDataSaga;