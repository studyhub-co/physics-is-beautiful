import { resolveModule } from '../../../../common/sandbox/modules';
import { isEqual } from 'lodash-es';

let nextOptimisticId = 0;

export default {
  createOptimisticId() {
    return 'OPTIMISTIC_' + nextOptimisticId++;
  },
  resolveModule,
  isEqual,
};
