const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];


if (document.getElementById("currentyear")) {
	document.getElementById("currentyear").textContent = new Date().getFullYear();
}
if (document.getElementById("lastupdated")) {
	document.getElementById("lastupdated").textContent = document.lastModified;
}

const REVIEW_COUNT_KEY = "reviewsCompleted";
const REVIEW_PAGE_NAME = "review.html";

function getReviewCount() {
	if (!("localStorage" in window)) {
		return 0;
	}

	const savedValue = Number(window.localStorage.getItem(REVIEW_COUNT_KEY));
	return Number.isFinite(savedValue) && savedValue >= 0 ? savedValue : 0;
}

function incrementReviewCount() {
	if (
		window.location.pathname.toLowerCase().endsWith(REVIEW_PAGE_NAME) &&
		window.location.search &&
		window.location.search.includes("productName")
	) {
		const nextCount = getReviewCount() + 1;
		window.localStorage.setItem(REVIEW_COUNT_KEY, String(nextCount));
	}
}

incrementReviewCount();