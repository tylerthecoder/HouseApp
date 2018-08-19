import React from 'react';
import {
  View,
} from 'react-native';
import { Query } from 'react-apollo';
import { GET_MY_IOUS } from '../../queries';
import { Card } from '../../components/card';
import { BlockButton } from '../../components';

export class IouScreen extends React.Component {
  static navigationOptions = {
    title: 'IOUs',
  }

  render() {
    const { navigation } = this.props;
    const friend = navigation.getParam('friend');
    return (
      <View>
        <Query query={GET_MY_IOUS} variables={{ friend: friend.friend_id }}>
          {({ loading, error, data }) => {
            if (loading) return <Card bodyText='Loading' />;
            if (error) return <Card bodyText={JSON.stringify(error)} />;
            const { iowho } = data.friend;
            return iowho.map((iou) => {
              const { amount, to: { name } } = iou;
              const roundedAmount = Math.floor(amount * 100) / 100;
              const id = Math.random();
              const payText = amount > 0 ? `You owe ${name} $${roundedAmount}` : `${name} owes you $${roundedAmount * -1}`;
              return (
                <Card
                  key={id}
                  bodyText={payText}
                />
              );
            });
          }}
        </Query>
        <BlockButton
          onPress={() => {
            navigation.navigate('Pay', { friend });
          }}
          text='Pay Someone'
        />
        <BlockButton
          onPress={() => {
            navigation.navigate('Split', { friend });
          }}
          text='Split Cost'
        />
      </View>
    );
  }
}
