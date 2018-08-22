import { AsyncStorage } from 'react-native';
import { baseURL, client } from '../../config';
import { GET_FRIEND } from '../../queries';


export const AutoLogin = () => {
  let friend;
  return new Promise((resolve, reject) => {
    Promise.all([AsyncStorage.getItem('@lounge621:user'), AsyncStorage.getItem('@lounge621:phrase')])
      .then(([user, pass]) => {
        friend = user;
        if (user !== null && pass !== null) {
          console.log(user, pass);
          return fetch(`${baseURL}/login?whoami=${user}&pass=${pass}`);
        }
        throw new Error('No data saved');
      })
      .then(x => x.text())
      .then((x) => {
        if (x === 'Success') {
          return client.query({
            query: GET_FRIEND,
            variables: { friend_id: friend },
          });
        }
        throw new Error('Inncorrect Password');
      })
      .then(({ data }) => {
        resolve(data.friend);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
