import '../styles/styles.css'
import 'lazysizes'
import MobileMenu from './modules/MobileMenu'
import RevealOnScroll from './modules/RevealOnScroll'
import StickyHeader from './modules/StickyHeader'
import ClientArea from './modules/ClientArea'

// React Code Here
import React from 'react'
import ReactDom from 'react-dom'

// Import React components
import CompenentExample1 from './modules/ComponentExample1'

ReactDom.render(<CompenentExample1/>, document.querySelector("#react-example"))

new ClientArea()
new MobileMenu()
new RevealOnScroll(document.querySelectorAll(".feature-item"), 75)
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60)
new StickyHeader()

// Setup the "Get in Touch" Modal
// This is done this way as a performance improvement. Rather than have the JS for the modal download
// to the users browser everytime the user opens the page - this code only downloads if the user 
// clicks on the "Get in Touch" (modal) button.
var modal
document.querySelectorAll(".open-modal").forEach(el => {
  el.addEventListener("click", e => {
    e.preventDefault()
    if (typeof modal == "undefined") {
      // This is a "promise" call ie. call "import", once completed call "then", else if fails call "catch"
      // The comment code here that contains "webpackChunkName" actually sets the name of the JS file that is downloaded!!
      // The JS file name will be "modal.bundled.js" 
      import(/* webpackChunkName: "modal" */ './modules/Modal').then(x => {
        modal = new x.default()
        // Need to set a timeout to allow browser to setup the modal object
        setTimeout(() => modal.openModal(), 20)
      }).catch(() => console.log("There was a problem loading the modal for 'Get in Touch'"))
    } else {
      modal.openModal()
    }
  })
})

// This relates to accepting the "hot" updates to source code when using webpack-dev-server
if (module.hot) {
    module.hot.accept()
}