import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PasswordInput } from './pass';
import { FriendsList } from './friends';
import { AutoLogin } from './autologin';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
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
  },
});


export class StartScreen extends React.Component {
  constructor({ navigation }) {
    super();
    this.state = {
      showModal: false,
      selectedFriend: '',
    };

    AutoLogin()
      .then((friend) => {
        navigation.navigate('Home', { friend });
      })
      .catch(err => console.log(err));
  }

  openPasswordModal(friend) {
    this.setState({
      showModal: true,
      selectedFriend: friend,
    });
  }

  closeModal() {
    this.setState({
      showModal: false,
      selectedFriend: '',
    });
  }

  render() {
    const { showModal, selectedFriend } = this.state;
    const { navigation } = this.props;

    const upperHalf = (showModal) ? (
      <PasswordInput
        friend={selectedFriend}
        navigation={navigation}
        closeModal={() => this.closeModal()}
        style={styles.container}
      />
    ) : (
      <View style={styles.container}>
        <Text style={styles.topText}> Lounge </Text>
        <Text style={styles.headingText}> 621 </Text>
      </View>
    );

    return (
      <View style={styles.container}>
        <View style={styles.halfContainer}>
          {upperHalf}
        </View>
        <View style={styles.halfContainer}>
          <FriendsList
            promptPassword={this.openPasswordModal.bind(this)}
          />
        </View>
      </View>
    );
  }
}
