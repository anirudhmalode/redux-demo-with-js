const redux = require('@reduxjs/toolkit');
const reduxThunk = require('redux-thunk');
const thunkMiddleware = reduxThunk.default;
const axios = require('axios');
const configureStore = redux.configureStore;
const applyMiddleware = redux.applyMiddleware

// Fetching users data asynchronously.

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED';
const FETCH_USERS_SUCCEDED = 'FETCH_USERS_SUCCEDED';
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';

const initialState = {
    loading: false,
    users: [],
    error: ''
}

// Actions creator
const fetchUserRequested = () => {
    return {
        type: FETCH_USERS_REQUESTED
    }
}

const fetchUserSucceded = (users) => {
    return {
        type: FETCH_USERS_SUCCEDED,
        payload: users
    }
}

const fetchUserFailed = (error) => {
    return {
        type: FETCH_USERS_FAILED,
        payload: error
    }
}

// Reducers
const reducer = (previousState = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUESTED:
            return {
                ...previousState,
                loading: true
            }
        case FETCH_USERS_SUCCEDED:
            return {
                ...previousState,
                loading: false,
                users: action.pyload
            }
        case FETCH_USERS_FAILED:
            return {
                ...previousState,
                loading: false,
                error: action.pyload
            }
        default:
            return previousState;
    }
}

// Async action creator
const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUserRequested());
        axios.get(`https://jsonplaceholder.typicode.com/users`).then((response) => {
            const users = response.data.map(user => user.id);
            dispatch(fetchUserSucceded(users));
        }).catch((error) => {
            dispatch(fetchUserFailed(error));
        })
    }
}

const store = configureStore({ reducer }, applyMiddleware(thunkMiddleware));
store.subscribe(() => console.log('Updated Data -->', store.getState()));

store.dispatch(fetchUsers());