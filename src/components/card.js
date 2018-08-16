import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

const style = StyleSheet.create({
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
  onclick() {
    const { onclick } = this.props;
    // navigate to the chores page
    if (onclick) {
      onclick();
    }
  }

  render() {
    const {
      titleText,
      bodyText,
    } = this.props;

    return (
      <TouchableHighlight onPress={() => this.onclick()} style={style.card}>
        <View>
          {titleText && <Text style={style.cardTitle}> {titleText} </Text>}
          <Text style={style.cardText}> {bodyText} </Text>
        </View>
      </TouchableHighlight>
    );
  }
}
