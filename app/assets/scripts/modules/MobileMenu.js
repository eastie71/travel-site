import $ from 'jquery';

class MobileMenu {
	constructor() {
		this.siteHeader = $(".site-header");
		this.menuIcon = $(".site-header__menu-icon");
		this.menuContent = $(".site-header__menu-content");
		// map the events for this object
		this.events();
	}

	events() {
		// map the click event to the toggleTheMenu method
		// Need to use the "bind" method to be able to access the "menuContent" element inside the
		// toggleTheMenu method
		this.menuIcon.click(this.toggleTheMenu.bind(this));
	}

	// Toggle between visible and invisible for the menu content, expanded/contracted,
	// and the close X menu-icon (on/off)
	toggleTheMenu() {
		this.menuContent.toggleClass("site-header__menu-content--is-visible");
		this.siteHeader.toggleClass("site-header--is-expanded");
		this.menuIcon.toggleClass("site-header__menu-icon--close-x");
	}

}

export default MobileMenu;