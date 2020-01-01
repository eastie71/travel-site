import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

class StickyHeader {
  constructor() {
    this.siteHeader = document.querySelector(".site-header")
	this.pageSections = document.querySelectorAll(".page-section")
	this.siteHeaderLinks = document.querySelectorAll(".primary-nav a")
    this.browserHeight = window.innerHeight
    this.previousScrollY = window.scrollY
    this.events()
  }

  events() {
    window.addEventListener("scroll", throttle(() => this.runOnScroll(), 200))
    window.addEventListener("resize", debounce(() => {
      this.browserHeight = window.innerHeight
    }, 333))
  }

  runOnScroll() {
    this.determineScrollDirection()

	this.pageSections.forEach(el => this.calcSection(el))

	// If user has scrolled to Y position of 70 pixels then add the the "dark" class to the header section
	// ie. make it darker...
    if (window.scrollY > 70) {
      this.siteHeader.classList.add("site-header--dark")
    } else {
	  this.siteHeader.classList.remove("site-header--dark")
	  // Remove the "current_link" highlight from ALL the site header links if at the TOP
	  this.siteHeaderLinks.forEach(el => el.classList.remove("is-current-link"))
	}
   
  }

  determineScrollDirection() {
    if (window.scrollY > this.previousScrollY) {
      this.scrollDirection = 'down'
    } else {
      this.scrollDirection = 'up'
    }
    this.previousScrollY = window.scrollY
  }

  calcSection(el) {
    if (window.scrollY + this.browserHeight > el.offsetTop && window.scrollY < el.offsetTop + el.offsetHeight) {
      let scrollPercent = el.getBoundingClientRect().top / this.browserHeight * 100
      if (scrollPercent < 18 && scrollPercent > -0.1 && this.scrollDirection == 'down' || scrollPercent < 33 && this.scrollDirection == 'up') {
        let matchingLink = el.getAttribute("data-matching-link")
        document.querySelectorAll(`.primary-nav a:not(${matchingLink})`).forEach(el => el.classList.remove("is-current-link"))
        document.querySelector(matchingLink).classList.add("is-current-link")
      }
    }
  }
}

export default StickyHeader