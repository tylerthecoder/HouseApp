import React from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'green',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    marginTop: 5,
  },
  container: {
  },
});


export class BlockButton extends React.Component {
  render() {
    const { children, onPress } = this.props;
    return (
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          onPress();
        }}
      >
        <View style={styles.container}>
          {children}
        </View>
      </TouchableHighlight>
    );
  }
}
