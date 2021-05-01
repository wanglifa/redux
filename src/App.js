import React from 'react';
import {appContext, connect, createStore} from "./redux";
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
const store = createStore(reducer, {
  user: {
    name: 'lifa',
    age: 18
  }
})
const userSelector = state => {
  return {user: state.user}
}
// 提取的写 user 的接口
const userDispatcher = dispatch => {
  return {
    updateUser: (attrs) => dispatch({type: 'updateUser', payload: attrs})
  }
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
      <UserModify a={1}/>
    </div>
  );
}
const User = connect(userSelector)(({user}) => {
  return (
    <div>
      {user.name}
    </div>
  )
})
const UserModify = connect(state => {
  return {
    name: state.user.name
  }
}, userDispatcher)(({updateUser, name}) => {
  const onChange = (event) => {
    updateUser({name: event.target.value})
  }
  return (
    <div>
      <input value={name} onChange={onChange}/>
    </div>
  )
})

export default App;
