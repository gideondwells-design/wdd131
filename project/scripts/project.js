if (document.getElementById("currentyear")) {
	document.getElementById("currentyear").textContent = new Date().getFullYear();
}
if (document.getElementById("lastupdated")) {
	document.getElementById("lastupdated").textContent = document.lastModified;
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