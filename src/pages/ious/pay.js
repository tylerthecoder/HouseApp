import React from 'react';
import {
  Text,
  View,
  Picker,
  StyleSheet,
} from 'react-native';
import { ApolloProvider, Mutation } from 'react-apollo';
import { client } from '../../config';
import { ADD_IOU, GET_MY_IOUS } from '../../queries';
import { FriendPicker } from '../../components/friendPicker';
import { NumberInput } from '../../components/numberInput';
import { BlockButton } from '../../components/blockButton';

const styles = StyleSheet.create({
  headerText: {
    textAlign: 'center',
    fontSize: 20,
  },
  centerText: {
    textAlign: 'center',
  },
});


export class PayScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      payWho: undefined,
      direction: 'in',
      amount: 0,
    };
  }

  onSubmit(addIou) {
    const { navigation } = this.props;
    const friend = navigation.getParam('friend');
    const { payWho, direction, amount } = this.state;

    const toId = direction === 'in' ? friend.friend_id : payWho;
    const fromId = direction === 'out' ? friend.friend_id : payWho;

    addIou({
      variables: {
        amount,
        toId,
        fromId,
      },
      refetchQueries: [
        {
          query: GET_MY_IOUS,
          variables: {
            friend: toId,
          },
        }, {
          query: GET_MY_IOUS,
          variables: {
            friend: fromId,
          },
        },
      ],
    })
      .catch(err => console.log(err));
  }

  render() {
    const { direction } = this.state;
    const { navigation } = this.props;
    const friend = navigation.getParam('friend');
    return (
      <ApolloProvider client={client}>
        <View>
          <Text style={styles.headerText}> Enter Transaction </Text>
          <FriendPicker
            exclude={[friend.friend_id]}
            onChange={(fri) => {
              this.setState(prev => ({
                payWho: fri,
                direction: prev.direction,
                amount: prev.amount,
              }));
            }}
          />
          <Picker
            selectedValue={direction}
            onValueChange={(dir) => {
              this.setState(prev => ({
                payWho: prev.payWho,
                direction: dir,
                amount: prev.amount,
              }));
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
            onChange={(amt) => {
              this.setState(prev => ({
                amount: amt,
                payWho: prev.payWho,
                direction: prev.direction,
              }));
            }}
          />
          <Mutation mutation={ADD_IOU}>
            {addIou => (
              <BlockButton
                onPress={() => {
                  this.onSubmit(addIou);
                }}
              >
                <Text style={styles.centerText}> Submit Transaction </Text>
              </BlockButton>
            )}
          </Mutation>
        </View>
      </ApolloProvider>
    );
  }
}
