import { combineReducers } from 'redux';

import polls from './polls';
import owners from './owners';
import visiblePolls from './visible-polls';
import fetchingStates from './fetching-states';

export default combineReducers({
  fetchingStates,
  polls,
  owners,
  visiblePolls,
});
