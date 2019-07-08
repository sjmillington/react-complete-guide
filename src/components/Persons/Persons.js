import React, { PureComponent } from 'react';
import Person from './Person/Person'


class Persons extends PureComponent{

      // static getDerivedStateFromProps(props, state){

      //       console.log('[Persons.js] getDerivedStateFromProps')

      //       return state;
      // }

      // instead of this, extend PureComponent. - already implements shouldComponentUpdate with complete props check.
      // shouldComponentUpdate(nextProps, nextState){
      //       console.log('[Persons.js] shouldComponentUpdate' )
      //       return this.props.persons !== nextProps.persons || 
      //              nextProps.changed !== this.props.changed || 
      //              nextProps.clicked !== this.props.clicked; 
      // }

      getSnapshotBeforeUpdate(prevProps, prevState){
            console.log('[Persons.js] getSnapshotBeforeUpdate');
            return null;
      }

      componentDidUpdate(){
            console.log('[Persons.js] componentDidUpdate');
      }

      componentWillUnmount(){
            console.log('[Persons.js] componentWillUnmount')
      }

      
      


      render(){
            console.log('[Persons.js] render...');
            return this.props.persons.map((el, index) => {
            
             //error boundaries should wrap the component which might fail at runtime.
             return <Person 
                   name={el.name} 
                   age={el.age}
                   key={el.id}
                   changed={(event) => this.props.changed(event, el.id)}
                   click={() => this.props.clicked(index)}
                    />
             });         
      }
       

};

export default Persons;