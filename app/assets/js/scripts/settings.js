const { JavaGuard } = require('./assets/js/assetguard')

let currentSettingsPanel;


function setupSettingsTabs() {
    Array.from(document.getElementsByClassName('settingsTab')).map((val) => {
        if (val.hasAttribute('rSc'))
            val.onclick = () => settingsNavItemListener(val);
    });
}

function settingsNavItemListener(ele) {
    var navItems = $(".selected");
    if (navItems.hasClass('settingsTab')) {
        navItems.removeClass("selected");
        navItems.attr("disabled", false);
    }

    let oldPanel = currentSettingsPanel;
    ele.className += ' selected';
    ele.disabled = true;
    currentSettingsPanel = '#' + ele.getAttribute('rSc');

    $(oldPanel).hide();
    $(currentSettingsPanel).fadeIn(250);
}

function initSettings(tab = 'settings-user-compte-panel') {
    initSettingsUserCompteTab();
    initSettingsJavaMemoryTab();
    initSettingsJavaExecutableTab();

    var navItems = $(".selected");
    if (navItems.hasClass('settingsTab')) {
        navItems.removeClass("selected");
        navItems.attr("disabled", false);
    }
    if (currentSettingsPanel != null)
        $(currentSettingsPanel).hide();
    $('#' + tab).fadeIn(250);
    currentSettingsPanel = '#' + tab;
    $('#' + tab + '-button').addClass('selected').prop("disabled", true);
}

setupSettingsTabs();

/**
 * Saves
 */
$("#settings-save-button").click(function() {
    savesSettings();
});

document.addEventListener('keydown', (e) => {
    if (getCurrentView() === VIEWS.settings && e.key === 'Escape')
        switchView(getCurrentView(), VIEWS.launcher);
});

function savesSettings() {
    let maxRam = Number(settingsMaxRAMRange.getAttribute('value'));
    if (maxRam % 1 > 0)
        maxRam = Math.round(maxRam * 1000) + 'M';
    else
        maxRam = Math.round(maxRam) + 'G';
    ConfigManager.setMaxRAM(maxRam);

    let minRam = Number(settingsMinRAMRange.getAttribute('value'));
    if (minRam % 1 > 0)
        minRam = Math.round(minRam * 1000) + 'M';
    else
        minRam = Math.round(minRam) + 'G';
    ConfigManager.setMinRAM(minRam);

    ConfigManager.setJavaExecutable(initSettingsJavaExecutableTextField.value);

    ConfigManager.save();
    switchView(getCurrentView(), VIEWS.landing);
}


function populateJavaExecDetails(execPath){
    const jg = new JavaGuard(DistroManager.getDistribution().getServer(ConfigManager.getSelectedServer()).getMinecraftVersion())
    jg._validateJavaBinary(execPath).then(v => {
        if(v.valid){
            if(v.version.major < 9) {
                settingsJavaExecDetails.innerHTML = `Selected: Java ${v.version.major} Update ${v.version.update} (x${v.arch})`
            } else {
                settingsJavaExecDetails.innerHTML = `Selected: Java ${v.version.major}.${v.version.minor}.${v.version.revision} (x${v.arch})`
            }
        } else {
            settingsJavaExecDetails.innerHTML = 'Invalid Selection'
        }
    })
}