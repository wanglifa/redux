import React from 'react';
import {appContext, store, connect} from "./redux";


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
const User = connect((state) => {
  return {user: state.user}
})(({user}) => {
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
})(({dispatch, name}) => {
  const onChange = (event) => {
    dispatch({type: 'updateUser', payload: {name: event.target.value}})
  }
  return (
    <div>
      <input value={name} onChange={onChange}/>
    </div>
  )
})

export default App;
