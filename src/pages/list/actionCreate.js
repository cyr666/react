import { LIST_CHANGE  } from './actionType';
export const getListInfo = ( value1,value2 )=>({
	type:LIST_CHANGE,
	value1:value1,
	value2:value2
})
