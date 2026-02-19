(function () {
  var nameEl = document.getElementById("cardMemberName");
  var billEl = document.getElementById("cardBillId");
  var downloadBtn = document.getElementById("downloadCard");

  var raw = "";
  try {
    raw = localStorage.getItem("membershipCardData") || "";
  } catch (err) {
    raw = "";
  }

  var data = null;
  try {
    data = raw ? JSON.parse(raw) : null;
  } catch (err) {
    data = null;
  }

  if (nameEl) nameEl.textContent = data && data.memberName ? data.memberName : "";
  if (billEl) billEl.textContent = data && data.billId ? data.billId : "";

  if (downloadBtn) {
    downloadBtn.addEventListener("click", function () {
      window.print();
    });
  }

  // Auto-open print dialog once on load so user can save as PDF.
  window.setTimeout(function () {
    window.print();
  }, 400);
})();
