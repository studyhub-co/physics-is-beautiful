import styled from 'styled-components';
import delayEffect from '../../common/src/utils/animation/delay-effect';

export const DelayedAnimation = styled.div<{ delay: number }>`
  ${({ delay }) => delayEffect(delay || 0)};
`;
