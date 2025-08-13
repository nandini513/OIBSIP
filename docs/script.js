document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("ageForm");
  const dobInput = document.querySelector("input[name='dob']");

  if (form && dobInput) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const dobValue = new Date(dobInput.value);
      const today = new Date();

      // Remove existing error if any
      const oldMsg = document.querySelector(".error-msg");
      if (oldMsg) oldMsg.remove();

      if (dobValue > today) {
        const msg = document.createElement("div");
        msg.className = "error-msg";
        msg.style.color = "red";
        msg.style.marginTop = "10px";
        msg.textContent = "Date of birth cannot be in the future.";
        form.appendChild(msg);
      } else {
        // Store DOB in localStorage and redirect
        localStorage.setItem("dob", dobInput.value);
        window.location.href = "in.html";
      }
    });
  }

  // On the result page
  if (window.location.pathname.includes("in.html")) {
    const dobStored = localStorage.getItem("dob");

    if (dobStored) {
      const dob = new Date(dobStored);
      const today = new Date();

      let years = today.getFullYear() - dob.getFullYear();
      let months = today.getMonth() - dob.getMonth();
      let days = today.getDate() - dob.getDate();

      if (days < 0) {
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      const resultText = `${years} years<br>${months} months<br>${days} days`;
      const resultPara = document.getElementById("result");
      if (resultPara) {
        resultPara.innerHTML = resultText;
      }
    }
  }
});

