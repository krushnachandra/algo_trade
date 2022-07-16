import React, {useState} from 'react';
import {AsyncStorage} from 'react-native';
import axios from 'axios';

type User = null | {username: string};

export const AuthContext = React.createContext<{
  user: User;
  login: () => void;
  logout: () => void;
}>({
  user: null,
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<User>();

  axios({
    method: 'post',
    url: 'https://Openapi.5paisa.com/VendorsAPI/Service1.svc/V4/LoginRequestMobileNewbyEmail',
    data: {
      body: {
        Email_id: 'Mi8B2sZQdm4Zos+QFr6ksCrqqBGaAhJibYIEcQu3+2I=',
        Password: '7x5b4oKjBdxiTDWHQFGUH/HTANUBM3l4UiFxIABsWyE=',
        LocalIP: '122.183.33.6',
        PublicIP: '122.183.33.6',
        HDSerailNumber: '',
        MACAddress: '',
        MachineID: '039377 ',
        VersionNo: '1.7',
        RequestNo: '1',
        My2PIN: '7q+eamJL4aMBfnAZ8iI9Ng==',
        ConnectionType: '1',
      },
      head: {
        appName: '5P56159485',
        appVer: '1.0',
        key: 'Wp3fKXyAsRbsL8EpgL5TjVjNOhxt5PuD',
        osName: 'WEB',
        requestCode: '5PLoginV4',
        userId: 'WRREViJXizS',
        password: 'bdnGlDDXOON',
      },
    },
  })
    .then(function (response) {
      setToken(response.data.body.JWTToken);
      //console.log('token is', token); 
       })
    .catch(function (error) {
      console.log('error is', error);
    });

  return (
    <AuthContext.Provider
      value={{
        user,
        login: () => {
          const fakeUser = {username: 'bob'};
          setUser(fakeUser);
          AsyncStorage.setItem('user', JSON.stringify(fakeUser));
          AsyncStorage.setItem('token', JSON.stringify(token));
        },
        logout: () => {
          setUser(null);
          AsyncStorage.removeItem('user');
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
