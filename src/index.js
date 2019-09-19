import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { AppContainer } from './AppContainer';
import { rootReducer } from './reducers';

const store = createStore(
  rootReducer,
  {
    todos: {
      todoList: [
        '54ed797f-a7dd-210a-b9fd-4f408caa4cb2',
        '4ef17d74-397f-e0dd-d91c-b93a4eae4858',
        '8605d36f-27f9-0df7-38f5-3c2859d4349d'
      ],
      todos: {
        '54ed797f-a7dd-210a-b9fd-4f408caa4cb2': {
          id: '54ed797f-a7dd-210a-b9fd-4f408caa4cb2',
          text: 'pull',
          completed: false
        },
        '4ef17d74-397f-e0dd-d91c-b93a4eae4858': {
          id: '4ef17d74-397f-e0dd-d91c-b93a4eae4858',
          text: 'commit',
          completed: false
        },
        '8605d36f-27f9-0df7-38f5-3c2859d4349d': {
          id: '8605d36f-27f9-0df7-38f5-3c2859d4349d',
          text: 'push',
          completed: false
        }
      }
    }
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);
