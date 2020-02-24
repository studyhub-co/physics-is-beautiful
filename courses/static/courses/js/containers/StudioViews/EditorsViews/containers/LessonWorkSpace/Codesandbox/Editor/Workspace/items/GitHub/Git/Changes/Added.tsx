import theme from '../../../common/src/theme';
import React from 'react';
import AddedIcon from 'react-icons/lib/go/diff-added';

import { Changes } from './Changes';

export const Added = ({ changes, hideColor }) => (
  <Changes
    changes={changes}
    color={theme.green}
    hideColor={hideColor}
    Icon={AddedIcon}
    title="Added"
  />
);