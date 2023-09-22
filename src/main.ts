import '@picocss/pico';
import './styles.css'
// the order of the CSS imports is IMPORTANT, DO NOT change it!!!
import { generateCubeGlyphs, getRandomGlyphs } from './logic/glyphs';
import { switchTheme } from './logic/theme';

interface Elements {
	themeSwitch?: HTMLButtonElement;
	galaxyInput?: HTMLSelectElement;
	die?: HTMLButtonElement;
	glyphOutput?: HTMLOutputElement;
	glyphOutputAdditional?: HTMLUListElement,
}

const ids: { [key: string]: string } = {
	themeSwitch: 'themeSwitch',
	galaxyInput: 'galaxyInput',
	die: 'die',
	glyphOutput: 'glyphOutput',
	glyphOutputAdditional: 'glyphOutputAdditional',
}

const elements: Elements = {};

for (const id in ids) {
	//@ts-ignore the keys are of type any, because for some reason TS can't handle it...
	elements[id] = document.getElementById(id);
}

// add handlers
if (elements.die) elements.die.onclick = () => showRandomGlyphs();
if (elements.themeSwitch) elements.themeSwitch.onclick = () => switchTheme();

// this is the main function that gets called when you press the button
function showRandomGlyphs(): void {
	const glyphs = getRandomGlyphs();
	displayGlyphs(glyphs);
}

function displayGlyphs(glyphs: string): void {
	const output = elements.glyphOutput;
	const additionalOutput = elements.glyphOutputAdditional;
	if (!output || !additionalOutput) return;
	output.innerText = glyphs.toUpperCase();

	const additionalGlyphs = generateCubeGlyphs(glyphs);
	const htmlCode = [];
	for (const glyph of additionalGlyphs) {
		const li = document.createElement('li');
		li.classList.add('glyphs');
		li.innerText = glyph.toUpperCase();
		htmlCode.push(li.outerHTML);
	}

	additionalOutput.innerHTML = htmlCode.join('');
}