import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Home from '../Route/Home';
import Search from '../Route/Search';
import TV from '../Route/TV';
import Header from './Header';
import Detail from '../Route/Detail';

export default () => (
    <Router>
        <>
        <Header />
        <Switch> {/* 이게 있어야 한번에 오직 하나의 Route만 Rendering 된다. ->  이게 없으면 어떤 주소로 가던 redirect 되어버리고 만다*/}
            <Route path='/' exact component={Home} />
            <Route path='/tv' component={TV} />
            <Route path='/search' component={Search} />
            <Route path='/movie/:id' component={Detail} />
            <Route path='/show/:id' component={Detail} />
            <Redirect from='*' to='/' /> {/*다른 주소로 갔을 때 /으로 돌아오도록 한다*/}
        </Switch>
        </>
    </Router>
);