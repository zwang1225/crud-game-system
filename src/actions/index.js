import { SET_GAMES, ADD_GAME } from '../constants/constants';

export const setGames = (games) => {
  return {
    type: SET_GAMES,
    games
  }
};

export const fetchGames = () => {
  return dispatch => {
    fetch('/api/games')
      .then(res => res.json(res))
      .then(data => dispatch(setGames(data.games)))
  }
};

const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response
    throw error;
  }
}

export const addGame = (game)=>{
  return {
    type: ADD_GAME,
    game
  }
}

export const createGame = (data) => {
  return dispatch => {
    return fetch('/api/games', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
    }).then(handleResponse)
      .then((data)=>{
        return dispatch(ADD_GAME(data.game))
      })
  }
};