import React from 'react';

import {Root} from 'native-base'

import {AppContainer} from './router'
import Map from './components/tabs/map'

export default class App extends React.Component {

  render() {
    return (
      <Root>
        <AppContainer>
          <Map />
        </AppContainer>
      </Root>
    );
  }
}