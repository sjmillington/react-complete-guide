import React, { Fragment, useRef, useEffect } from 'react'
import classes from './Person.css'
import withClass from '../../../hoc/WithClass'
import PropTypes from 'prop-types'
import AuthContext from '../../../context/auth-context'

//this is a functional component, rather than a class based one.
const person = (props) => {
  //Will be caught by ErrorBoundary in production mode ONLY.
  // const rnd = Math.random();

  // if(rnd > 0.7){
  //   throw new Error('Something went wrong');
  // }
  console.log('[Person.js] rendering...')

  const inputElementRef = useRef(null);

  //use effect fires AFTER the first JSX has been returned.
  useEffect(() => {

    inputElementRef.current.focus();

  }, [])

  

  return (
     // <div key="hello" className={classes.Person}>
      <Fragment> 
        <AuthContext.Consumer>
          {(context) => context.authenticated ? <p> Authenticated! </p> : <p> Please log in! </p>}
        </AuthContext.Consumer>
        <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
        <p >{props.children}</p>
        <input 
          type="text" 
          onChange={props.changed} 
          value={props.name}
          ref={inputElementRef}
          
          />
      </Fragment>
    //  </div>

  );
}

person.propTypes = {
   name: PropTypes.string,
   click: PropTypes.func,
   age: PropTypes.number,
   changed: PropTypes.func,
   isAuth: PropTypes.bool
};

export default withClass(person, classes.Person)
