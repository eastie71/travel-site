import $ from 'jquery';
// waypoints used for scroll events
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {
	constructor() {
		this.lazyImages = $(".lazyload");
		this.siteHeader = $(".site-header");
		this.headerTriggerElement = $(".large-hero__title");
		this.pageSections = $(".page-section");
		this.siteHeaderLinks = $(".primary-nav a");
		this.siteLogoLink = $(".site-header__logo a");
		this.createHeaderWaypoint();
		this.createPageSectionWaypoints();
		this.addSmoothScrolling();
		this.refreshWaypoints();
	}

	refreshWaypoints() {
		// By calling the refreshAll method this will refresh all waypoints across the entire DOM scope
		// (this includes the waypoints used in RevealOnScroll)
		this.lazyImages.on("load", function () {
			Waypoint.refreshAll();
		});
	}

	addSmoothScrolling() {
		// Add the smooth scrolling facility
		this.siteHeaderLinks.smoothScroll();
		this.siteLogoLink.smoothScroll();
	}

	createHeaderWaypoint() {
		var currentObject = this;
		new Waypoint({
			element: this.headerTriggerElement[0],
			handler: function (scrollDirection) {
				if (scrollDirection == "down") {
					currentObject.siteHeader.addClass("site-header--dark");
					//console.log("add dark to site-header");
				} else {
					currentObject.siteHeader.removeClass("site-header--dark");
					// Remove the "current_link" highlight from the FIRST navigation link (a) - "Our Beginning"
					//console.log(currentObject.siteHeaderLinks[0]);
					currentObject.siteHeaderLinks.first().removeClass("is-current-link");
				}
			}
		});
	}

	createPageSectionWaypoints() {
		var currentObject = this;
		this.pageSections.each(function () {
			var currentPageSection = this;

			// Scrolling DOWN the page
			new Waypoint({
				element: currentPageSection,
				handler: function (scrollDirection) {
					if (scrollDirection == "down") {
						var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
						// Remove any is-current-link classes from ALL page nav links
						currentObject.siteHeaderLinks.removeClass("is-current-link");
						// Apply the is-current-link class to matching waypoint link :)
						$(matchingHeaderLink).addClass("is-current-link");
					}
				},
				offset: "18%"
			});

			// Scrolling UP the page
			new Waypoint({
				element: currentPageSection,
				handler: function (scrollDirection) {
					if (scrollDirection == "up") {
						var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
						// Remove any is-current-link classes from ALL page nav links
						currentObject.siteHeaderLinks.removeClass("is-current-link");
						// Apply the is-current-link class to matching waypoint link :)
						$(matchingHeaderLink).addClass("is-current-link");
					}
				},
				offset: "-40%"
			});
		});
	}
}

export default StickyHeader;