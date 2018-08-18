import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
} from 'react-native';

const styles = StyleSheet.create({
  input: {
    textAlign: 'center',
    fontSize: 20,
  },
});


export class NumberInput extends React.Component {
  constructor() {
    super();
    this.state = {
      number: 0,
    };
  }


  render() {
    const { placeholder, onChange } = this.props;
    const { number } = this.state;
    return (
      <View>
        <TextInput
          value={String(number)}
          style={styles.input}
          onChangeText={(rawAmount) => {
            const num = rawAmount.length === 0 ? 0 : parseFloat(rawAmount, 10);
            this.setState({
              number: num,
            });
            onChange(num);
          }}
          placeholder={placeholder}
        />
      </View>
    );
  }
}
