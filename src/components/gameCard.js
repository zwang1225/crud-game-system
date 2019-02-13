import React from 'react';
import PropTypes from 'prop-types';

const GameCard = ({ game }) =>{
    return(
        <div className='ui card'>
            <div className='ui Medium image'>
                    <img src={ game.cover } alt='game cover' />
            </div>
            <div className='content'>
                <div className='header'>{ game.title }</div>
            </div>
        </div>
    )
}

GameCard.propTypes = {
    game: PropTypes.object.isRequired
}

export default GameCard;