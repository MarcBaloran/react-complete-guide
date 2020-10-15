import React, {useEffect, useRef, useContext} from 'react';
import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context';

const cockpit = (props) => {
    /*First way of creating element ref via functional components */
    const toggleBtnRef = useRef(null);
    /*Function component of declaring context*/
    const authContext = useContext(AuthContext);
    
    /* Function component Life cycle hook === ComponentDidMount & ComponentDidUpdate*/
    useEffect(() => {
        console.log('[cockpit.js] useEffect')
        toggleBtnRef.current.click();
        // const timer = setTimeout(() => {
        //     alert('Save data to cloud!');
        // }, 1000);
        
        return () => {
            // clearTimeout(timer);
            console.log('[cockpit.js] clean up work in useEffect')
        };

    }, []); /* <--- adding an empty array will run useEffect once. 
        Unless you want to run useEffect for a certain change of state you can insert that in the empty array.
        So that the useEffect will only run when there is a change on the entered object*/
    useEffect(() => {
        console.log('[cockpit.js] 2nd useEffect')
        
        return () => {
            console.log('[cockpit.js] 2nd clean up work in useEffect')
        };

    },);


    const assignedClasses = [];
    let btnClass = '';

    if(props.showPersons) {
        btnClass = classes.Red;
    }

    if ( props.personsLength <= 2 ) {
      assignedClasses.push( classes.red ); // classes = ['red']
    }
    if ( props.personsLength <= 1 ) {
      assignedClasses.push( classes.bold ); // classes = ['red', 'bold']
    }

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join( ' ' )}>This is really working!</p>
            <button
              ref={toggleBtnRef}
              className={btnClass}
              onClick={props.click}>Toggle Persons
            </button>
            <button onClick={authContext.login}>Log in</button>
        </div>
    );
}

export default React.memo(cockpit);