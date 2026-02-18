const membershipForm = document.getElementById("membershipForm");
const membershipFile = document.getElementById("membershipFile");
const fileError = document.getElementById("fileError");

const setFileError = (message) => {
  if (!fileError || !membershipFile) {
    return;
  }

  if (message) {
    fileError.textContent = message;
    fileError.hidden = false;
    membershipFile.setCustomValidity(message);
  } else {
    fileError.textContent = "";
    fileError.hidden = true;
    membershipFile.setCustomValidity("");
  }
};

const handleFileValidation = () => {
  if (!membershipFile) {
    return;
  }

  const file = membershipFile.files && membershipFile.files[0];

  if (!file) {
    setFileError("Please upload your membership PDF.");
    return;
  }

  const hasPdfExt = file.name ? file.name.trim().toLowerCase().endsWith(".pdf") : false;
  const isPdfType = file.type === "application/pdf" || file.type === "";

  if (!hasPdfExt || !isPdfType) {
    setFileError("Invalid file. Please upload a PDF.");
    membershipFile.value = "";
    return;
  }

  setFileError("");
};

if (membershipFile) {
  membershipFile.addEventListener("change", handleFileValidation);
}

if (membershipForm) {
  membershipForm.addEventListener("submit", (event) => {
    handleFileValidation();

    if (!membershipForm.checkValidity()) {
      event.preventDefault();
    }
  });
}
