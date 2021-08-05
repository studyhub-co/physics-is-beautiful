// eval mpt in iframe
import html2canvas from 'html2canvas'

export const useIframeLoaded = () => {
  return (
    e,
    mpt,
    currentMaterial,
    onUpdateProblemTypeImage,
    onUpdateMaterialImage,
    executionFrameRef,
  ) => {
    let iframeDoc = executionFrameRef.contentWindow.document
    // callback executed when canvas was found

    function handleRoot(root) {
      // get screenshot of the iframe
      setTimeout(function() {
        html2canvas(iframeDoc.body).then(function(canvas) {
          onUpdateProblemTypeImage(canvas, mpt)
          // can save the same Screen for current material
          onUpdateMaterialImage(canvas, currentMaterial)
        })
      }, 10000) // set 10 sec to ensure component load data from backend API
    }

    // set up the mutation observer
    var observer = new window.MutationObserver(function(mutations, me) {
      // `mutations` is an array of mutations that occurred
      // `me` is the MutationObserver instance
      let root = iframeDoc.getElementById('root')
      if (root) {
        handleRoot(root)
        me.disconnect() // stop observing
      }
    })

    // start observing
    observer.observe(iframeDoc.body, {
      childList: true,
      subtree: true,
    })
  }
}
