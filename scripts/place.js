if (document.getElementById("currentyear")) {
	document.getElementById("currentyear").textContent = new Date().getFullYear();
}
if (document.getElementById("lastupdated")) {
	document.getElementById("lastupdated").textContent = document.lastModified;
}

function calculateWindChill(temperature, windSpeed) {
	return 13.12 + 0.6215 * temperature - 11.37 * windSpeed ** 0.16 + 0.3965 * temperature * windSpeed ** 0.16;
}

const temperature = 20;
const windSpeed = 15;
const windChill = document.getElementById("windChill");

if (temperature <= 10 && windSpeed > 4.8 && windChill) {
	windChill.textContent = `${calculateWindChill(temperature, windSpeed).toFixed(1)}°C`;
}