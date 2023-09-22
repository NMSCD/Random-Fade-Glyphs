import { getRandomNumber } from './randomGenerator';

function dec2HexWithPad(num: number, pad: number = 0) {
	return num.toString(16).padStart(pad, '0');
}

function getRandomRegion(x: number, y: number, z: number) {

	const [xStr, zStr] = [x, z].map(num => dec2HexWithPad(num, 3));
	const yStr = dec2HexWithPad(y, 2);

	const coordTemplates: string[] = [
		yStr + zStr + '7FF',
		yStr + '7FF' + xStr,
		'7F' + zStr + xStr,
		'81' + zStr + xStr,
	]

	const index = getRandomNumber(0, 3);	// NoSonar need a number between 0-3

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

const extractCoordinate = (glyphs: string, index: number) => glyphs.slice(index, index + (index === 4 ? 2 : 3));

export function generateCubeGlyphs(glyphs: string): string[] {
	const boundaries = {
		x: ['801', '7FF'],
		y: ['81', '7F'],
		z: ['801', '7FF'],
	}

	const x = extractCoordinate(glyphs, 9);
	const y = extractCoordinate(glyphs, 4);
	const z = extractCoordinate(glyphs, 6);

	const xDec = parseInt(x, 16);
	const yDec = parseInt(y, 16);
	const zDec = parseInt(z, 16);

	const xIsMax = boundaries.x[1] === x;
	const yIsMax = boundaries.y[1] === y;
	const zIsMax = boundaries.z[1] === z;

	const cubeCoords: number[][] = [];

	cubeCoords.push([yDec, zDec, xIsMax ? xDec - 1 : xDec + 1]);	// x
	cubeCoords.push([yIsMax ? yDec - 1 : yDec + 1, zDec, xDec]);	// y
	cubeCoords.push([yDec, zIsMax ? zDec - 1 : zDec + 1, xDec]);	// z
	cubeCoords.push([yIsMax ? yDec - 1 : yDec + 1, zDec, xIsMax ? xDec - 1 : xDec + 1]);	// y + x
	cubeCoords.push([yDec, zIsMax ? zDec - 1 : zDec + 1, xIsMax ? xDec - 1 : xDec + 1]);	// x + z
	cubeCoords.push([yIsMax ? yDec - 1 : yDec + 1, zIsMax ? zDec - 1 : zDec + 1, xDec]);	// y + z
	cubeCoords.push([yIsMax ? yDec - 1 : yDec + 1, zIsMax ? zDec - 1 : zDec + 1, xIsMax ? xDec - 1 : xDec + 1]);	// y + x + z

	console.log(cubeCoords)

	const hexCubeCoords: string[][] = cubeCoords.map(item => convertArrayToHexGlyphs(item));

	return hexCubeCoords.map(item => getRandomPlanet() + getRandomSIV() + item.join(''));
}

function convertArrayToHexGlyphs(coordArray: number[]): string[] {
	const hexCoords = coordArray.map(item => dec2HexWithPad(item, 3));
	hexCoords[0] = hexCoords[0].slice(1);
	return hexCoords;
}