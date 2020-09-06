const initSettingsJavaExecutableSelect = document.getElementById('settings-java-executable-select');
const initSettingsJavaExecutableTextField = document.getElementById('settings-java-executable-textfield');

function initSettingsJavaExecutableTab() {
    initSettingsJavaExecutableTextField.setAttribute("value", ConfigManager.getJavaExecutable());
}

initSettingsJavaExecutableSelect.onchange = (e) => {
    initSettingsJavaExecutableSelect.previousElementSibling.value = initSettingsJavaExecutableSelect.files[0].path;
}