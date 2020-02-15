import { UserWithAvatar } from '../../../common/src/components/UserWithAvatar';
import { User } from '../../../common/src/types';
import { profileUrl } from '../../../common/src/utils/url-generator';
import React, { FunctionComponent } from 'react';

import { Item, UserLink } from './elements';

type Props = {
  author: User;
};
export const Author: FunctionComponent<Props> = ({
  author: { username, avatarUrl, subscriptionSince },
}) => (
  <Item>
    <UserLink title={username} to={profileUrl(username)}>
      <UserWithAvatar
        username={username}
        avatarUrl={avatarUrl}
        subscriptionSince={subscriptionSince}
      />
    </UserLink>
  </Item>
);
