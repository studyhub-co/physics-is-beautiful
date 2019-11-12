import {
  ServerStatus,
  ServerContainerStatus,
  ServerPort,
} from '../../../../common/types';

type State = {
  status: ServerStatus;
  containerStatus: ServerContainerStatus;
  error: string;
  hasUnrecoverableError: false;
  ports: ServerPort[];
};

export const state: State = {
  status: ServerStatus.INITIALIZING,
  containerStatus: ServerContainerStatus.INITIALIZING,
  error: null,
  hasUnrecoverableError: false,
  ports: [],
};
