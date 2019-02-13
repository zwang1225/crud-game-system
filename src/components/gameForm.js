import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { createGame } from '../actions/index'; 
import { Redirect } from 'react-router-dom';

class GameForm extends Component{
    constructor(props){
        super(props);
        this.state={
            title: '',
            cover: '',
            errors: {},
            isLoading: false,
            done: false
        }
    }

    handleChange(e){
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({
              [e.target.name]: e.target.value,
              errors
            });
          } else {
            this.setState({
              [e.target.name]: e.target.value,
            });
          }
    }

    handleSubmit(e){
        e.preventDefault();

        let errors = {};
        if(this.state.title === '') errors.title='title cannot be empty';
        if(this.state.cover === '') errors.cover='title cannot be empty';
        this.setState({errors});

        const isValid = Object.keys(errors).length === 0;
        if(isValid){
            const { title, cover } = this.state;
            this.setState({
                isLoading: true
            });
            this.props.createGame({title, cover}).then(
                () => { this.setState({done: true}) },
                (err) => {
                    return err.response.json().then(({ errors }) => { this.setState({ errors, isLoading: false }) })
                }
              )
        };
    }

    render(){
        const imgWithUrl = <img src={this.state.cover} alt='cover' className='ui small bordered image'></img>;
        const imgWithoutUrl = '';
        const form = (
            <form className = {classnames('ui form', {loading: !!this.state.isLoading})} onSubmit={this.handleSubmit.bind(this)}>
                <h1>Add new game</h1>
                { !!this.state.errors.global && <div className="ui negative message">{ this.state.errors.global }</div> }
                <div className={classnames('field', {error: !!this.state.errors.title})}>
                    <label htmlFor='title'>title</label>
                    <input 
                        type='text'
                        name='title'
                        value={this.state.title}
                        onChange={this.handleChange.bind(this)}
                    />
                    <span>{this.state.errors.title}</span>
                </div>
                <div className={classnames('field', {error: !!this.state.errors.cover})}>
                    <label htmlFor='cover'>cover</label>
                    <input 
                        type='text'
                        name='cover'
                        value={this.state.cover}
                        onChange={this.handleChange.bind(this)}
                    />
                    <span>{this.state.errors.cover}</span>
                </div>
                <div className='feild'>
                    {this.state.cover? imgWithUrl: imgWithoutUrl}
                </div>
                <div className='feild'>
                    <button className='ui primary button'>Save</button>
                </div>
            </form>
        )
        return(
            <div>
                { this.state.done ? <Redirect to='/api/games'/> : form }
            </div>
        )
    }
}

export default connect(null, { createGame })(GameForm);