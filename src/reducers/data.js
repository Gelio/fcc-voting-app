import { combineReducers } from 'redux';

import polls from './polls';
import owners from './owners';
import visiblePolls from './visiblePolls';
import fetchingStates from './fetchingStates';

export default combineReducers({
  fetchingStates,
  polls,
  owners,
  visiblePolls
});
