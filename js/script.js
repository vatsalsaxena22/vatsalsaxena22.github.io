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
