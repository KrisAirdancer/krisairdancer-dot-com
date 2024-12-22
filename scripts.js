function loadComponent(filePath, elementId)
{
	fetch(filePath)
	.then(response => response.text())
	.then(data => {
		document.getElementById(elementId).innerHTML = data;
	})
	.then(() => updateSelectorOption())
	.catch(error => console.error('Error loading HTML:', error));
}
document.addEventListener("DOMContentLoaded", () => loadComponent("https://krisairdancer.com/components/nav-selector.html", "nav-selector"));

function redirectToPage()
{
	let selectorComponent = document.getElementById("nav-selector-component");
	let selectedValue = selectorComponent.value;
	if (selectedValue)
	{
		window.location.href = selectedValue;
	}
}

function updateSelectorOption()
{
	let selectorComponent = document.getElementById("nav-selector-component");
	let selectedValue = selectorComponent.value;

	selectorComponent.querySelector("[selected]").removeAttribute("selected");
	selectorComponent.querySelector(`[value="${window.location.href}"]`).setAttribute("selected", "selected");
}