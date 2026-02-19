const membershipForm = document.getElementById("membershipForm");
const submitBtn = document.getElementById("membershipSubmitBtn");

if (membershipForm) {
  membershipForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const payload = {
      memberName: (membershipForm.querySelector("#memberName") || {}).value || "",
      memberContact: (membershipForm.querySelector("#memberContact") || {}).value || "",
      billId: (membershipForm.querySelector("#memberBillId") || {}).value || ""
    };

    try {
      localStorage.setItem("membershipCardData", JSON.stringify(payload));
    } catch (err) {
      // Ignore storage errors and still submit to Formspree.
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Submitting...";
    }

    const formData = new FormData(membershipForm);
    try {
      const response = await fetch(membershipForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        window.location.href = new URL("membership-card.html", window.location.href).href;
      } else if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Apply Now";
      }
    } catch (err) {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Apply Now";
      }
    }
  });
}
