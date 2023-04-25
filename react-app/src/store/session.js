// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const CHANGE_PROF_PIC = "session/CHANGE_PROF_PIC"
const ADD_FAVORITE = "session/ADD_FAV"
const REMOVE_FAVORITE = "session/REMOVE_FAV"

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const actionChangeProfilePic = (user) => ({
	type: CHANGE_PROF_PIC,
	payload: user
})

const actionAddFav = (location) => ({
	type: ADD_FAVORITE,
	payload: location
})
const actionRemoveFav = (location) => ({
	type: ADD_FAVORITE,
	payload: location
})


export const AddFavorite = (location) => async (dispatch) => {
	const response = await fetch(`/api/favorites/${location.id}`, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(location)
	});
	let data = await response.json()
	// console.log(data)
	if(response.ok) {
		dispatch(actionAddFav(data))
	}
	return data
}
export const RemoveFavorite = (location) => async (dispatch) => {
	const response = await fetch(`/api/favorites/${location.id}`, {
		method: 'DELETE',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(location)
	});
	let data = await response.json()
	// console.log(data)
	if(response.ok) {
		dispatch(actionRemoveFav(data))
	}
	return data
}


export const changeProfilePic = (imgData) => async (dispatch) => {
	console.log(imgData)
	const response = await fetch("/api/users/profile-pic", {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(imgData)
	});
	console.log(response)

	let data = await response.json()
	// console.log(data)
	if(response.ok) {
		dispatch(actionChangeProfilePic(data))
	}
	return data
}

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (firstName, lastName, city, state, email, password) => async (dispatch) => {
	console.log(firstName, lastName, city, state, email, password)
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			firstName,
			lastName,
			city,
			state,
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

const initialState = { user: null };

export default function reducer(state = initialState, action) {
	let newState = {...state}
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case CHANGE_PROF_PIC:
			return { user: action.payload}
		case ADD_FAVORITE:
			newState = {...state, user: {...state.user}}
			// newState.user
			return
		case REMOVE_FAVORITE:
			return
		default:
			return state;
	}
}
