
import React,{useReducer, useState} from 'react';
const Context = React.createContext();
export const Provider = Context.Provider;
export const consumer=Context.Consumer;


function reducer(state, action) {
	state={loading: false, isAuthorized: false, userData: {}};
	state[`${action.type}`] = action.value;
    return {...state};
  }


function ContextSetter(props) {
  const initialState={ loading: false, isAuthorized: false, userData: {} }
	const [state, dispatch] = useReducer(reducer,initialState); 
	return (
		<Provider
	  value={{
      state,dispatch
      }}>
			{props.children}
		</Provider>
	);
};

export default Context;
export { ContextSetter };
