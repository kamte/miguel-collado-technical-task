/* eslint no-console: 0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { translate } from 'react-i18next';

import ListItem from './ListItem'

class App extends Component {
  static propTypes = {
    t: PropTypes.function,
    data: PropTypes.any,
  }

  render() {
    const { t, data } = this.props;
    const { counts, messages } = data;
    console.log('props', this.props);

    return (
      <div>
        <h1>{t('app:title-home')}</h1>
        <h4>{t('app:description-home', {count: counts.messageTotal})}</h4>

        { messages.map((m) => <ListItem key={m.id} {...m} />) }
      </div>
    );
  }
}

export default translate(['app'], { wait: true })(App);
