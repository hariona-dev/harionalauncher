document.getElementById('welcomeButton').addEventListener('click', e => {
    switchView(VIEWS.whitelist, VIEWS.landing)
})

settingsNavDone.onclick = () => {
    switchView(getCurrentView(), VIEWS.landing)
}