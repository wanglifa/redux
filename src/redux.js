import React, {createContext, useContext, useEffect, useState} from "react";
let state = undefined;
let reducer = undefined;
let listener = [];
let setState = (newState) => {
  state = newState
  listener.map(fn => fn())
}

export const appContext = createContext(null)
export const createStore = (_reducer, initState) => {
  reducer = _reducer;
  state = initState;
  return store;
}
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
  getState() {
    return state;
  },
  dispatch(action) {
    setState(reducer(state, action));
  },
  subscribe(fn) {
    listener.push(fn);
    return () => {
      let index = listener.indexOf(fn);
      listener.splice(index, 1);
    }
  },
}
let dispatch = store.dispatch;
const prevDispatch = dispatch;
dispatch = (action) => {
  if (action instanceof Function) {
    action(dispatch)
  } else {
    prevDispatch(action)
  }
}
export const connect = (mapStateToProps, mapDispatchToProps) => (Component) => (props) => {
    const data = mapStateToProps ? mapStateToProps(state) : {state};
    const disaptcher = mapDispatchToProps ? mapDispatchToProps(dispatch) : {dispatch};
    useEffect(() => store.subscribe(() => {
      const newData = mapStateToProps ? mapStateToProps(state) : {state};
      if (changed(data, newData)) {
        update({});
      }
    }), [mapStateToProps])
    const [, update] = useState({});
    return <Component dispatch={dispatch} state={state} {...props} {...data} {...disaptcher} />
  }

export const Provider = ({store, children}) => {
    return (
      <appContext.Provider value={store}>
        {children}
      </appContext.Provider>
    )
}