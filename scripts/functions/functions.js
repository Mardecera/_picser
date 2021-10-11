const createHTML = ({ type = 'div', clases = [], text = '', url = '', alt = '' } = {}) => {
    const element = document.createElement(type)
    element.textContent = text
    clases.forEach(clas => element.classList.add(clas))

    if (!!url) element.src = url
    if (!!alt) element.alt = alt

    return element
}

export { createHTML }