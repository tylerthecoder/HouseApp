import React from 'react';
import { Query } from 'react-apollo';
import { Card } from './card';

export class QueryCard extends React.Component {
  render() {
    const {
      query,
      queryVars,
      titleFunc,
      bodyFunc,
      onclick,
    } = this.props;

    return (
      <Query query={query} variables={queryVars}>
        {({ loading, error, data }) => {
          if (loading) return <Card bodyText='Loading' />;
          if (error) return <Card bodyText={JSON.stringify(error)} />;
          const titleText = titleFunc(data);
          const bodyText = bodyFunc(data);
          return (
            <Card
              titleText={titleText}
              bodyText={bodyText}
              onclick={onclick}
            />
          );
        }}
      </Query>
    );
  }
}
