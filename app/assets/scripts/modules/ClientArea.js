import Axios from 'axios'
class ClientArea {
    constructor() {
        this.injectHTML()
        this.form = document.querySelector(".client-area__form")
        this.field = document.querySelector(".client-area__input")
        this.contentArea = document.querySelector(".client-area__content-area")
        this.events()
    }

    events() {
        this.form.addEventListener("submit", e => {
            e.preventDefault()
            this.sendRequest()
        })
    }

    sendRequest() {
        // Could use browsers FETCH functionality - but decided to use 3rd pary package - "axios"
        // Syntax is easier to use

        // Has promise facility
        Axios.post('.netlify/functions/secret-area', {password: this.field.value}).then(response => {
            this.form.remove()
            this.contentArea.innerHTML = response.data
        }).catch(() => {
            this.contentArea.injectHTML = `<p class="client-area__error">Passphrase is incorrect.</p>`
            this.field.value = ''
            this.field.focus()
        })
    }

    injectHTML() {
        document.body.insertAdjacentHTML('beforeend', `
        <div class="client-area">
            <div class="wrapper wrapper--small">
                <h2 class="section-title section-title--blue">Secret Client Area</h2>
                <form class="client-area__form" action="">
                    <input class="client-area__input" type="text" placeholder="Enter the secret phrase">
                    <button class="btn btn--orange btn--shift-right">Submit</button>
                </form>
                <div class="client-area__content-area"></div>
            </div>
        </div>
        `)
    }
}

export default ClientArea