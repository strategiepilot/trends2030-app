# Übergabe-Anleitung für den Dienstleister (Deployment)

Diese Dokumentation dient als Kurzanleitung für das Deployment der **Retail Trends 2030** Plattform auf einem neuen Webspace.

---

## 1. Deployment (Webspace / FTP)

Die App ist eine statische Single-Page-Application (SPA) auf Basis von React und Vite.

1.  **Quelle**: Alle Dateien im Ordner `dist/` (aus dem Paket `Trends2030_Handover_Production.zip`).
2.  **Ziel**: Kopieren Sie den gesamten Inhalt von `dist/` direkt in das Web-Verzeichnis (z. B. `html/`, `public_html/` oder `/`) auf dem Zielserver.
3.  **Wichtig**: Stellen Sie sicher, dass alle Unterordner (`assets/`, `Visuals/`) mit kopiert werden.

---

## 2. Web3Forms Einrichtung & Umgebungsvariablen (Kritischer Schritt!)

Das Lead-Gen-Formular nutzt den Dienst **Web3Forms**. Zur Absicherung der Zugangsdaten wird der API-Access-Key über eine Umgebungsvariable geladen.

1. **Access Key besorgen**:
   - Gehen Sie auf [web3forms.com](https://web3forms.com/).
   - Geben Sie die gewünschte Ziel-E-Mail-Adresse für den Empfang der Leads an.
   - Sie erhalten sofort Ihren persönlichen Access Key (z. B. `967af52e-f6db-4b2b-9068-f316ec95e32e`) per E-Mail.

2. **Umgebungsvariable einrichten**:
   - **Lokal**: Erstellen Sie eine `.env`-Datei im Stammverzeichnis (siehe `.env.example`) und tragen Sie den Key dort ein:
     ```env
     VITE_WEB3FORMS_ACCESS_KEY=ihr_web3forms_access_key
     ```
   - **Produktion (Vercel)**: Öffnen Sie Ihr Vercel-Dashboard, navigieren Sie zu den **Settings -> Environment Variables** Ihres Projekts, und fügen Sie eine neue Variable hinzu:
     - Name: `VITE_WEB3FORMS_ACCESS_KEY`
     - Value: `[Ihr Web3Forms Access Key]`
   - Nach dem Speichern wird der Key bei jedem automatischen Push auf den `main`-Branch automatisch in das Production-Bundle injiziert.

---

## 3. Konfiguration anpassen

Falls die Empfänger-E-Mail-Adresse oder andere statische Pfade geändert werden sollen:

- **Datei**: `src/data/settings.json` (im Source-Paket editieren und neu builden)
- **Felder**:
    - `contactEmail`: Angezeigte E-Mail-Adresse.
    - `formSubmitEndpoint`: Der AJAX-Endpunkt für Web3Forms (standardmäßig "https://api.web3forms.com/submit").

---

## 4. Kontakt bei Rückfragen

Bei technischen Fragen zur Implementierung wenden Sie sich bitte an:  
**Andreas Barth** ([abarth@bavaria-group.com](mailto:abarth@bavaria-group.com))
