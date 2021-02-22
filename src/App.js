import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import AppNavigation from './AppNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {store} from './redux/store';
import {RecoilRoot} from 'recoil';
import {TodoListProvider} from './mobx/context';

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <RecoilRoot>
        <TodoListProvider>
          <NavigationContainer>
            <StatusBar backgroundColor="#ef4a6b" />
            <AppNavigation />
            {/* <FlashMessage position="top" floating={true} />
        <Spinner /> */}
          </NavigationContainer>
        </TodoListProvider>
      </RecoilRoot>
    </Provider>
  );
};

export default App;
