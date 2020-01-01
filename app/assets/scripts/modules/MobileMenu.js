class MobileMenu {
	constructor() {
		this.siteHeader = document.querySelector(".site-header") 
		this.menuIcon = document.querySelector(".site-header__menu-icon")
		this.menuContent = document.querySelector(".site-header__menu-content")
		// map the events for this object
		this.events()
	}

	events() {
		// map the click event to the toggleTheMenu method
		// Need to use the arrow function to be able to access the "menuContent" element inside the
		// toggleTheMenu method
		this.menuIcon.addEventListener("click", () => this.toggleTheMenu())
	}

	// Toggle between visible and invisible for the menu content, expanded/contracted,
	// and the close X menu-icon (on/off)
	toggleTheMenu() {
		this.menuContent.classList.toggle("site-header__menu-content--is-visible")
		this.siteHeader.classList.toggle("site-header--is-expanded")
		this.menuIcon.classList.toggle("site-header__menu-icon--close-x")
	}
}

export default MobileMenu;