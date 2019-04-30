import React, { Fragment } from 'react';
import withRoot from './withRoot';

import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import App from './pages/App';
import Profile from './pages/Profile';
import Header from './components/Shared/Header';

const Root = () => (
  <Query query={ME_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      const currentUser = data.me;

      //   return <div>{JSON.stringify(data)}</div>;
      return (
        <Router>
          <Fragment>
            <Header currentUser={currentUser} />

            <Switch>
              <Route path="/profile/:id" component={Profile} />
              <Route exact path="/" component={App} />
            </Switch>
          </Fragment>
        </Router>
      );
    }}
  </Query>
);

const ME_QUERY = gql`
  {
    me {
      id
      username
      email
    }
  }
`;

// const GET_TRACKS_QUERY = gql`
//   {
//     tracks {
//       id
//       title
//       description
//       url
//     }
//   }
// `;

export default withRoot(Root);
