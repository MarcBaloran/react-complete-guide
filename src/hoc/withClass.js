import React from 'react';

/* First way to creating a higher order component */
// const withClass = (props) => (
//     <div className={props.classes}>{props.children}</div>
//     );

/* Another way to creating a higher order component */
const withClass = (WrappedComponent, className) => {
    return props => (
        <div className={className}>
            <WrappedComponent {...props}/>
        </div>
    );
};



export default withClass