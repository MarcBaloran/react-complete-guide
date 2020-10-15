import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Auxiliary from '../hoc/Auxiliary';
import AuthContext from '../context/auth-context';

class App extends Component {

  constructor(props) {
    super(props);
    console.log('[App.js] constructor')
    /* Old version or setting state */
    // this.state = {
    //   persons: [
    //     { id: 'asfa1', name: 'Max', age: 28 },
    //     { id: 'vasdf1', name: 'Manu', age: 29 },
    //     { id: 'asdf11', name: 'Stephanie', age: 26 }
    //   ],
    //   otherState: 'some other value',
    //   showPersons: false
    // }
  }
  /* New version or setting state */
  state = {
    persons: [
      { id: 'asfa1', name: 'Max', age: 28 },
      { id: 'vasdf1', name: 'Manu', age: 29 },
      { id: 'asdf11', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false,
  }

  /* Life cycle hook runs after constructor */
  // static getDerivedStateFromProps(props, state) {
  //   console.log('[App.js] getDerivedStateFromProps')
  //   return state;
  // }

  /* Life cycle hook runs after Render */
  componentDidMount() {
    console.log('[App.js] componentDidMount')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate')
    return true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[App.js] componentDidUpdate')
    console.log(snapshot)
  }

  loginHandler = () => {
    this.setState({authenticated: true});
  };

  nameChangedHandler = ( event, id ) => {
    const personIndex = this.state.persons.findIndex( p => {
      return p.id === id;
    } );

    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState((prevState, props) => {
      return { 
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      };
    });
  }

  deletePersonHandler = ( personIndex ) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice( personIndex, 1 );
    this.setState( { persons: persons } );
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState( { showPersons: !doesShow } );
  }

  /* Life cycle hook runs after getDerivedStateFromProps */
  render () {
    console.log('[App.js] render')
    let persons = null;
    

    if ( this.state.showPersons ) {
      persons = <Persons 
            persons={this.state.persons}
            clicked={this.deletePersonHandler} 
            changed={this.nameChangedHandler}
            isAuthenticated={this.state.authenticated}/>
    }

    const assignedClasses = [];
    if ( this.state.persons.length <= 2 ) {
      assignedClasses.push( classes.red ); // classes = ['red']
    }
    if ( this.state.persons.length <= 1 ) {
      assignedClasses.push( classes.bold ); // classes = ['red', 'bold']
    }

    return (
      <Auxiliary>
        <button onClick={() => {
          this.setState({showCockpit: false});
        }}>Remove Cockpit</button>
        <AuthContext.Provider 
          value={{
          authenticated: this.state.authenticated,
          login: this.loginHandler
          }}>
        { this.state.showCockpit ? (
          <Cockpit 
          title={this.props.appTitle} 
          showPersons={this.state.showPersons} 
          personsLength={this.state.persons.length} 
          click={this.togglePersonsHandler}
          login={this.loginHandler} />
          ) : null}
        {persons}
        </AuthContext.Provider>
      </Auxiliary>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default withClass(App, classes.App);
