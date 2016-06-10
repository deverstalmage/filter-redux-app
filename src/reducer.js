import { combineReducers } from 'redux';
import { reducer as product } from 'modules/product';

const reducer = combineReducers({ product });

export default reducer;