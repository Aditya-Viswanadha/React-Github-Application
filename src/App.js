import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const Card = (props) => {
  return(
    <div style={{display:'inline-block', marginLeft: 10}}>
      <div><img width="100" src={props.avatar_url} /></div> 
      <div>{props.name}</div> 
    </div>
  );
};

class Forms extends Component {
  state= {inputname: ''};
  handleSubmission= (event)=> {
    event.preventDefault();
    console.log("Form Submitted", this.state.inputname);
    axios.get(`https://api.github.com/users/${this.state.inputname}`)
      .then(resp => {
        this.props.onSubmit(resp.data);
        this.setState({inputname: ''}) 
      });
};

  render(){
    return(
      <form onSubmit={this.handleSubmission} >
      <input type="text" 
      value={this.state.inputname}
      onChange={(event)=> this.setState({inputname: event.target.value})}
      placeholder="Github username" required/>
      <button type="submit">Add Card</button>
      </form>
     );
  }
};

const CardList = (props) => {
  return(
    <div>
      {props.cards.map(card => <Card key={card.id} {...card} />) }
    </div>
  );
};

class App extends Component {
  state = { 
    cards:[ 
    ]
  };

  addNewCard = (cardInfo) => {
    let flag = 0;
    for(let i of this.state.cards){
      if(i.id == cardInfo.id){flag=1;}
    }
    if(flag == 0){
      this.setState(prevState => ({
      cards: prevState.cards.concat(cardInfo)
      }));
    }
    else{alert("User card " +cardInfo.name + " already added!");}
  };
   
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Aditya Viswanadha</h1>
        </header>
        <p className="App-intro">
          GitHub cards
        </p>
      <Forms onSubmit={this.addNewCard}/>
      <CardList cards={this.state.cards}/>
      </div>
    );
  }
}
export default App;
