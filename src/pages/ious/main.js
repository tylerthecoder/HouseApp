import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { Query, ApolloProvider } from 'react-apollo';
import { client } from '../../config';
import { GET_MY_IOUS } from '../../queries';
import { Card } from '../../components/card';
import { BlockButton } from '../../components/blockButton';

export class IouScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    const friend = navigation.getParam('friend');
    return (
      <ApolloProvider client={client}>
        <View>
          <Text> IOUs </Text>
          <Query query={GET_MY_IOUS} variables={{ friend: friend.friend_id }}>
            {({ loading, error, data }) => {
              if (loading) return <Card bodyText='Loading' />;
              if (error) return <Card bodyText={JSON.stringify(error)} />;
              const { iowho } = data.friend;
              return iowho.map((iou) => {
                const { amount, to: { name } } = iou;
                const id = Math.random();
                return (
                  <Card
                    key={id}
                    bodyText={`You owe ${name} ${amount}`}
                  />
                );
              });
            }}
          </Query>
          <BlockButton
            onPress={() => {
              navigation.navigate('Pay', { friend });
            }}
          >
            <Text> Pay someone </Text>
          </BlockButton>
        </View>
      </ApolloProvider>
    );
  }
}
