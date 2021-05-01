import React, {createContext, useState, useContext} from 'react';

const appContext = createContext(null)

function App() {
  const [appState, setAppState] = useState({
    user: {
      name: 'lifa',
      age: 18
    }
  })
  return (
    <appContext.Provider value={{appState, setAppState}}>
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
      <UserModify/>
    </div>
  );
}
const User = () => {
  const {appState} = useContext(appContext);
  return (
    <div>
      {appState.user.name}
    </div>
  )
}
const UserModify = () => {
  const {appState, setAppState} = useContext(appContext);
  const onChange = (event) => {
    setAppState({
      user: {
        ...appState.user,
        name: event.target.value,
      },
    });
  }
  return (
    <div>
      <input value={appState.user.name} onChange={onChange}/>
    </div>
  )
}

export default App;
