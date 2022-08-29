const redux = require('redux');
const createstore = redux.createStore;

const applyMiddleare = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

const BUY_CAKE = 'BUY_CAKE';
const SPOIL_CAKE = 'SPOIL_CAKE';

// ACTION CREATERS
const buyCake = () => {
    return {
        type: BUY_CAKE,
        info: 'Customer bought a cake!'
    }
}

const spoilCake = () => {
    return {
        type: SPOIL_CAKE,
        info: 'One cake has already spoiled!'
    }
}

// Initial State for the store
const initialState = () => {
    return {
        numberOfCakes: 10,
        spoiledCakes: 0
    }
}

// Reducer for the store
const reducer = (previousState= initialState(), action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                ...previousState,
                ['numberOfCakes']: previousState.numberOfCakes - 1
            }
        case SPOIL_CAKE:
            return {
                ...previousState,
                ['spoiledCakes']: previousState.spoiledCakes + 1
            }
        default: previousState
    }
}

// Store creater
const store = createstore(reducer, applyMiddleare(logger));
console.log('Initial Store -->', store.getState());
// Subscribe store
const unsubscribe = store.subscribe(() => {});
// Dispatch actions on store
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(spoilCake());
store.dispatch(spoilCake());

// Invoke subscriber
unsubscribe();