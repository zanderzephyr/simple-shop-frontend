/**
 * Reads the saved theme from localStorage and initializes
 * the document color-scheme to prevent startup layout flashes.
 */
function initTheme() {
	const savedTheme = localStorage.getItem('theme');

	if (savedTheme === 'DARK') {
		document.documentElement.style.colorScheme = 'dark';
	} else {
		document.documentElement.style.colorScheme = 'light';
	}
}

initTheme();
