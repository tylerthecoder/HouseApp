import gql from 'graphql-tag';

export const choreQuery = gql`
  query chores($friend_id: String!) {
    chores(friend_id: $friend_id) {
      name
      status
      chore_id
      points
    }
  }
`;

export const GET_FRIEND = gql`
  query getFriend($friend_id: String!) {
    friend(id: $friend_id) {
      name
      color
      friend_id
    }
  }
`;

export const GET_FRIENDS = gql`
  {
    friends {
      friend_id
      name
      color
    }
  }
`;

export const GET_FRIEND_CHORES = gql`
  query chores($friend_id: String!) {
    friend(id: $friend_id) {
      points
      chores {
        name
      }
    }
  }
`;

export const COMPLETE_CHORE = gql`
  mutation changeStatus($chore_id: String!) {
    changeStatus(chore_id: $chore_id, status: "completed") {
      chore_id
    }
  }
`;

export const UNCOMPLETE_CHORE = gql`
  mutation changeStatus($chore_id: String!) {
    changeStatus(chore_id: $chore_id, status: "assigned") {
      chore_id
    }
  }
`;

export const ADD_CHORE = gql`
  mutation addChore($name: String!, $points: Int!, $friend: String!) {
    addChore(name: $name, points: $points, friend_id: $friend) {
      chore_id
      doer {
        name
      }
    }
  }
`;
