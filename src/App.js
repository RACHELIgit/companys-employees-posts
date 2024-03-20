import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UsersTable from './components/UserTable/UsersTable';
import UserPosts from './components/UserPost/UserPosts';

const App = () => {
  return (
    <Router basename="/companys-employees-posts">
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <Switch>
            <Route path="/" exact component={UsersTable} />
            <Route path="/user/:userId" component={UserPosts} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;