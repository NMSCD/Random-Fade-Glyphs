import { getRandomNumber } from './randomGenerator';

function getRandomRegion(x: number, y: number, z: number) {
	function dec2HexWithPad(num: number, pad: number = 0) {
		return num.toString(16).padStart(pad, '0');
	}

	const [xStr, zStr] = [x, z].map(num => dec2HexWithPad(num, 3));
	const yStr = dec2HexWithPad(y, 2);

	const coordTemplates: string[] = [
		yStr + zStr + '7FF',
		yStr + '7FF' + xStr,
		'7F' + zStr + xStr,
		'81' + zStr + xStr,
	]

	const index = getRandomNumber(0, 3);	// NoSonar need a number between 0-3

	console.log(index, yStr, zStr, xStr, coordTemplates[index])

	return coordTemplates[index];
}

function getRandomSIV(): string {
	const decId = getRandomNumber(1, 767)		// NoSonar 768 is 300 in Hex, which is not possible as a system ID
	const hexId = decId.toString(16).toUpperCase();
	const SIV = hexId.padStart(3, '0');
	return SIV;
}

function getRandomPlanet(): string {
	const planetId = getRandomNumber(1, 6);
	return planetId.toString();
}

export function getRandomGlyphs() {
	const maximumXZ = parseInt('7FF', 16);
	const maximumY = parseInt('FF', 16);
	const x = getRandomNumber(0, maximumXZ);
	const z = getRandomNumber(0, maximumXZ);
	const y = getRandomNumber(0, maximumY);

	const regionGlyphs = getRandomRegion(x, y, z);
	const siv = getRandomSIV();
	const planet = getRandomPlanet();

	return planet + siv + regionGlyphs;
}