import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { Query } from 'react-apollo';
import { GET_MY_IOUS } from '../../queries';
import { Card } from '../../components/card';
import { BlockButton } from '../../components/blockButton';
import styles from '../../styles';

export class IouScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    const friend = navigation.getParam('friend');
    return (
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
              const payText = amount > 0 ? `You owe ${name} $${amount}` : `${name} owes you $${amount * -1}`;
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
        >
          <Text style={styles.bodyText}> Pay someone </Text>
        </BlockButton>
        <BlockButton
          onPress={() => {
            navigation.navigate('Split', { friend });
          }}
        >
          <Text style={styles.bodyText}> Split Cost </Text>
        </BlockButton>
      </View>
    );
  }
}
