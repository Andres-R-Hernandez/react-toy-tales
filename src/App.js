import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    display: false,
    toys: []
  }

  componentDidMount() {
    fetch(`http://localhost:3000/toys`)
    .then(resp=>resp.json())
    .then(toyData=>{
      this.setState({
        toys: toyData
      })
    })
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  addToy = (toy) => {
    let newToy = {
      name: toy.name,
      image: toy.image,
      likes: 0
    }
    let reqPkg = {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(newToy)
    }
    fetch(`http://localhost:3000/toys`,reqPkg)
    .then(resp=>resp.json())
    .then(toy=>{
      this.setState({
        toys: [...this.state.toys, toy]
      })
      let newBoolean = !this.state.display
      this.setState({
        display: newBoolean
      })  
    })
  }

  donateToy = (toyID) => {
    let reqPkg = {
      method: 'DELETE',
      headers: {'Content-Type':'application/json'},
    }
    fetch(`http://localhost:3000/toys/${toyID}`,reqPkg)
    .then(resp=>resp.json())
    .then(()=>{
      this.setState({
        toys: this.state.toys.filter(toy=>toy.id!==toyID)
      })
    })
  }

  likeToy = (toyID, prevLikes) => {
    let newLikes = {
      likes: prevLikes+1,
    }
    let reqPkg = {
      method: 'PATCH',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(newLikes)
    }
    fetch(`http://localhost:3000/toys/${toyID}`,reqPkg)
    .then(resp=>resp.json())
    .then(toy=>{
      let newtoys = this.state.toys
      newtoys.map(toy=>{
        if (toy.id===toyID){
          toy.likes = toy.likes + 1
          return toy
        } else {
          return toy
        }
      })
      this.setState({
        toys: newtoys
      })
    })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm addToy={this.addToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer likeToy={this.likeToy} donateToy={this.donateToy} toys={this.state.toys}/>
      </>
    );
  }

}

export default App;
