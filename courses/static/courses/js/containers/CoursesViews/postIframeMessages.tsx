export const handleContinueClick = () => {
  // send event to the iframe to movetothe next component
  // todo change current URL see redirect_to_material event from iframe for now
  document.getElementById('student_view_iframe').contentWindow.postMessage(
    {
      type: 'continue',
      // data: { }
    },
    '*',
  )
}
