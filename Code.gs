/* ============================================================
   RSVP / UCAPAN - Ndah & Hapid
   Cara pakai:
   1. Buat Google Sheet, rename Sheet1 jadi "Ucapan"
   2. Baris 1 (header): Timestamp | Nama | Kehadiran | Jumlah Tamu | Ucapan
   3. File > Setelan > Zona waktu: (GMT+07:00) Jakarta
   4. Ekstensi > Apps Script > hapus isi editor > paste file ini > Simpan
   5. Deploy > New deployment > Web app
      - Execute as: Me
      - Who has access: Anyone
      > Deploy > salin URL Web App
   6. Di index.html ganti PASTE_URL_WEB_APP_DISINI dengan URL tadi
   ============================================================ */

const SHEET_NAME = 'Ucapan';

function doGet() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const rows = sh.getDataRange().getValues();
  const wishes = [];
  for (let i = rows.length - 1; i >= 1; i--) {
    wishes.push({
      timestamp: rows[i][0],
      nama: rows[i][1],
      kehadiran: rows[i][2],
      tamu: rows[i][3],
      ucapan: rows[i][4]
    });
  }
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, count: wishes.length, wishes: wishes }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const now = new Date();
  sh.appendRow([now, d.nama, d.kehadiran, d.tamu, d.ucapan]);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, timestamp: now }))
    .setMimeType(ContentService.MimeType.JSON);
}
