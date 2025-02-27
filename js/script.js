const skillElement = document.querySelector(".skills .box");
// const certificateElement = document.querySelector(".certificates");

// Fetch both skills and certificates
Promise.all([
  fetch("./data/skills.json").then((response) => response.json()),
  //   fetch("./data/certificate.json").then((response) => response.json()),
])
  .then(([skills, certificates]) => {
    // Generate HTML for skills
    const skillsHTML = skills.skills
      .map(
        (element) => `
        <div class="skills-item">
        <img class="${element.animation}" src="./images/skills/${element.image}" alt="${element.alt}">
        <h2>${element.skillName}</h2>
        </div>
      `
      )
      .join("");

    // Generate HTML for certificates
    // const certificatesHTML = certificates.certificates
    //   .map(
    //     (element) => `
    //     <div class="cbox">
    //       <h2>${element.certificateName}</h2>
    //       <img src="./images/${element.image}" alt="${element.alt}">
    //     </div>
    //   `
    //   )
    //   .join("");

    // Update the DOM
    skillElement.innerHTML += skillsHTML;
    // certificateElement.innerHTML = certificatesHTML;
  })
  .catch((error) => console.error("Error fetching data:", error));

// Cursor

const title = document.querySelector(".footer-title");
const text = "Portfolio";
let i = 0;

setInterval(() => {
  title.textContent = text.slice(0, ++i % (text.length + 1));
}, 200);

var cursor = document.querySelector(".cursor");
var cursorinner = document.querySelector(".cursor2");
var a = document.querySelectorAll("a");

document.addEventListener("mousemove", function (e) {
  var x = e.clientX;
  var y = e.clientY;
  cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
});

document.addEventListener("mousemove", function (e) {
  var x = e.clientX;
  var y = e.clientY;
  cursorinner.style.left = x + "px";
  cursorinner.style.top = y + "px";
});

document.addEventListener("mousedown", function () {
  cursor.classList.add("click");
  cursorinner.classList.add("cursorinnerhover");
});

document.addEventListener("mouseup", function () {
  cursor.classList.remove("click");
  cursorinner.classList.remove("cursorinnerhover");
});

a.forEach((item) => {
  item.addEventListener("mouseover", () => {
    cursor.classList.add("hover");
  });
  item.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover");
  });
});


// EmailJS
