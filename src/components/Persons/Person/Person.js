import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Auxiliary from '../../../hoc/Auxiliary';
import withClass from '../../../hoc/withClass';
import classes from './Person.css';
import AuthContext from '../../../context/auth-context';

class Person extends Component  {
    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    }

    /*Another way of using context */
    static contextType = AuthContext;

    componentDidMount() {
        /*Fist way of declaring focus on the element ref */
        //this.inputElementRef.focus();
        /*Another way of declaring focus on the element ref via constructor */
        this.inputElementRef.current.focus();
        console.log(this.context.AuthContext)
    }


    render() {
        console.log('[Person.js] rendering...')
        return (
            <Auxiliary>
                {this.context.authenticated ? <p>Authenticated!</p> : <p>Please log in!</p>}
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input 
                    type="text" 
                    /* First Way of using element references */
                    //ref={(inputEl) => {this.inputElementRef = inputEl}}
                    /* Another Way of using element references */
                    ref={this.inputElementRef}
                    onChange={this.props.changed} 
                    value={this.props.name} />
            </Auxiliary>

        )
    }

}

/* 
    1.) To install Prop Types - npm install --save prop-types  
    2.) To install Prop Types - import PropTypes from 'prop-types';
    3.) To use Prop types:
                            Person.propTypes = {
                            click: PropTypes.func,
                            name: PropTypes.string,
                            age: PropTypes.number,
                            changed: PropTypes.func,
                        };
    4.) Note: this will set the type of props being used.
*/
Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func,
};

export default withClass(Person, classes.Person);