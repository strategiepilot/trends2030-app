# Wartung & Pflege: Retail Trends 2030

Diese Dokumentation dient als Leitfaden für die zukünftige Pflege der Plattform „Retail Trends 2030“.

## 1. Inhalte anpassen (JSON)
Fast alle Texte und Konfigurationen sind in JSON-Dateien im Verzeichnis `src/data/` ausgelagert. Änderungen hier erfordern keinen Eingriff in den Programmiercode.

*   **`settings.json`**: Enthält globale Einstellungen wie:
    *   `formSubmitEndpoint`: Die E-Mail-Zieladresse (via FormSubmit).
    *   `impressumUrl` & `datenschutzUrl`: Links zu den rechtlichen Seiten.
    *   `partners`: Logos und Beschreibungen der Herausgeber.
*   **`authors.json`**: Biografien und Rollen des Autoren-Teams.
*   **`trends.json`**: Alle Trend-Daten (Titel, Icons, Beschreibungen).

## 2. Whitepaper-Download (PDF)
Das aktuelle Whitepaper liegt unter `public/Retailtrends2030_WhitepaperDownload.pdf`. 
Um das Whitepaper zu aktualisieren:
1. Ersetzen Sie die Datei im `public/`-Ordner.
2. Stellen Sie sicher, dass der Dateiname in der `settings.json` unter `whitepaperPdf` korrekt hinterlegt ist.

## 3. Leads & Kontaktanfragen
Die Leads werden über den Dienst **FormSubmit** verarbeitet.
*   **Empfänger**: Aktuell `abarth@bavaria-group.com`.
*   **Aktivierung**: Bei einem Wechsel der E-Mail-Adresse muss die neue Adresse einmalig durch Klick auf den Bestätigungslink in der ersten eingehenden Test-Mail von FormSubmit aktiviert werden.

## 4. Deployment
Die Seite wird via Vercel gehostet. Neue Änderungen auf dem `main`-Branch führen automatisch zu einem Redeplyoment.
Manueller Push: `npx vercel --prod`

---
Erstellt am 30. März 2026
