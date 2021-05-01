import React, {createContext, useContext, useEffect, useState} from "react";

export const appContext = createContext(null)
export const createStore = (reducer, initState) => {
  store.reducer = reducer;
  store.state = initState;
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
  state: undefined,
  reducer: undefined,
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
export const connect = (mapStateToProps, mapDispatchToProps) => (Component) => (props) => {
    const {state, setState, subscribe} = useContext(appContext);
    const dispatch = (action) => {
      setState(store.reducer(state, action));
    }
    const data = mapStateToProps ? mapStateToProps(state) : {state};
    const disaptcher = mapDispatchToProps ? mapDispatchToProps(dispatch) : {dispatch};
    useEffect(() => subscribe(() => {
      const newData = mapStateToProps ? mapStateToProps(store.state) : {state: store.state};
      if (changed(data, newData)) {
        update({});
      }
    }), [mapStateToProps])
    const [, update] = useState({});
    return <Component dispatch={dispatch} state={state} {...props} {...data} {...disaptcher} />
  }