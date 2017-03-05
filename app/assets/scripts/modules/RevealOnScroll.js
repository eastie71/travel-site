import $ from 'jquery';
// waypoints used for scroll events
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll {
	constructor(els, offset) {
		this.itemsToReveal = els;
		this.offsetPercentage = offset;
		this.hideInitially();
		this.createWaypoints();
	}

	hideInitially() {
		this.itemsToReveal.addClass("reveal-item");
	}

	createWaypoints() {
		var localObject = this;
		this.itemsToReveal.each(function () {
			var currentElement = this;
			new Waypoint({
				element: currentElement,
				handler: function () {
					$(currentElement).addClass("reveal-item--is-visible");
				},
				offset: localObject.offsetPercentage
			});
		});
	}
}

export default RevealOnScroll;