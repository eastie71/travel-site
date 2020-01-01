class Modal {
	constructor() {
		this.injectModalHTML()
		this.modal = document.querySelector(".modal")
		this.closeModalButton = document.querySelector(".modal__close")
		this.events();
	}

	events() {
		// clicking the x close modal button
		this.closeModalButton.addEventListener("click", () => this.closeModal())
		// user hits any key
		document.addEventListener("keyup", e => this.keyPressHandler(e))
	}

	keyPressHandler(e) {
		// If ESC key pressed (ie. 27) then close the Modal
		if (e.keyCode == 27) {
			this.closeModal();
		}
	}

	openModal() {
		this.modal.classList.add("modal--is-visible")
		// by returning false this will prevent the browser from scrolling to the top of the page ie. href="#"
		//return false;
	}

	closeModal() {
		this.modal.classList.remove("modal--is-visible")
		// by returning false this will prevent the browser from scrolling to the top of the page ie. href="#"
		//return false;
	}

	injectModalHTML() {
		document.body.insertAdjacentHTML('beforeend', `
		<div class="modal">
			<div class="modal__inner">
				<h2 class="section-title section-title--blue section-title--less-margin"><img src="assets/images/icons/mail.svg" class="section-title__icon"> Get in <strong>Touch</strong></h2>
				<div class="wrapper wrapper--narrow">
					<p class="modal__description">We will have an online order system in place soon. Until then, connect with us on any of the platforms below!</p>
				</div>
			
				<div class="social-items">
					<a href="#" class="social-items__icon"><img src="assets/images/icons/facebook.svg" alt="Facebook"></a>
					<a href="#" class="social-items__icon"><img src="assets/images/icons/twitter.svg" alt="Twitter"></a>
					<a href="#" class="social-items__icon"><img src="assets/images/icons/instagram.svg" alt="Instagram"></a>
					<a href="#" class="social-items__icon"><img src="assets/images/icons/youtube.svg" alt="YouTube"></a>
				</div>
			</div>
		<div class="modal__close">X</div>
	  </div>
		`)
	  }
}

export default Modal;