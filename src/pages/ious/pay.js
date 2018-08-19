import React from 'react';
import {
  Text,
  View,
  Picker,
  TextInput,
} from 'react-native';
import { Mutation } from 'react-apollo';
import { ADD_IOU, GET_MY_IOUS } from '../../queries';
import { FriendPicker, NumberInput, BlockButton } from '../../components';
import styles from '../../styles';


export class PayScreen extends React.Component {
  static navigationOptions = {
    titile: 'Pay',
  }

  constructor() {
    super();
    this.state = {
      payWho: undefined,
      direction: 'in',
      amount: 0,
      reason: '',
    };
  }

  onSubmit(addIou) {
    const { navigation } = this.props;
    const friend = navigation.getParam('friend');
    const {
      payWho,
      direction,
      amount,
      reason,
    } = this.state;

    const toId = direction === 'in' ? friend.friend_id : payWho;
    const fromId = direction === 'out' ? friend.friend_id : payWho;

    addIou({
      variables: {
        amount,
        toId,
        fromId,
        reason,
      },
      refetchQueries: [
        {
          query: GET_MY_IOUS,
          variables: {
            friend: toId,
          },
        },
      ],
    })
      .catch(err => console.error(err));
  }

  render() {
    const { direction, reason } = this.state;
    const { navigation } = this.props;
    const friend = navigation.getParam('friend');
    return (
      <View>
        <Text style={styles.headerText}> Enter Transaction </Text>
        <FriendPicker
          exclude={[friend.friend_id]}
          onChange={(payWho) => {
            this.setState((prev) => {
              prev.payWho = payWho;
              return prev;
            });
          }}
        />
        <Picker
          selectedValue={direction}
          onValueChange={(dir) => {
            this.setState((prev) => {
              prev.direction = dir;
              return prev;
            });
          }}
        >
          <Picker.Item
            key={0}
            label='Paid you'
            value='out'
          />
          <Picker.Item
            key={0}
            label='Needs to pay you'
            value='in'
          />
        </Picker>
        <NumberInput
          placeholder='How much?'
          onChange={(amount) => {
            this.setState((prev) => {
              prev.amount = amount;
              return prev;
            });
          }}
        />
        <Text style={styles.bodyText}> For what? </Text>
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

        <Mutation mutation={ADD_IOU}>
          {addIou => (
            <BlockButton
              onPress={() => {
                this.onSubmit(addIou);
              }}
              text='Submit Transaction'
            />
          )}
        </Mutation>
      </View>
    );
  }
}
