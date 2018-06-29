import React from 'react';
import { StyleSheet, Text, View, Dimensions, AsyncStorage } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { PasswordInput } from './pass';
import { baseURL, client } from '../../config';
import { FriendsList } from './friends';
import { AutoLogin } from './autologin';

export class StartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friendData: [],
      showModal: false,
      selectedName:''
    };
    AutoLogin()
      .then(friend => {
        this.props.navigation.navigate('Home', { friend })
      })
      .catch(err => console.log(err))
    this.style = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
      },
      topText: {
        fontSize: 100,
      },
      headingText: {
        fontSize: 100,
      },
      halfContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height / 2
      }
    });
  }

  openPasswordModal(friend) {
    this.setState(prev => ({
      friendData: prev.friendData,
      showModal: true,
      selectedFriend:friend,
    }))
  }

  closeModal() {
    this.setState(prev => ({
        friendData: prev.friendData,
        showModal: false,
        selectedName: ''
    }))
  }

  render() {
    const upperHalf = (this.state.showModal) ? (
      <PasswordInput
        friend={this.state.selectedFriend}
        navigation={this.props.navigation}
        closeModal={this.closeModal.bind(this)}
      />
    ):(
      <View style={this.style.container}>
        <Text style={this.style.topText}> Lounge </Text>
        <Text style={this.style.headingText}> 621 </Text>
      </View>
    )

    return (
      <ApolloProvider client={client}>
        <View style={this.style.container}>
            <View style={this.style.halfContainer}>
                {upperHalf}
            </View>
            <View style={this.style.halfContainer}>
                <FriendsList
                  promptPassword={this.openPasswordModal.bind(this)}
                />
            </View>
        </View>
      </ApolloProvider>
    );
  }
}
