import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { Query } from 'react-apollo';
import { GET_MY_IOUS } from '../../queries';
import { Card } from '../../components';
import styles from '../../styles';


export class AllTransaction extends React.Component {
  static navigationOptions = {
    titile: 'All Ious',
  }

  render() {
    const { navigation } = this.props;
    const friend = navigation.getParam('friend');
    return (
      <View>
        <Query query={GET_MY_IOUS} variables={{ friend: friend.friend_id }}>
          {({ loading, error, data }) => {
            if (loading) return <Text style={styles.bodyText}> Loading </Text>;
            if (error) return <Text style={styles.bodyText}> {JSON.stringify(error)} </Text>;
            return data.friend.allIous.map((iou) => {
              const {
                from: { name: fromName },
                amount,
                to: { name: toName },
                reason,
              } = iou;
              const roundedAmount = Math.floor(amount * 100) / 100;
              const text = fromName === friend.name
                ? `You requested $${roundedAmount} from ${toName} for ${reason}`
                : `${fromName} requested $${roundedAmount} for ${reason}`;
              const key = Math.random() * 10;
              return (
                <Card
                  key={key}
                  bodyText={text}
                />
              );
            });
          }}
        </Query>
      </View>
    );
  }
}
