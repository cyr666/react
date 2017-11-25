import { combineReducers } from 'redux';
import { reducer as listReducer } from '../pages/list/';
import { reducer as detailReducer } from '../pages/detail/';
export default combineReducers({
	list:listReducer,
	detail:detailReducer
})