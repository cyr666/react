import { CHANGE_DETAIL } from './actionType';
const defaultDetail = {
	listdata:{
		display:"none",
		detail:[]
	}
}
export default (state=defaultDetail,action)=>{
	console.log(action)
	if( action.type === CHANGE_DETAIL ) {
		const newList = Object.assign({},state,{
			listdata:{
				display:"block",
				detail:action.value
			}
		})
		return newList
	}
	return state
}