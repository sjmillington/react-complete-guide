import React, { useEffect } from 'react';
import classes from './Cockpit.css'
import AuthContext from '../../context/auth-context'

const cockpit = (props) => {

    useEffect(() => {
      console.log('[Cockpit.js] useEffect')
      //Can send http stuff
      setTimeout(() => {
         //alert('Saved data to cloud')
         console.log('[Cockpit.js] useEffectCloudFunctionCalled')
      } ,1000);
      return () => {
        console.log('[Cockput.js] useEffectCleanup')
      }
    }); //only fires when the [props.persons] state changes. If [] is empty, only fire once..

    let optClasses = [];
    let btnClass = '';

    if(props.personsLength <= 2){
      optClasses.push( classes.red );
    }

    if(props.personsLength <= 1){
      optClasses.push( classes.bold );
    }

    optClasses = optClasses.join(' ')

    if(props.showPersons){
        btnClass = classes.Red;
    }

  return(
      <div className={classes.Cockpit}>
          <h1>{props.title}</h1>
        <p className={optClasses}> CLICK THE BUTTON!</p>
        <button 
            className={btnClass}
            onClick={props.clicked} 
            >Toggle persons
        </button>
        <AuthContext.Consumer>
          {(context) => <button onClick={context.login}>Log in</button>}
        </AuthContext.Consumer>
 
      </div> 
  );
}


export default React.memo(cockpit);