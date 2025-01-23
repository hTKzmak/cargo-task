function showWindow(value) {
    const formHtml = `
        <div class="window-container">
            <div class="win">
                <button class="close-window" onclick="document.querySelector('.window-container').remove()"><img src="./icons/close.svg" alt="Close"></button>
                <h1>${value}</h1>
            </div>
        </div>
        `
    ;


    document.body.innerHTML += formHtml;
}