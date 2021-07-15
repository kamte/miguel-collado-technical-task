/* eslint no-console: 0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { translate } from 'react-i18next';

import List from './List'
import ListItem from './ListItem'

const AppWrapper = styled.div`
  h1, h4 {
    margin-left: 12px;
  }
`

class App extends Component {
  static propTypes = {
    t: PropTypes.function,
    data: PropTypes.any,
  }

  render() {
    const { t, data } = this.props;
    const { counts, messages } = data;

    return (
      <AppWrapper>
        <h1>{t('app:title-home')}</h1>
        <h4>{t('app:description-home', {count: counts.messageTotal})}</h4>
        <h4>{t('app:daily-count-home', {count: counts.dailyTotal})}</h4>
        <h4>{t('app:weekly-count-home', {count: counts.weeklyTotal})}</h4>

        <List>
          {messages
            .sort((a, b) => b.date.localeCompare(a.date)) // reverse order to show newer messages first
            .map((m) => <ListItem key={m.id} t={t} {...m}/>
          )}
        </List>
      </AppWrapper>
    );
  }
}

export default translate(['app'], { wait: true })(App);
