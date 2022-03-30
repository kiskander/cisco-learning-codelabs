var topElement = document.getElementsByTagName("google-codelab")[0];
var title = topElement.getAttribute("codelab-title");
var authors = topElement.getAttribute("authors");
var updated = topElement.getAttribute("updated");
(updated = new Date(updated)), (updated = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ")[updated.getMonth()] + " " + updated.getUTCDate() + ", " + updated.getFullYear());
console.log(title);
console.log(authors);
console.log(updated);

var steps = document.getElementsByTagName("google-codelab-step");

var innerBeforeIntruction = document.querySelectorAll(".instructions")[0];
var innerBefore = steps[0].querySelectorAll(".instructions .inner")[0];

var innerNewTitleInstruction = document.createElement("div");
innerNewTitleInstruction.className = "instructions about-title";

var innerTitle = document.createElement("div");
innerTitle.className = "inner inner-title";
innerTitle.innerHTML = `
        ${title}
        `;
innerNewTitleInstruction.append(innerTitle);

var innerNewAboutInstruction = document.createElement("div");
innerNewAboutInstruction.className = "instructions about-card";

var innerAbout = document.createElement("div");
innerAbout.className = "inner about-this-codelab";
innerAbout.innerHTML = `About`;
innerNewAboutInstruction.append(innerAbout);

var innerAuthor = document.createElement("div");
innerAuthor.className = "inner-author";
innerAuthor.innerHTML = `<i class="material-icons" style="font-size:25px;">account_circle</i> Written by ${authors}`;
innerNewAboutInstruction.append(innerAuthor);

var innerUpdated = document.createElement("div");
innerUpdated.className = "inner-update";
innerUpdated.innerHTML = `Updated ${updated}`;
innerNewAboutInstruction.append(innerUpdated);

steps[0].insertBefore(innerNewTitleInstruction, innerBeforeIntruction);
steps[0].insertBefore(innerNewAboutInstruction, innerBeforeIntruction);
