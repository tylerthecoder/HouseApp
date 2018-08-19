import React from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';
import { Card } from './card';

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'green',
    borderRadius: 30,
  },
  btnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
});


export class BlockButton extends React.Component {
  render() {
    const { onPress, text } = this.props;
    return (
      <Card
        style={styles.button}
        onPress={() => {
          onPress();
        }}
      >
        <Text style={styles.btnText}> { text } </Text>
      </Card>
    );
  }
}
