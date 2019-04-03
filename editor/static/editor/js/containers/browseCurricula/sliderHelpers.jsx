// // this code is clone of resources/static/resources/js/containers/IndexView/sliderHelpers.jsx
//
// export function getParams (slidesListName, componentInstance, reachEndFunc) {
//   var self = componentInstance
//   // var activeSlideKey = 0
//
//   var swiper = self[slidesListName + 'Swiper']
//
//   if (swiper) {
//     // populate virtual.data with fake slidersList
//     var fakeSlides = []
//     // activeSlideKey = swiper.virtual.slides.length
//     for (var i = 0; i < self.state[slidesListName].length; i += 1) {
//       fakeSlides.push('')
//     }
//     swiper.virtual.slides = fakeSlides
//   }
//
//   var swiperParams = {
//     navigation: {
//       nextEl: '.swiper-button-next.pib-swiper-button',
//       prevEl: '.swiper-button-prev.pib-swiper-button'
//     },
//     // preventClicks: false,
//     spaceBetween: 0,
//     slidesPerView: 5, // must be more than API paginator page size!
//     // activeSlideKey: activeSlideKey,
//     // rebuildOnUpdate: true, // if we will update or rebuild we will lose navigation position
//     // shouldSwiperUpdate: true,
//     virtual: {
//       slides: self.state[slidesListName],
//       renderExternal: function (data) {
//         // empty function needs to disable internal rendering, more info http://idangero.us/swiper/api/#virtual
//         // if (swiper) { swiper.navigation.update() } // hack for update navigation buttons
//       }
//     },
//     on: {
//       reachEnd: reachEndFunc
//     }
//   }
//   return swiperParams
// }
//
export function alreadyInSlides (slides, uuid) {
  for (var i = 0; i < slides.length; i++) {
    if (slides[i].props.curriculum.uuid === uuid) {
      return true
    }
  }
  return false
}
//
// export function updateSliderNavigation (slidesListName, componentInstance) {
//   var swiper = componentInstance[slidesListName + 'Swiper']
//   if (swiper) {
//     swiper.navigation.update()
//     // TODO we need to check that is not pagination update
//     swiper.update()
//   } // hack for update navigation buttons
// }
//
// export function updateSlidersNavigation (slidesNames, componentInstance) {
//   for (var i = 0, len = slidesNames.length; i < len; i++) {
//     componentInstance.updateSliderNavigation(slidesNames[i])
//   }
// }
//
export function getPrefixFromSlidesName (slidesName) {
  return slidesName.replace('Slides', '')
}
