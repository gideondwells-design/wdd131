if (document.getElementById("currentyear")) {
	document.getElementById("currentyear").textContent = new Date().getFullYear();
}
if (document.getElementById("lastupdated")) {
	document.getElementById("lastupdated").textContent = document.lastModified;
}

const interestForm = document.querySelector("#interest-form");
const interestTally = document.querySelector("#interest-tally");
const interestTallyKey = "shsArcheryInterestTally";

if (interestForm && interestTally) {
	const updateInterestTally = () => {
		const savedCount = Number(localStorage.getItem(interestTallyKey));
		const count = Number.isSafeInteger(savedCount) && savedCount >= 0 ? savedCount : 0;
		interestTally.textContent = `Interest registrations saved on this device: ${count}`;
		return count;
	};

	updateInterestTally();
	interestForm.addEventListener("submit", (event) => {
		event.preventDefault();
		localStorage.setItem(interestTallyKey, String(updateInterestTally() + 1));
		updateInterestTally();
		interestForm.reset();
	});
}

const siteHeader = document.querySelector("header");

if (siteHeader) {
	const updateHeaderAppearance = () => {
		siteHeader.classList.toggle("at-top", window.scrollY === 0);
	};

	updateHeaderAppearance();
	window.addEventListener("scroll", updateHeaderAppearance, { passive: true });
}

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.getElementById("site-navigation");

if (menuToggle && navigation) {
	menuToggle.addEventListener("click", () => {
		const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
		menuToggle.setAttribute("aria-expanded", String(!isExpanded));
		menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
		navigation.hidden = isExpanded;
	});

	navigation.addEventListener("click", (event) => {
		if (event.target instanceof HTMLAnchorElement) {
			navigation.hidden = true;
			menuToggle.setAttribute("aria-expanded", "false");
			menuToggle.setAttribute("aria-label", "Open navigation menu");
		}
	});
}