import { SET_USER } from '../types/user';

export const setUser = (user) => {
	return dispatch => {
		dispatch({
			type: SET_USER,
			payload: {
				user
			}
		})
	}
}