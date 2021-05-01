import React from 'react';
import {appContext, connect, createStore, Provider} from "./redux";
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
    <Provider store={store}>
      <大老婆/>
      <二老婆/>
      <三老婆/>
    </Provider>
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
const ajax = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({data: {name: '3秒后的lifa'}})
    }, 3000)
  })
}
const User = connect(userSelector)(({user}) => {
  return (
    <div>
      {user.name}
    </div>
  )
})
const fetchUser = (dispatch) => {
  ajax('/user').then(response => {
    dispatch({type: 'updateUser', payload: response.data})
  })
}
const UserModify = connect(state => {
  return {
    name: state.user.name
  }
}, null)(({dispatch, name}) => {
  const onClick = () => {
    dispatch({type: 'updateUser', payload: ajax('/user').then(res => res.data)})
  }
  return (
    <div>
      <div>User: {name}</div>
      <button onClick={onClick}>异步获取 user</button>
    </div>
  )
})

export default App;
