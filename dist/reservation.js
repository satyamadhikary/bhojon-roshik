(function () {
  var form = document.getElementById('reservationForm');
  var submitBtn = document.getElementById('reservationSubmitBtn');

  if (!form || !submitBtn) return;

  var dateInput = form.querySelector('input[name="reservationDate"]');
  if (dateInput) {
    var now = new Date();
    var localNow = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    dateInput.min = localNow.toISOString().split('T')[0];
  }

  form.addEventListener('submit', function () {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
  });
})();
