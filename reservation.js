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
    var payload = {
      fullName: (form.querySelector('input[name="fullName"]') || {}).value || '',
      email: (form.querySelector('input[name="email"]') || {}).value || '',
      phone: (form.querySelector('input[name="phone"]') || {}).value || '',
      guests: (form.querySelector('input[name="guests"]') || {}).value || '',
      reservationDate: (form.querySelector('input[name="reservationDate"]') || {}).value || '',
      reservationTime: (form.querySelector('input[name="reservationTime"]') || {}).value || '',
      occasion: (form.querySelector('select[name="occasion"]') || {}).value || '',
      specialRequest: (form.querySelector('textarea[name="specialRequest"]') || {}).value || ''
    };

    try {
      localStorage.setItem('reservationInvoiceData', JSON.stringify(payload));
    } catch (err) {
      // Fallback: ignore storage errors and still submit to Formspree.
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    // Open invoice in current tab after the Formspree thank-you opens in new tab.
    window.setTimeout(function () {
      window.location.href = 'reservation-invoice.html';
    }, 300);
  });
})();
