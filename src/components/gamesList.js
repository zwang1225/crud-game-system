import React from 'react';
import GameCard from './gameCard';

const GamesList = ({games}) => {
    const emptyMessage = (
        <p>there are no games yet.</p>
    );

    const gamesList = (
        <div className='ui four cards'>
            { games.map(game => <GameCard game={ game } key={ game._id } />) }
        </div>
    );

    return(
        <div>
            { games.length === 0? emptyMessage: gamesList }
        </div>
    )
}

export default GamesList;