import { combineReducers } from 'redux';
import { reducer as filter } from './modules/filter';

const reducer = combineReducers({ filter });

export default reducer;