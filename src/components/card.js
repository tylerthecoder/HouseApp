import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    margin: 10,
    padding: 10,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 1.0,
    shadowOffset: {
      width: 5,
      height: 5,
    },
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: 28,
    marginBottom: 10,
  },
  cardText: {
    textAlign: 'center',
    fontSize: 16,
  },
});

export class Card extends React.Component {
  press() {
    const { onPress } = this.props;
    // navigate to the chores page
    if (onPress) {
      onPress();
    }
  }

  render() {
    const {
      titleText,
      children,
      bodyText,
      style,
    } = this.props;

    return (
      <TouchableHighlight onPress={() => this.press()} style={[styles.card, style]}>
        <View>
          {titleText && <Text style={styles.cardTitle}> {titleText} </Text>}
          {bodyText && <Text style={styles.cardText}> {bodyText} </Text>}
          {children}
        </View>
      </TouchableHighlight>
    );
  }
}
