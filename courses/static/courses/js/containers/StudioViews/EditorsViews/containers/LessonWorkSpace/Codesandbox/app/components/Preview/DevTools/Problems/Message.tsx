import React from 'react';

import { dispatch, actions } from '../../../../codesandbox-api/codesandbox';

// import NoticeIcon from 'react-icons/lib/md/info';
// import ErrorIcon from 'react-icons/lib/md/error';
// import WarningIcon from 'react-icons/lib/md/warning';

import { MdInfo as NoticeIcon } from 'react-icons/md';
import { MdError as ErrorIcon } from 'react-icons/md';
import { MdWarning as WarningIcon } from 'react-icons/md';

import theme from '../../../../../common/src/theme';
import {
  MessageContainer,
  MessageIconContainer,
  MessageSource,
} from './elements';
import { MessageType } from '.';

export interface Props {
  message: MessageType;
}

function getIcon(type: 'notice' | 'warning' | 'error') {
  if (type === 'error') {
    return { Icon: ErrorIcon, color: theme.red() };
  }
  if (type === 'warning') {
    return { Icon: WarningIcon, color: theme.primary() };
  }

  return { Icon: NoticeIcon, color: theme.secondary() };
}

export function ProblemMessage({ message }: Props) {
  const { Icon, color } = getIcon(message.severity);

  return (
    <MessageContainer
      onClick={() => {
        dispatch(
          actions.editor.openModule(message.path, message.line, message.column)
        );
      }}
    >
      <MessageIconContainer style={{ color }}>
        <Icon />
      </MessageIconContainer>
      <div>{message.message}</div>
      {message.source && <MessageSource>{message.source}</MessageSource>}
    </MessageContainer>
  );
}
