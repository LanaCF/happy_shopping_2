export const renderHeader = (config, headerParts) => {
    const parent = document.querySelector('.header-wrapper');
    // parent.innerHTML = '';
    const headerContent = config.parts.reduce((acc, item) => acc + headerParts[item], '');
    const headerEl = `<div class="header-block">${ headerContent }</div>`;

    parent.insertAdjacentHTML('afterbegin', headerEl);
}