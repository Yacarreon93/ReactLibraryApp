import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

import Main from './containers/Main';
import NewBook from './containers/NewBook'
import BookDetail from './containers/BookDetail'
import Navigator from './components/Navigator'

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <div className="container">
    <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
        <div>
          <div className="header clearfix">
            <Navigator />
            <h3 className="text-muted"><Link to="/">The library</Link></h3>
          </div>
          <Switch>
            <Route path="/book/new" component={NewBook} />
            <Route path="/book/detail" component={BookDetail} />
            <Route path="/" component={Main} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
    <footer className="footer">
      <p>© Yasser Carreon</p>
    </footer>
  </div>
  , document.getElementById('root'));
