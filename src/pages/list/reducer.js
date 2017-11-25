import { LIST_CHANGE } from './actionType';

const defaultState = {
		listdata:{		
			content:[],
			list:[]
		}	
}
export default (state = defaultState,action) =>{
	if( action.type === LIST_CHANGE ) {
		const newState = Object.assign({}, state,
			{listdata:{		
				content:action.value1,
				list:action.value2
			}
			}
		);
		return newState
	}
	return state
}

