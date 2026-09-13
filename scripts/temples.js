
if (document.getElementById("currentyear")) {
	document.getElementById("currentyear").textContent = new Date().getFullYear();
}
if (document.getElementById("lastupdated")) {
	document.getElementById("lastupdated").textContent = document.lastModified;
}
defer(function() {
    const templeImages = document.querySelectorAll('img[alt^="Temple"]');
    templeImages.forEach((img) => {
        img.addEventListener('click', () => {
            const templeNumber = img.alt.split(' ')[1];
            alert(`You clicked on Temple ${templeNumber}`);
        });
    });
})
