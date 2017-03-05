import $ from 'jquery';

class Modal {
	constructor() {
		this.openModalButton = $(".open-modal");
		this.modal = $(".modal");
		this.closeModalButton = $(".modal__close");
		this.events();
	}

	events() {
		// clicking the open modal button
		this.openModalButton.click(this.openModal.bind(this));

		// clicking the x close modal button
		this.closeModalButton.click(this.closeModal.bind(this));

		// user hits any key
		$(document).keyup(this.keyPressHandler.bind(this));
	}

	keyPressHandler(e) {
		// If ESC key pressed (ie. 27) then close the Modal
		if (e.keyCode == 27) {
			this.closeModal();
		}
	}

	openModal() {
		this.modal.addClass("modal--is-visible");
		// by returning false this will prevent the browser from scrolling to the top of the page ie. href="#"
		return false;
	}

	closeModal() {
		this.modal.removeClass("modal--is-visible");
		// by returning false this will prevent the browser from scrolling to the top of the page ie. href="#"
		return false;
	}
}

export default Modal;