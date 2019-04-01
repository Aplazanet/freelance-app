import { SET_USER } from '../types/user';

const initState = {
	user: ''
}
export default (state = initState, action) => {
	switch(action.type) {
		case SET_USER :
			return {...state, user: action.payload.user}
		default :
		return state
	}
}