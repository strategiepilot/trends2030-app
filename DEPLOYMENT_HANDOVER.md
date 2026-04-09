# Übergabe-Anleitung für den Dienstleister (Deployment)

Diese Dokumentation dient als Kurzanleitung für das Deployment der **Retail Trends 2030** Plattform auf einem neuen Webspace.

---

## 1. Deployment (Webspace / FTP)

Die App ist eine statische Single-Page-Application (SPA) auf Basis von React und Vite.

1.  **Quelle**: Alle Dateien im Ordner `dist/` (aus dem Paket `Trends2030_Handover_Production.zip`).
2.  **Ziel**: Kopieren Sie den gesamten Inhalt von `dist/` direkt in das Web-Verzeichnis (z. B. `html/`, `public_html/` oder `/`) auf dem Zielserver.
3.  **Wichtig**: Stellen Sie sicher, dass alle Unterordner (`assets/`, `Visuals/`) mit kopiert werden.

---

## 2. FormSubmit Aktivierung (Kritischer Schritt!)

Das Lead-Gen-Formular nutzt den Dienst **FormSubmit.co**. Sobald die Seite auf der finalen Domain (z.B. `ihre-domain.de`) live ist, muss der Dienst einmalig für diese Domain aktiviert werden:

1.  **Test-Absendung**: Rufen Sie die Live-Seite auf und senden Sie das Download-Formular einmal mit Testdaten ab.
2.  **Aktivierungs-E-Mail**: Der Empfänger (siehe `settings.json` -> `contactEmail`) erhält sofort eine E-Mail von FormSubmit mit dem Betreff **"Action Required: Confirm your FormSubmit site"**.
3.  **Bestätigung**: Klicken Sie in dieser E-Mail auf den Button **"Activate Form"**.
4.  **Fertig**: Erst nach diesem Klick werden alle weiteren Formular-Eingaben an den Empfänger weitergeleitet.

---

## 3. Konfiguration anpassen

Falls die Empfänger-E-Mail-Adresse oder andere statische Pfade geändert werden sollen:

- **Datei**: `src/data/settings.json` (im Source-Paket editieren und neu builden)
- **Felder**:
    - `contactEmail`: Angezeigte E-Mail-Adresse.
    - `formSubmitEndpoint`: Der AJAX-Endpunkt für FormSubmit.

---

## 4. Kontakt bei Rückfragen

Bei technischen Fragen zur Implementierung wenden Sie sich bitte an:  
**Andreas Barth** ([abarth@bavaria-group.com](mailto:abarth@bavaria-group.com))
