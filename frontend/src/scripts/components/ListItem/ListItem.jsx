import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ChevronLeft, Clear, Check } from '@material-ui/icons';
import Collapse from '@material-ui/core/Collapse';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  margin-left: 12px;
  margin-right: 12px;
  border: 1px solid #BABABA;
  font-family: Raleway,sans-serif;
  cursor: pointer;
  background-color: white;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const AdditionalInfo = styled.ul`
  li {
    display: flex;
    align-items: center;
  }
`;

const getIcon = (pass) => 
  pass ? <Check style={{color: 'green'}}/> : <Clear style={{color: 'red'}} />;

const ListItem = ({
  subject,
  date,
  from,
  authHeaders,
  wordCount,
  t,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { dkim, spf, dmarc } = authHeaders;

  return (
    <Wrapper onClick={() => setIsOpen(!isOpen)}>
      <Header>
        <span>{subject}</span>
        <RightWrapper>
          <span>{new Date(date).toLocaleDateString()}</span>
          <ChevronLeft style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(270deg)' }} />
        </RightWrapper>
      </Header>
      <Collapse in={isOpen}>
        <AdditionalInfo>
          <li>{t('from-list-item')}: {from}</li>
          <li>{t('word-count-list-item')}: {wordCount}</li>
          <li>{t('dkim-list-item')}: {getIcon(dkim)}</li>
          <li>{t('spf-list-item')}: {getIcon(spf)}</li>
          <li>{t('dmarc-list-item')}: {getIcon(dmarc)}</li>
        </AdditionalInfo>
      </Collapse>
    </Wrapper>
  );
};

ListItem.propTypes = {
  subject: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  authHeaders: PropTypes.shape({
    dkim: PropTypes.bool,
    spf: PropTypes.bool,
    dmarc: PropTypes.bool,
  }).isRequired,
  wordCount: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
};

export default ListItem;
