document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      // Get the status message element
      const statusMessage = document.getElementById("status-message");
      statusMessage.textContent = "Sending message...";

      // Get form values
      const templateParams = {
        from_name: document.getElementById("formName").value,
        from_email: document.getElementById("formEmail").value,
        message: document.getElementById("message").value,
        to_name: "Vatsal Saxena",
      };

      // Send email using EmailJS with your actual service and template IDs
      emailjs.send("service_uu2xf55", "template_znhg5hj", templateParams).then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          statusMessage.textContent = "Message sent successfully!";
          document.getElementById("contact-form").reset();
          document.getElementById("contact-form").style.display = "none";
        },
        function (error) {
          console.log("FAILED...", error);
          statusMessage.textContent =
            "Failed to send message. Please try again.";
        }
      );
    });
});

// 4T-nuIusr_WSXK11D - public key
// service_uu2xf55 - service id
// template_znhg5hj - template id
