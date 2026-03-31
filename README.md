# Retail Trends 2030 – Plattform-Dokumentation

> Ein hochwertiger, interaktiver Trend-Report für die Lebensmittel- und Konsumgüterbranche.  
> Entwickelt in Kooperation von **Bavaria Consulting Group** und **Space and Lemon Innovations**.

---

## Inhaltsverzeichnis

1. [Lokale Entwicklung](#1-lokale-entwicklung)
2. [Deployment & CI/CD](#2-deployment--cicd)
3. [Content-Pflege (ohne Code-Kenntnisse)](#3-content-pflege)
4. [Projektstruktur](#4-projektstruktur)
5. [Sicherheitshinweise](#5-sicherheitshinweise)
6. [Bekannte Limitierungen](#6-bekannte-limitierungen)

---

## 1. Lokale Entwicklung

### Voraussetzungen
- Node.js ≥ 18
- npm ≥ 9

### Setup & Start

```bash
# Repository klonen
git clone https://github.com/strategiepilot/trends2030-app.git
cd trends2030-app

# Abhängigkeiten installieren
npm install

# Dev-Server starten (Port 5173)
npm run dev
```

Der lokale Dev-Server ist erreichbar unter: **http://localhost:5173**

> ⚠️ **Sicherheitshinweis:** Den Dev-Server niemals in öffentlichen oder geteilten Netzwerken laufen lassen. Er nutzt esbuild, das eine bekannte CORS-Schwachstelle im Dev-Modus hat (betrifft nicht das Production-Build).

### Build für Production

```bash
npm run build
```

Das build-Artefakt landet in `./dist/` und kann direkt auf einem Webserver deployed werden.

---

## 2. Deployment & CI/CD

Das Deployment erfolgt vollautomatisch über **Vercel**.

| Aktion | Ergebnis |
|--------|----------|
| Push auf `main` Branch | Automatisches Production-Deployment |
| Manuell via CLI | `npx vercel --prod --yes --force` |

**Live-URL:** [https://retail-trends-2030.vercel.app](https://retail-trends-2030.vercel.app)

> 💡 **Caching-Tipp:** Nach einem neuen Deployment kann der Browser die alte Version cachen. Für einen Hard-Reload: `Cmd+Shift+R` (Mac) bzw. `Strg+F5` (Windows).

---

## 3. Content-Pflege

Alle inhaltlichen Änderungen erfolgen **ausschließlich über JSON-Dateien**. Kein Code-Zugriff erforderlich.

### Dateiübersicht

| Datei | Inhalt |
|-------|--------|
| `src/data/trends.json` | Die 10 Kerntrends (Titel, Beschreibung, Icons, Bilder) |
| `src/data/authors.json` | Autorenprofil (Name, Rolle, Bild, Bio) |
| `src/data/settings.json` | Kontaktemail, FormSubmit-Endpunkt, Partner-Info, URLs |

### trends.json – Felder

```jsonc
{
  "id": "t1",                        // Eindeutige ID (nicht ändern!)
  "category": "technologie",         // "technologie" | "konsum" | "wettbewerb"
  "color": "blue",                   // "blue" | "emerald" | "orange"
  "iconName": "Database",            // Icon-Name aus lucide-react (siehe lucide-map.jsx)
  "image": "/Visuals/grafik_t1.jpg", // Pfad relativ zu /public
  "title": "...",                    // Haupttitel auf der Kachel
  "front": "...",                    // Kurzbeschreibung auf der Kachel (Vorderseite)
  "description": "...",              // Langer Fließtext im Modal
  "retail": "...",                   // Implikation für Händler (Modal)
  "manufacturer": "...",             // Implikation für Hersteller (Modal)
  "drivers": ["...", "..."],         // Bullet-Points "Treiber der Veränderung"
  "hoverTitle": "...",               // Titel auf dem Hover-Overlay der Kachel
  "hoverText": "...",                // Text auf dem Hover-Overlay
  "hoverButton": "..."               // Button-Label auf dem Hover-Overlay
}
```

### authors.json – Felder

```jsonc
{
  "id": "oliver",                         // Eindeutige ID
  "name": "Oliver Bank",                   // Vollständiger Name
  "role": "BC Partner",                    // Rolle/Titel (erscheint unter dem Foto)
  "image": "/Visuals/Foto_Oliver.jpeg",    // Pfad zum Foto in /public/Visuals/
  "bio": "..."                             // Vollständige Biografie (erscheint beim Hover)
}
```

### settings.json – Felder

```jsonc
{
  "contactEmail": "...",            // Empfängeradresse (info-only, nicht direkt verwendet)
  "formSubmitEndpoint": "...",      // FormSubmit AJAX-Endpunkt (nicht ändern ohne Test)
  "formTemplate": "table",          // FormSubmit E-Mail-Template
  "whitepaperPdf": "/...",          // Pfad zum PDF in /public/
  "impressumUrl": "https://...",    // Link zum Impressum auf Bavaria Consulting Website
  "datenschutzUrl": "https://...",  // Link zur Datenschutzerklärung
  "partners": [...]                  // Array der 2 Kooperationspartner (Logo, Name, Beschreibung)
}
```

### Neue Icons hinzufügen

Wenn in `trends.json` ein neues Icon verwendet werden soll:

1. Den gewünschten Icon-Namen auf [lucide.dev](https://lucide.dev) suchen.
2. Den Import in `src/utils/lucide-map.jsx` ergänzen.
3. Den Icon-Namen ins `iconMap`-Objekt eintragen.

---

## 4. Projektstruktur

```
trends2030-app/
├── public/
│   ├── Visuals/                  # Alle Bilder (Autoren, Grafiken, Logos)
│   └── Retailtrends2030_...pdf   # Das Whitepaper zum Download
│
├── src/
│   ├── components/
│   │   ├── Hero.jsx              # Hero-Sektion mit Headline & CTA
│   │   ├── ContextSection.jsx    # Methodik-Sektion mit Studien-Kacheln
│   │   ├── TrendCard.jsx         # Einzelne Trend-Kachel im Grid
│   │   ├── TrendModal.jsx        # Detailansicht eines Trends
│   │   ├── AuthorCard.jsx        # Autorenkarte mit Hover-Bio
│   │   ├── HistoricalStudyModal.jsx # Detailansicht historischer Studien
│   │   └── DownloadForm.jsx      # Lead-Gen-Formular (Download & Termin)
│   │
│   ├── data/
│   │   ├── trends.json           # Trend-Content (editierbar)
│   │   ├── authors.json          # Autoren-Daten (editierbar)
│   │   └── settings.json         # App-Konfiguration (editierbar)
│   │
│   ├── utils/
│   │   └── lucide-map.jsx        # Icon-Registry
│   │
│   ├── App.jsx                   # Root-Komponente & Seitenstruktur
│   ├── main.jsx                  # React-Einstiegspunkt
│   └── index.css                 # Globale Styles & Animationen
│
└── index.html                    # HTML-Template (CSP-Header, lang="de")
```

---

## 5. Sicherheitshinweise

### Implementierte Maßnahmen

| Maßnahme | Details |
|----------|---------|
| **Content Security Policy** | Meta-Tag in `index.html`, beschränkt externe Ressourcen |
| **Referrer Policy** | `strict-origin-when-cross-origin` |
| **XSS-Schutz** | Kein `dangerouslySetInnerHTML`, kein `eval()` |
| **Link-Sicherheit** | Alle `target="_blank"` mit `rel="noopener noreferrer"` |
| **Formular-Validierung** | HTML5-Pflichtfelder + JS-Regex für E-Mail |
| **Honeypot-Feld** | `_honey: ""` gegen einfache Form-Bots |
| **DSGVO-Consent** | Zwei explizite Checkboxen (DSGVO + Drittanbieter) |
| **Debug-Logs** | `console.error` nur im Dev-Modus aktiv |

### FormSubmit-Konfiguration

Das Lead-Gen-Formular nutzt den Drittanbieter-Service [FormSubmit.co](https://formsubmit.co). Wichtig:
- **Captcha** ist aktiviert (`_captcha: "true"`).
- Die **Aktivierungs-E-Mail** von FormSubmit muss nach dem ersten Live-Test bestätigt werden.
- Bei Änderung der Empfängeradresse in `settings.json` muss der FormSubmit-Endpunkt erneut aktiviert werden.

---

## 6. Bekannte Limitierungen

| Thema | Details |
|-------|---------|
| **esbuild CORS (dev-only)** | Vite 5.x hat eine bekannte CORS-Schwachstelle im Dev-Server (`GHSA-67mh-4wv8-2f99`). Betrifft ausschließlich lokale Entwicklung, nicht das Live-Deployment. Fix: Upgrade auf Vite 8 (Breaking Change). |
| **Kein serverseitiges Rate-Limiting** | Das Formular hat kein serverseitiges Rate-Limit. FormSubmit's interner Spam-Schutz + Honeypot bieten einen Grundschutz. |
| **Statische E-Mail im Bundle** | Die Kontaktadresse ist im JS-Bundle einsehbar. Da es sich um eine öffentliche Kontaktadresse handelt, ist dies für diesen Use-Case akzeptiert. |
| **CSP: `unsafe-inline`** | Notwendig für React/Vite-Architektur. Bei einer Migration zu Next.js ließe sich dies mit CSP-Nonces lösen. |

---

*Zuletzt aktualisiert: März 2026 | Maintainer: Bavaria Consulting Group*
