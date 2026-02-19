(function () {
  var dataRaw = '';
  try {
    dataRaw = localStorage.getItem('reservationInvoiceData') || '';
  } catch (err) {
    dataRaw = '';
  }

  var data = {};
  try {
    data = dataRaw ? JSON.parse(dataRaw) : {};
  } catch (err) {
    data = {};
  }

  var safe = function (value) {
    return value && String(value).trim() ? String(value).trim() : '-';
  };

  var setText = function (id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = safe(value);
  };

  setText('invFullName', data.fullName);
  setText('invEmail', data.email);
  setText('invPhone', data.phone);
  setText('invGuests', data.guests);
  setText('invDate', data.reservationDate);
  setText('invTime', data.reservationTime);
  setText('invOccasion', data.occasion);
  setText('invNotes', data.specialRequest);

  var generatePdf = function () {
    if (!window.jspdf || !window.jspdf.jsPDF) {
      return;
    }

    var doc = new window.jspdf.jsPDF();
    var marginLeft = 14;
    var y = 18;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('VOJON ROSIK RESTAURANT Pvt. Ltd', marginLeft, y);
    y += 8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text('Reservation Invoice / Confirmation', marginLeft, y);
    y += 10;

    var addRow = function (label, value) {
      doc.setFont('helvetica', 'bold');
      doc.text(label + ':', marginLeft, y);
      doc.setFont('helvetica', 'normal');
      doc.text(safe(value), marginLeft + 55, y);
      y += 7;
    };

    addRow('Full Name', data.fullName);
    addRow('Email', data.email);
    addRow('Mobile', data.phone);
    addRow('Guests', data.guests);
    addRow('Date', data.reservationDate);
    addRow('Time', data.reservationTime);
    addRow('Occasion', data.occasion);

    doc.setFont('helvetica', 'bold');
    doc.text('Special Instructions:', marginLeft, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    var notes = safe(data.specialRequest);
    var wrapped = doc.splitTextToSize(notes, 180);
    doc.text(wrapped, marginLeft, y);
    y += wrapped.length * 6;

    doc.setFont('helvetica', 'italic');
    doc.text('This invoice confirms your reservation request.', marginLeft, y + 6);

    doc.save('reservation-invoice.pdf');
    return doc;
  };

  var downloadBtn = document.getElementById('downloadInvoiceBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function () {
      generatePdf();
    });
  }

  window.addEventListener('load', function () {
    generatePdf();
  });
})();
