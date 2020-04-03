import styled, { css } from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  .Resizer {
    background: ${props => props.theme['sideBar.border'] || 'black'};
    background-clip: padding-box;
  }
`

export const HeaderCentered = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  z-index: 0; /* So pointer events on left and right continue */
  margin: 0 3rem;
`

export const HeaderLeft = styled.div`
  display: flex;
  height: 100%;
  z-index: 1;
`

export const HeaderContainer = styled.div`
  ${({ theme, zenMode }) => css`
    display: ${zenMode ? 'none' : 'flex'};
    # position: fixed;
    z-index: 5;
    justify-content: space-between;
    align-items: center;
    background-color: ${theme['titleBar.activeBackground'] ||
      theme.background2};
    font-size: 1.2rem;
    color: ${theme['titleBar.activeForeground'] ||
      css`rgba(255, 255, 255, 0.7)`};
    margin: 0;
    height: 3rem;
    font-weight: 400;
    flex: 0 0 3rem;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid
      ${theme['titleBar.activeForeground']
    ? theme['titleBar.border'] || 'transparent'
    : theme.background2.darken(0.3)};
  `}
`
