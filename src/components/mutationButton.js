import React from 'react';
import {

} from 'react-native';
import { Mutation } from 'react-apollo';
import { BlockButton } from './blockButton';

export class MutationButton extends React.Component {
  render() {
    const {
      mutation,
      buttonText,
      onPress,
    } = this.props;
    return (
      <Mutation mutation={mutation}>
        {func => (
          <BlockButton
            text={buttonText}
            onPress={() => {
              onPress(func);
            }}
          />
        )}
      </Mutation>
    );
  }
}
