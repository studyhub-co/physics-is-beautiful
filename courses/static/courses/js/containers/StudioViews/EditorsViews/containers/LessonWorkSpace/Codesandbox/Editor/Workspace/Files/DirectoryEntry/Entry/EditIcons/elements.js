import styled from 'styled-components'
import fadeIn from '@codesandbox/common/lib/utils/animation/fade-in'

// TODO , error
// It seems you are interpolating a keyframe declaration (bcCCNc) into an untagged string. This was supported in styled-components v3, but is not longer supported in v4 as keyframes are now injected on-demand. Please wrap your string in the css\`\` helper which ensures the styles are injected correctly.
// ${fadeIn(0)};

export const Container = styled.div`
  display: flex;
  vertical-align: middle;
  line-height: 1;
  align-items: center;
`
