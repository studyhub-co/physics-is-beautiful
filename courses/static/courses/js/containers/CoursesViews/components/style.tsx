export const checkSaveButtonStyle = {
  borderRadius: '12rem',
  border: '.2rem solid #1caff6',
  background: '#1caff6',
  color: '#fff',
  transition: 'color .5s,border .5s',
  outline: 'none',
  width: '60%',
  margin: '2rem 0 2rem 0'
}

export const checkSaveButtonStyleDisabled = {
  ...checkSaveButtonStyle,
  background: 'gray',
  border: '.2rem solid gray'
}
