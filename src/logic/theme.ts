// determine preferred theme and update the html element with the respective tag
(() => {
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	switchTheme(prefersDark ? 'dark' : 'light');
})()

export function switchTheme(theme: string | null = null) {
	const currentTheme = document.documentElement.dataset.theme;
	const computedNewTheme = currentTheme == 'dark' ? 'light' : 'dark';
	const newTheme = theme ?? computedNewTheme;
	document.documentElement.dataset.theme = newTheme;
}