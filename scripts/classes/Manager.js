import { UI} from './Ui.js'

export class Manager extends UI{
    constructor() {
        super()
        this.key = '23627213-761d5f02de43cf41e724ec679'
        this.api = 'https://pixabay.com/api/'
        this.perPage = 20
        this.page = 1
    }

    async query(textQuery = '') {
        const url = `${this.api}?key=${this.key}&q=${textQuery}&per_page=${this.perPage}&page=${this.page}`
        const request = await fetch(url)
        const pictures = await request.json()
        
        this.showPictures(pictures.hits)
        this.showPaginator(
            this.createPaginator(pictures.totalHits),
            textQuery
        )
    }

    async perPageQuery(textQuery = '', page = 1) {
        const url = `${this.api}?key=${this.key}&q=${textQuery}&per_page=${this.perPage}&page=${page}`
        const request = await fetch(url)
        const pictures = await request.json()

        this.showPictures(pictures.hits)
    }

    * createPaginator(totalHits = 10) {
        const pages = Math.ceil(totalHits / this.perPage)

        for (let i = 1; i <= pages; i++) yield i
    }
}