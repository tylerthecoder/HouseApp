import React from 'react';
import {
  TextInput,
  FlatList,
  Text,
  View,
} from 'react-native';
import { Query } from 'react-apollo';

export class SuggestInput extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
    }
  }

  render() {
    const { text } = this.state;
    const { query, queryDataName } = this.props;
    return (
      <View>
        <TextInput
          value={text}
        />
        <FlatList
          data={queryData}
          renderItem={({ item }) => {
            return <Text> {item.name} </Text>;
          }}
        />
      </View>
    );
  }

}