import { SET_GAMES ,ADD_GAME } from '../constants/constants';

const games = (state = [], action = {}) => {
  switch(action.type) {
    case SET_GAMES:
      return action.games;
    case ADD_GAME:
      return state=[
        ...state,
        action.game
      ]
    default: return state;
  }
}

export default games;