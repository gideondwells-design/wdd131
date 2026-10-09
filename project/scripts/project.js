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
const eventLoadMarker = document.querySelector("#event-load-marker");

if (eventList && eventLoadMarker) {
	const batchSize = 3;
	let nextEventIndex = 0;
	let eventObserver;

	const loadNextEvents = () => {
		const nextEvents = archeryEvents.slice(nextEventIndex, nextEventIndex + batchSize);
		const fragment = document.createDocumentFragment();

		nextEvents.forEach(({ event, date }) => {
			const listItem = document.createElement("li");
			const eventName = document.createElement("h3");
			const eventDate = document.createElement("p");

			eventName.textContent = event;
			eventDate.textContent = date;
			listItem.append(eventName, eventDate);
			fragment.append(listItem);
		});

		eventList.append(fragment);
		nextEventIndex += nextEvents.length;

		if (nextEventIndex >= archeryEvents.length) {
			eventLoadMarker.hidden = true;
			eventObserver?.disconnect();
		}
	};

	loadNextEvents();

	if ("IntersectionObserver" in window) {
		eventObserver = new IntersectionObserver((entries) => {
			if (entries.some((entry) => entry.isIntersecting)) {
				loadNextEvents();
			}
		}, { rootMargin: "0px" });
		eventObserver.observe(eventLoadMarker);
	} else {
		while (nextEventIndex < archeryEvents.length) {
			loadNextEvents();
		}
	}
}
