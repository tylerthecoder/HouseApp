import React from 'react';
import {
  Text,
  TouchableHighlight,
} from 'react-native';

export class SelectableFriend extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: false,
    };
  }

  getStyle(color) {
    const { selected } = this.state;
    return {
      backgroundColor: selected ? color : 'white',
    };
  }

  getBodyText() {
    const { selected } = this.state;
    return {
      textAlign: 'center',
      fontSize: 20,
      color: selected ? 'white' : 'black',
    };
  }

  toggle(onChange) {
    this.setState((prev) => {
      prev.selected = !prev.selected;
      onChange(prev.selected);
      return prev;
    });
  }

  render() {
    const { friend, onChange } = this.props;
    return (
      <TouchableHighlight
        style={this.getStyle(friend.color)}
        onPress={
          () => {
            this.toggle(onChange);
          }
        }
      >
        <Text style={this.getBodyText()}> { friend.name } </Text>
      </TouchableHighlight>
    );
  }
}
