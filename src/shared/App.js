
import './App.css';
import React from "react";

import {BrowserRouter, Route} from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';

import PostList from "../pages/PostList";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PostWrite from '../pages/PostWrite';
import PostDetail from '../pages/PostDetail';

import Header from "../components/Header";
import Permit from './Permit';
import {Grid, Button} from "../elements";

import {actionCreators as userActions} from "../redux/modules/user";
import {useDispatch} from "react-redux";

import {apiKey} from "./firebase";

function App() {
  const dispatch = useDispatch();
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key)? true : false;

  //componentdidmount와 componentdidupdate를 동시에 수행하는 애
  // 2번째 인자인 []안에 넣어주는 값이 바뀔 때 실행될 수 있음.
  // []만 써주면 componentdidmount만 해주는 것과 같음. 처음 한 번만 실행.
  React.useEffect(() => {
    if(is_session){
      dispatch(userActions.loginCheckFB());
    }
  }, []);

  return (
    <React.Fragment>
      <Grid>
        <Header></Header>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup}/>
          <Route path="/write" exact component={PostWrite}/>
          <Route path="/post/:id" exact component={PostDetail}/>
        </ConnectedRouter>
      </Grid>
      <Permit>
        <Button is_float text="+" _onClick={() => {history.push("/write")}}></Button>
      </Permit>
    </React.Fragment>
  );
}

export default App;
