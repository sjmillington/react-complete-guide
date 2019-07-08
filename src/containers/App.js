import React, { Component, Fragment } from 'react'
import Persons from '../components/Persons/Persons'
import Cockpit from '../components/Cockpit/Cockpit'
import classes from './App.css'
import withClass from '../hoc/WithClass'
import AuthContext from '../context/auth-context'

class App extends Component {

  constructor(props){
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    persons: [
      { id: 'aees213213123f1', name: 'Max', age: 28 },
      { id: 'aees213sadasdf1', name: 'Sam', age: 25 },
      { id: 'aeesadasdsad3f1', name: 'Sofi', age: 25 }
    ],
    showPersons: false,
    showCockput: true,
    changeCounter: 0,
    authenticated: false
  }

  static getDerivedStateFromProps(props, state){
    console.log('[App.js] getDerivedStateFromProps');
    console.log(props);
    return state;
  }

  componentDidMount(){
    console.log('[App.js] componentDidMount()');
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log('[App.js] shouldComponentUpdate()')

    return true;
  }

  componentDidUpdate(){
    console.log('[App.js] componentDidUpdate()')
  }

  togglePersonsHandler = () => this.setState({showPersons: !this.state.showPersons})

  nameChangedHandler = (event, personId) => {

    const personIndex = this.state.persons.findIndex(p => p.id === personId);

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;  

    const persons = [...this.state.persons]

    persons[personIndex] = person;

    //when refering to previous state in a set state, need to refer to prevState. 
    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1}
      }
    )

  }

  deletePersonHandler = (index) => {
      const persons = [...this.state.persons];
      persons.splice(index, 1);
      this.setState({persons: persons})
  }

  loginHandler = () => {
    this.setState({authenticated: true})
  }

  static context = AuthContext;



  render() {
    console.log(this.context.authenticated);
    console.log('[App.js] render');

    let persons = null;
  
    if(this.state.showPersons){
      persons = <Persons 
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
          />
    }

    return (
      //must all be wrapped into one root per component.
        //<WithClass classes={classes.App}> 
        <Fragment>
          <button onClick={() => {this.setState({showCockput: false})}}>Remove Cockpit</button>
          <AuthContext.Provider value={{authenticated: this.state.authenticated, login: this.loginHandler}}>
            {this.state.showCockput === true ?
            <Cockpit 
              title={this.props.appTitle}
              personsLength={this.state.persons.length} 
              showPersons={this.state.showPersons} 
              clicked={this.togglePersonsHandler}
              ></Cockpit>
            : null }
            {persons} 
          </AuthContext.Provider>
        </Fragment>      
        //</WithClass>
    );
    // this is happening internally... -> JSX compiles to :
    // return React.createElement('div', ....
  }


}

export default withClass(App, classes.App);
