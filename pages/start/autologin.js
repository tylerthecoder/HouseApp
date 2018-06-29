import { AsyncStorage } from 'react-native';
import { baseURL, client } from '../../config';
import gql from "graphql-tag";

export const AutoLogin = () => {
  let friend;
  return new Promise((resolve, reject) => {
    Promise.all([AsyncStorage.getItem('@lounge621:user'),AsyncStorage.getItem('@lounge621:phrase')])
    .then(([user,pass]) => {
      friend = user
      if (user !== null && pass !== null) {
        return fetch(`${baseURL}/login?friend_id=${user}&password=${pass}`);
      } else {
        throw 'No data saved';
      }
    })
    .then(x => x.text())
    .then(x => {
      if ( x == "Success" ) {
        return client
                .query({
                  query: gql`
                    {
                      friend(id: "${friend}") {
                        name
                        color
                        friend_id
                      }
                    }
                  `
                })

      } else {
        throw "Incorrect Password"
      }
    })
    .then(({ data } ) => {
      resolve(data.friend);
    })
    .catch((err) => {
      reject(err);
    })
  })

}