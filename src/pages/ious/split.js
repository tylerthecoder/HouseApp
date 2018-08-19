import React from 'react';
import { Mutation } from 'react-apollo';
import {
  Text,
  View,
  TextInput,
} from 'react-native';
import {
  FriendPicker,
  NumberInput,
  BlockButton,
  MultiFriendPicker,
} from '../../components';
import { SPLIT_COST, GET_MY_IOUS } from '../../queries';
import styles from '../../styles';


export class SplitCostScreen extends React.Component {
  static navigationOptions = {
    title: 'Split a bill',
  }

  constructor() {
    super();
    this.state = {
      payerId: '',
      nonPayers: [],
      amount: 0,
    };
  }

  onSubmit(splitCost) {
    const { navigation } = this.props;
    const friend = navigation.getParam('friend');
    const {
      payerId,
      nonPayers,
      amount,
      reason,
    } = this.state;

    splitCost({
      variables: {
        amount,
        payerId,
        nonPayers,
        reason,
      },
      refetchQueries: [
        {
          query: GET_MY_IOUS,
          variables: {
            friend: friend.friend_id,
          },
        },
      ],
    })
      .catch(err => console.log(err));
  }

  render() {
    const { payerId, reason } = this.state;
    return (
      <View>
        <Text style={styles.bodyText}> Who Paid? </Text>
        <FriendPicker
          onChange={(fri) => {
            this.setState((prev) => {
              prev.payerId = fri;
              return prev;
            });
          }}
        />
        <Text style={styles.bodyText}> Who needs to pay? </Text>
        <MultiFriendPicker
          exclude={payerId}
          onChange={
            (nonPayers) => {
              this.setState((prev) => {
                prev.nonPayers = nonPayers;
                return prev;
              });
            }
          }
        />
        <NumberInput
          placeholder='How much?'
          onChange={(amt) => {
            this.setState((prev) => {
              prev.amount = amt;
              return prev;
            });
          }}
        />
        <TextInput
          value={reason}
          style={styles.bodyText}
          placeholder='Enter reason for transaction'
          onChangeText={(text) => {
            this.setState((prev) => {
              prev.reason = text;
              return prev;
            });
          }}
        />
        <Mutation mutation={SPLIT_COST}>
          {splitCost => (
            <BlockButton
              onPress={() => {
                this.onSubmit(splitCost);
              }}
              text='Submit Transaction'
            />
          )}
        </Mutation>
      </View>
    );
  }
}
