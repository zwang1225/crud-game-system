import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchGames } from '../actions/index';
import GamesList from './gamesList';

class GamesPage extends Component{
    componentDidMount(){
        this.props.fetchGames();
    }

    render(){
        return(
        <div>
            <GamesList games={this.props.games} />
        </div>
        )
    }
}

GamesPage.propTypes = {
    games: PropTypes.array.isRequired,
    fetchGames: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    games: state.games
});

export default connect(mapStateToProps, { fetchGames })(GamesPage);