export const useHandleDeleteLessonClick = (e, onDeleteClick, name) => {
  e.preventDefault()
  if (
    window.confirm(
      'This will permanently delete lesson "' +
          name +
          '" with all its materials. Are you sure?'
    )
  ) {
    onDeleteClick()
  }
}
