import React, { Fragment } from 'react';
import withRoot from './withRoot';

import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Switch, Route } from 'react-router-dom';

import App from './pages/App';
import Profile from './pages/Profile';
import Header from './components/Shared/Header';

import Loading from './components/Shared/Loading';
import Error from './components/Shared/Error';

const Root = () => (
  <Query query={ME_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <Loading />;
      if (error) return <Error error={error} />;

      const currentUser = data.me;

      //   return <div>{JSON.stringify(data)}</div>;
      return (
        <Fragment>
          <Header currentUser={currentUser} />

          <Switch>
            <Route path="/profile/:id" component={Profile} />
            <Route exact path="/" component={App} />
          </Switch>
        </Fragment>
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
