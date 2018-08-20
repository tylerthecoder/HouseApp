import React from 'react';
import {
  Text,
  View,
  TextInput,
} from 'react-native';
import { Mutation } from 'react-apollo';
import { ADD_IOU, GET_MY_IOUS } from '../../queries';
import { FriendPicker, NumberInput, BlockButton } from '../../components';
import styles from '../../styles';


export class PayScreen extends React.Component {
  static navigationOptions = {
    title: 'Request Money',
  }

  constructor() {
    super();
    this.state = {
      payWho: undefined,
      amount: 0,
      reason: '',
    };
  }

  onSubmit(addIou) {
    const { navigation } = this.props;
    const friend = navigation.getParam('friend');
    const {
      payWho,
      amount,
      reason,
    } = this.state;

    const toId = payWho;
    const fromId = friend.friend_id;

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
            friend: friend.friend_id,
          },
        },
      ],
    })
      .catch(err => console.error(err));
  }

  render() {
    const { reason } = this.state;
    const { navigation } = this.props;
    const friend = navigation.getParam('friend');
    return (
      <View>
        <Text style={styles.bodyText}> Request from </Text>
        <FriendPicker
          exclude={[friend.friend_id]}
          onChange={(payWho) => {
            this.setState((prev) => {
              prev.payWho = payWho;
              return prev;
            });
          }}
        />
        <NumberInput
          placeholder='How much?'
          onChange={(amount) => {
            this.setState((prev) => {
              prev.amount = amount;
              return prev;
            });
          }}
        />
        <TextInput
          value={reason}
          style={styles.bodyText}
          placeholder='For what?'
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
