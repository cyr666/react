import { CHANGE_INDEX } from './actionType';
const defaultState = {
	list:[]
}
export default ( state = defaultState,action) =>{
	if(action.type === CHANGE_INDEX){
		const newState = Object.assign({}, state);
		newState.list = action.value;
		return newState
	}
	return state
}