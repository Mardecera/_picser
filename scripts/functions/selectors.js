const $ = (query) => document.querySelector(query)
const $$ = (query) => document.querySelectorAll(query)

const form = $('.section__searcher form')
const queryForm = $('.section__searcher .input input')
const queryContainer = $('.pictures__container')
const queryPaginator = $('.pictures__paginator')
const buttonClean = $('#searcher__clean')
const fullImageContainer = $('.show__container')
const sectionPictures = $('.section__pictures')
const main = $('main')

export {
    form,
    queryForm,
    queryContainer,
    queryPaginator,
    buttonClean,
    fullImageContainer,
    sectionPictures,
    main,
}
