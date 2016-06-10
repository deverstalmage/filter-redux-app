import { combineReducers } from 'redux';

import { reducer as product } from './modules/product';
import { reducer as filter } from './modules/filter';

const reducer = combineReducers({ product });

export default reducer;