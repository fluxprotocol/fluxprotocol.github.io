interface ThemePreference {
    userPrefersDark: boolean;
    userPrefersLight: boolean;
    userHasPreference: boolean;
}

const darkmodeStorageLabel = 'darkmode-active';
const themeAttribute = 'data-theme';
const nightStartHour = 20;
const nightEndHour = 6;

const userThemePreference = (): ThemePreference => {
    const canDetectPreference = Boolean(window.matchMedia);
    const userPrefersDark = canDetectPreference && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const userPrefersLight = canDetectPreference && window.matchMedia('(prefers-color-scheme: light)').matches;

    return {
        userHasPreference: userPrefersDark ?? userPrefersLight ?? false,
        userPrefersDark: userPrefersDark ?? false,
        userPrefersLight: userPrefersLight ?? false,
    };
};

const getStoredDarkmode = (): boolean => {
    return localStorage.getItem(darkmodeStorageLabel) === 'true';
};

const checkIfDarkmodeIsActive = (): boolean => {
    const darkmodeInDocumentTheme = document.documentElement.getAttribute(themeAttribute) === 'dark';
    const darkmodeInStorage = getStoredDarkmode();
    const { userPrefersDark } = userThemePreference();

    return darkmodeInDocumentTheme || darkmodeInStorage || userPrefersDark || false;
};

const setDarkmode = (state: boolean): void => {
    const darkmodeIsStored =  localStorage.getItem(darkmodeStorageLabel) !== null;
    const storedDarkmodeSetting = getStoredDarkmode();

    const shouldBeDarkmode = darkmodeIsStored ? storedDarkmodeSetting : state;
    const siteTheme = shouldBeDarkmode ? 'dark' : 'default';

    document.documentElement.setAttribute(themeAttribute, siteTheme);
};

const storeDarkmode = (state: boolean): void => {
    localStorage.setItem(darkmodeStorageLabel, String(state));
    setDarkmode(state);
};

const checkForNight = (): void => {
    const start = nightStartHour;
    const end = nightEndHour;
    const currentHour = new Date().getHours();

    const isNight = end < start
        ? currentHour >= start || currentHour < end
        : currentHour >= start && currentHour < end;

    setDarkmode(isNight);
};

const applyDarkmodeAtNight = (): void => {
    checkForNight();
    setInterval(checkForNight, 1000 * 60);
};

const initDarkmode = (): void => {
    applyDarkmodeAtNight();
};

export {
    checkIfDarkmodeIsActive,
    initDarkmode,
    setDarkmode,
    storeDarkmode,
    userThemePreference,
};
