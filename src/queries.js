import gql from 'graphql-tag';

export const choreQuery = gql`
  query chores($friend_id: String!) {
    chores(friend_id: $friend_id) {
      name
      status
      chore_id
      points
      creator {
        name
      }
    }
  }
`;

export const ALL_CHORES = gql`
  {
    chores {
      id
      name
      status
      chore_id
      points
      doer {
        name
        friend_id
      }
      creator {
        name
      }
    }
  }
`;

export const GET_FRIEND = gql`
  query getFriend($friend_id: String!) {
    friend(friend_id: $friend_id) {
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

export const GET_ALL_BASE_CHORES = gql`
  {
    baseChores {
      id
      name
      points
    }
  }
`;

export const GET_FRIEND_CHORES = gql`
  query chores($friend_id: String!) {
    friend(friend_id: $friend_id) {
      points
      chores {
        name
      }
    }
  }
`;

export const GET_MY_IOUS = gql`
  query friend($friend: String!) {
    friend(friend_id: $friend) {
      iowho {
        amount
        from {
          name
        }
      }
      allIous {
        amount
        reason
        to {
          name
          friend_id
        }
        from {
          name
          friend_id
        }
      }
    }
  }
`;

export const COMPLETE_CHORE = gql`
  mutation changeStatus($id: String!) {
    changeStatus(id: $id, status: "completed") {
      id
    }
  }
`;

export const UNCOMPLETE_CHORE = gql`
  mutation changeStatus($id: String!) {
    changeStatus(id: $id, status: "assigned") {
      chore_id
    }
  }
`;

export const ADD_CHORE = gql`
  mutation addChore($baseChoreId: String!, $friend: String!) {
    addChore(base_chore_id: $baseChoreId, friend_id: $friend) {
      id
      name
      status
      chore_id
      points
      doer {
        name
        friend_id
      }
      creator {
        name
      }
    }
  }
`;

export const ADD_BASE_CHORE = gql`
  mutation addBaseChore($name: String!, $points: Int!, $friend: String!) {
    addBaseChore(name: $name, points: $points, friend: $friend) {
      id
      name
      points
    }
  }
`;

export const ADD_IOU = gql`
  mutation addIou($toId: String!, $fromId: String!, $amount: Float!, $reason: String!) {
    addIou(to_id: $toId, from_id: $fromId, amount: $amount, reason: $reason) {
      amount
      reason
      to {
        name
      }
      from {
        name
      }
    }
  }
`;

export const SPLIT_COST = gql`
  mutation splitCost($payerId: String!, $amount: Float!, $nonPayers:[String]!, $reason: String!) {
    splitCost(payerId: $payerId, amount: $amount, nonPayers: $nonPayers, reason: $reason)
  }
`;
