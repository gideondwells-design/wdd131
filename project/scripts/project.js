if (document.getElementById("currentyear")) {
	document.getElementById("currentyear").textContent = new Date().getFullYear();
}
if (document.getElementById("lastupdated")) {
	document.getElementById("lastupdated").textContent = document.lastModified;
}

const INTEREST_COUNT_KEY = "shsArcheryInterestCount";
const interestForm = document.querySelector("#interest-form");
const interestTally = document.querySelector("#interest-tally");

function getInterestCount() {
	try {
		const savedCount = Number(window.localStorage.getItem(INTEREST_COUNT_KEY));
		return Number.isSafeInteger(savedCount) && savedCount >= 0 ? savedCount : 0;
	} catch {
		return 0;
	}
}

function updateInterestTally() {
	if (interestTally) {
		interestTally.textContent = `Interest registrations saved on this device: ${getInterestCount()}`;
	}
}

if (interestForm && interestTally) {
	updateInterestTally();
	interestForm.addEventListener("submit", (event) => {
		event.preventDefault();

		try {
			const nextCount = getInterestCount() + 1;
			window.localStorage.setItem(INTEREST_COUNT_KEY, `${nextCount}`);
			updateInterestTally();
			interestForm.reset();
		} catch {
			interestTally.textContent = `Your interest was not saved because browser storage is unavailable.`;
		}
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

const archeryEvents = [
  { event: "Eastern National Bullseye Tournament", date: "5/7 - 5/9" },
  { event: "Madison Spring Fling Bullseye", date: "4/18" },
  { event: " Indiana NASP State Bullseye Tournament", date: "3/21" },
  { event: "Madison March Madness Shootout Bullseye", date: "3/14" },
  { event: "Seymour Middle School State Warm-Up", date: "2/21" },
  { event: "Seymour Invitational and State Qualifier", date: "1/30 - 1/31" },
  { event: "Brownstown Central Schools Bullseye State Qualifier", date: "1/17" }
];

const eventList = document.querySelector("#event-list");

if (eventList) {
	const fragment = document.createDocumentFragment();

	archeryEvents.forEach(({ event, date }) => {
		const listItem = document.createElement("li");
		const eventName = document.createElement("h3");
		const eventDate = document.createElement("p");

		eventName.textContent = event;
		eventDate.textContent = date;
		listItem.append(eventName, eventDate);
		fragment.append(listItem);
	});

	eventList.append(fragment);
}
