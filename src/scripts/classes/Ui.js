import * as DOM from '../functions/selectors.js'
import * as FUNC from '../functions/functions.js'

export class UI {
    showPictures(pictures = []) {
        this.cleanQueryContainer()

        pictures.forEach(picture => {
            DOM.queryContainer.appendChild(
                this.getPictureHTML(picture)
            )
        })
    }

    getPictureHTML({ previewURL, largeImageURL, tags, views, likes, user, userImageURL }) {
        const pictureHTML = FUNC.createHTML({clases: ['picture__item']})
        const pictureHead = this.getPictureHeadHTML(user, userImageURL)
        const pictureImage = this.getPictureImageHTML(previewURL, largeImageURL)
        const pictureInfo = this.getPictureInfoHTML(tags, views, likes)

        pictureHTML.appendChild(pictureHead)        
        pictureHTML.appendChild(pictureImage)        
        pictureHTML.appendChild(pictureInfo)        
        return pictureHTML
    }

    showPaginator(iterator, textQuery) {
        this.cleanPaginatorContainer()

        while (true) {
            const { value, done } = iterator.next()
            const buttonPageHTML = FUNC.createHTML({ type: 'button' })
            if (done) return
            
            buttonPageHTML.textContent = value
            buttonPageHTML.onclick = _ => {
                this.perPageQuery(textQuery, value)
                document.scrollingElement.scrollTop = 0
            }
            DOM.queryPaginator.appendChild(buttonPageHTML)
        }
    }

    cleanQueryContainer() {
        while (DOM.queryContainer.firstChild) DOM.queryContainer.lastChild.remove()
    }

    cleanPaginatorContainer() {
        while (DOM.queryPaginator.firstChild) DOM.queryPaginator.lastChild.remove()
    }

    cleanFullHDContainer() {
        while(DOM.fullImageContainer.firstChild) DOM.fullImageContainer.lastChild.remove()
    }

    getPictureHeadHTML(user, userImageURL) {
        const url = userImageURL || './public/images/_profile_default.jpg'
        const head = FUNC.createHTML({clases: ['picture__head']})
        const imageUser = FUNC.createHTML({ clases: ['head__image__user'] })
        const image = FUNC.createHTML({type: 'img', url: url, alt: 'Test'})
        const nameUser = FUNC.createHTML({ class: ['head__name__user'], text: user })
        
        imageUser.appendChild(image)
        head.appendChild(imageUser)
        head.appendChild(nameUser)
        return head
    }

    getPictureImageHTML(previewURL, largeImageURL) {
        const url = previewURL || './favicon.png'
        const content = FUNC.createHTML({ clases: ['picture__content'] })
        const image = FUNC.createHTML({ type: 'img', url: url, alt: 'Test' })

        const section = FUNC.createHTML({type: 'section', clases: ['section__show']})
        const sectionContainer = FUNC.createHTML({clases: ['show__container']})
        const imageFullHD = FUNC.createHTML({ type: 'img', url: largeImageURL, alt: 'tets' })
        const btnCloseImage = FUNC.createHTML({ type: 'button', text: 'x', clases: ['btn__close'] })
        
        btnCloseImage.onclick = _ => {
            section.remove()
        }
        content.onclick = _ => {
            sectionContainer.appendChild(imageFullHD)
            sectionContainer.appendChild(btnCloseImage)
            section.appendChild(sectionContainer)
            DOM.main.appendChild(section)
        }
        content.appendChild(image)
        return content
    }
    getPictureInfoHTML(tags, views, likes) {
        const infoHTML = FUNC.createHTML({ clases: ['picture__info'] })
        const tagsHTML = this.getTagsHTML(tags)
        const viewsHTML = this.getViewsHTML(views)
        const likesHTML = this.getLikesHTML(likes)

        infoHTML.appendChild(tagsHTML)
        infoHTML.appendChild(viewsHTML)
        infoHTML.appendChild(likesHTML)
        return infoHTML
    }
    
    getTagsHTML(tags) {
        const content = FUNC.createHTML({clases: ['info__tags']})
        tags.split(', ').forEach(tag => {
            const span = FUNC.createHTML({ type: 'span', text: `#${tag}` })
            content.appendChild(span)
        })
        
        return content
    }

    getViewsHTML(views) {
        const content = FUNC.createHTML({clases: ['info__views']})
        const iconSpan = FUNC.createHTML({ type: 'span' })
        const icon = FUNC.createHTML({ type: 'i', clases: ['far', 'fa-eye'] })
        const viewsSpan = FUNC.createHTML({ type: 'span', text: views })
        
        iconSpan.appendChild(icon)
        content.appendChild(iconSpan)
        content.appendChild(viewsSpan)
        return content
    }

    getLikesHTML(likes) {
        const content = FUNC.createHTML({clases: ['info__likes']})
        const iconSpan = FUNC.createHTML({ type: 'span' })
        const icon = FUNC.createHTML({ type: 'i', clases: ['far', 'fa-heart'] })
        const viewsSpan = FUNC.createHTML({ type: 'span', text: likes })

        iconSpan.appendChild(icon)
        content.appendChild(iconSpan)
        content.appendChild(viewsSpan)
        return content
    }
}