import { UserWithAvatar } from '../../../common/components/UserWithAvatar';
import { User } from '../../../common/types';
import { profileUrl } from '../../../common/utils/url-generator';
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
