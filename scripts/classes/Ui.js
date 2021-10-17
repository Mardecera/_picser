import * as DOM from '../functions/selectors.js'
import * as FUNC from '../functions/functions.js'

export class UI {
    showPictures(pictures = []) {
        this.cleanQueryContainer()
        const fragment = document.createDocumentFragment()
        const template = document.querySelector('#template__picture').content
        const $template = (query) => template.querySelector(query)
        const $$template = (query) => template.querySelectorAll(query)

        pictures.forEach(
            ({
                previewURL,
                largeImageURL,
                tags,
                views,
                likes,
                user,
                userImageURL,
            }) => {
                tags = tags.split(', ')
                const url = userImageURL || './images/_profile_default.jpg'
                $template('.head__image__user img').src = url
                $template('.head__name__user').textContent = user
                $template('.picture__content img').src = previewURL
                $template('.info__views .content').textContent = views
                $template('.info__likes .content').textContent = likes
                $$template('.info__tags span')[0].textContent = `#${tags[0]}`
                $$template('.info__tags span')[1].textContent = `#${tags[1]}`
                $$template('.info__tags span')[2].textContent = `#${tags[2]}`

                const clone = template.cloneNode(true)
                clone.querySelector('.picture__content').onclick = () => {
                    this.getPictureImageHTML(largeImageURL)
                }
                fragment.appendChild(clone)
            }
        )

        DOM.queryContainer.appendChild(fragment)
    }

    getPictureImageHTML(largeImageURL) {
        const template = document.querySelector('#template__sect_show').content
        const $template = (query) => template.querySelector(query)

        $template('.section__show img').src = largeImageURL

        const clone = template.cloneNode(true)
        clone.querySelector('.btn__close').onclick = (event) => {
            event.target.parentNode.parentNode.remove()
        }

        DOM.main.appendChild(clone)
    }

    showLoader() {
        const template = document.querySelector('#template__loader').content
        const clone = template.cloneNode(true)
        DOM.sectionPictures.appendChild(clone)
    }

    quitLoader() {
        DOM.sectionPictures.querySelector('.loader').remove()
    }

    showPaginator(iterator, textQuery) {
        this.cleanPaginatorContainer()

        while (true) {
            const { value, done } = iterator.next()
            const buttonPageHTML = FUNC.createHTML({ type: 'button' })
            if (done) return

            buttonPageHTML.textContent = value
            if (value == 1) buttonPageHTML.classList.add('active')
            buttonPageHTML.onclick = (_) => {
                this.cleanActivePaginator()
                this.perPageQuery(textQuery, value)
                document.scrollingElement.scrollTop = 0
                buttonPageHTML.classList.add('active')
            }
            DOM.queryPaginator.appendChild(buttonPageHTML)
        }
    }

    cleanActivePaginator() {
        const buttons = document.querySelectorAll('.pictures__paginator button')
        buttons.forEach((button) => {
            button.classList.remove('active')
        })
    }

    cleanQueryContainer() {
        while (DOM.queryContainer.firstChild)
            DOM.queryContainer.lastChild.remove()
    }

    cleanPaginatorContainer() {
        while (DOM.queryPaginator.firstChild)
            DOM.queryPaginator.lastChild.remove()
    }

    cleanFullHDContainer() {
        while (DOM.fullImageContainer.firstChild)
            DOM.fullImageContainer.lastChild.remove()
    }
}
