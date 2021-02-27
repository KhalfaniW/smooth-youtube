import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import ping, { pingEpic } from './ping';
import users, { fetchUserEpic } from './users';

export const rootEpic = combineEpics(
    pingEpic,
    fetchUserEpic
);

export const rootReducer = combineReducers({
    ping,
    users
});
