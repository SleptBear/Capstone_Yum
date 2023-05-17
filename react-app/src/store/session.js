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

const actionAddFav = (locations) => ({
	type: ADD_FAVORITE,
	payload: locations
})
const actionRemoveFav = (locations) => ({
	type: REMOVE_FAVORITE,
	payload: locations
})

export const CreateFav = () => async (dispatch) => {
	const response = await fetch("/api/favorites/create", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response
}




export const AddFavorite = (locationId) => async (dispatch) => {
	// console.log(typeof Number(locationId))
	let locId = Number(locationId)
	// console.log(locId)
	const response = await fetch(`/api/favorites/${locId}`, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(locId)
	});
	let data = await response.json()
	// console.log(data)
	if(response.ok) {
		dispatch(actionAddFav(data))
	}
	return data
}
export const RemoveFavorite = (locationId) => async (dispatch) => {
	// console.log(typeof Number(locationId))
	let locId = Number(locationId)
	// console.log(locId)
	const response = await fetch(`/api/favorites/${locId}`, {
		method: 'DELETE',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(locId)
	});
	let data = await response.json()
	// console.log(data)
	if(response.ok) {
		dispatch(actionRemoveFav(data))
	}
	return data
}


export const changeProfilePic = (imgData) => async (dispatch) => {
    // console.log(imgData.image)
    const formData = new FormData();
    // console.log(formData)
    formData.append("image", imgData.image);
    // formData["image"] = imgData.image;
    // console.log('formData', formData)
	const response = await fetch("/api/users/profile-pic", {
		method: 'POST',
		body: formData
	});
	// console.log(response)

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
	// console.log(email)
	// console.log(password)
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
	// console.log(firstName, lastName, city, state, email, password)
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
		dispatch(CreateFav());
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
			newState.user.favorites = action.payload
			return newState
		case REMOVE_FAVORITE:
			newState = {...state, user: {...state.user}}
			newState.user.favorites = action.payload
			return newState
		default:
			return state;
	}
}
