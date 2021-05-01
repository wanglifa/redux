import React, {createContext, useState, useContext, useEffect} from 'react';

const appContext = createContext(null)
const store = {
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
const connect = (Component) => {
  const Wrapper = () => {
    const {state, setState, subscribe} = useContext(appContext);
    useEffect(() => {
      subscribe(() => {
        update({});
      })
    }, [])
    const [, update] = useState({});
    const dispatch = (action) => {
      setState(reducer(state, action));
    }
    return <Component dispatch={dispatch} state={state}/>
  }
  return Wrapper;
}

function App() {
  return (
    <appContext.Provider value={store}>
      <大老婆/>
      <二老婆/>
      <三老婆/>
    </appContext.Provider>
  );
}

const 大老婆 = () => {
  return <div>大老婆</div>;
}
const 二老婆 = () => {
  return (
    <div>
      <div>二老婆</div>
      <User/>
    </div>
  );
}
const 三老婆 = () => {
  return (
    <div>
      <div>三老婆</div>
      <UserModify />
    </div>
  );
}
const User = connect(() => {
  const {state} = useContext(appContext);
  return (
    <div>
      {state.user.name}
    </div>
  )
})
const UserModify = connect(({dispatch, state}) => {
  const onChange = (event) => {
    dispatch({type: 'updateUser', payload: {name: event.target.value}})
  }
  return (
    <div>
      <input value={state.user.name} onChange={onChange}/>
    </div>
  )
})

export default App;
