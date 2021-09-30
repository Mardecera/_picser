import * as DOM from '../functions/selectors.js'
import { Manager } from './Manager.js'

export class App{
    constructor() {
        this.init()
        this.MANAGER = new Manager()
    }

    init() {
        window.onload = _ => {
            DOM.form.addEventListener('submit', event => {
                event.preventDefault()
                this.MANAGER.query( DOM.queryForm.value )
            })
            DOM.buttonClean.addEventListener('click', () => {
                event.preventDefault()
                DOM.form.reset()
            })
        }
    }
}