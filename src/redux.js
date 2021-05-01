import React, {createContext, useContext, useEffect, useState} from "react";

export const appContext = createContext(null)
const changed = (oldState, newState) => {
  let changed = false;
  for (let key in oldState) {
    if (oldState[key] !== newState[key]) {
      changed = true;
    }
  }
  return changed;
};
export const store = {
  state: {
    user: {
      name: 'lifa',
      age: 18
    }
  },
  listener: [],
  subscribe(fn) {
    store.listener.push(fn);
    return () => {
      let index = store.listener.indexOf(fn);
      store.listener.splice(index, 1);
    }
  },
  setState(newState) {
    store.state = newState
    store.listener.map(fn => fn())
  }
}
const reducer = (state, {type, payload}) => {
  if (type === 'updateUser') {
    return {
      ...state,
      user: {
        ...state.user,
        ...payload
      }
    }
  } else {
    return state;
  }
}
export const connect = (mapStateToProps) => (Component) => (props) => {
    const {state, setState, subscribe} = useContext(appContext);
    const data = mapStateToProps ? mapStateToProps(state) : {state};
    useEffect(() => subscribe(() => {
      const newData = mapStateToProps ? mapStateToProps(store) : {state: store.state};
      if (changed(data, newData)) {
        update({});
      }
    }), [mapStateToProps])
    const [, update] = useState({});
    const dispatch = (action) => {
      setState(reducer(state, action));
    }
    return <Component dispatch={dispatch} state={state} {...props} {...data} />
  }