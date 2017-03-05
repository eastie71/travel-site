import $ from 'jquery';
// waypoints used for scroll events
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {
	constructor() {
		this.siteHeader = $(".site-header");
		this.headerTriggerElement = $(".large-hero__title");
		this.pageSections = $(".page-section");
		this.siteHeaderLinks = $(".primary-nav a");
		this.createHeaderWaypoint();
		this.createPageSectionWaypoints();
		this.addSmoothScrolling();
	}

	addSmoothScrolling() {
		// Add the smooth scrolling facility
		this.siteHeaderLinks.smoothScroll();
	}

	createHeaderWaypoint() {
		var currentObject = this;
		new Waypoint({
			element: this.headerTriggerElement[0],
			handler: function (scrollDirection) {
				if (scrollDirection == "down") {
					currentObject.siteHeader.addClass("site-header--dark");
				} else {
					currentObject.siteHeader.removeClass("site-header--dark");
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