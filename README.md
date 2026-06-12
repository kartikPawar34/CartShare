# CartShare 🛒 - Collaborative Shopping Ecosystem

A real-time, collaborative frontend web application designed for shared living or working environments (like student dorms, office teams, or travel groups) to coordinate joint purchases, manage shared baskets, track expenses, and eliminate delivery threshold traps.

# Live Deployment
**Live Link:** [https://kartikpawar34.github.io/CartShare/](https://kartikpawar34.github.io/CartShare/)

---

# Features Implemented

* **User Access & Room Shield:** Users can instantly create or join a unique shared "Room" via an authentication form using a unique Room Code and Username.
* **Real-Time Synchronized Cart:** Uses the browser's native **Broadcast Channel API** to synchronize basket items across completely independent browser sessions/tabs instantly without requiring a backend server.
* **Delivery Threshold Progress Tracker:** Visually monitors progress toward a **$75 Free Shipping Threshold Target** using a dynamic progress bar that locks/unlocks status colors smoothly using custom CSS variables.
* **Live Operations Log:** A scrolling terminal interface tracking room entries, item additions, and deletions with localized system timestamps.
* **Audit-Ready Printable Receipt:** Implements traditional CSS `@media print` rules to instantly isolate an itemized invoice, breaking down **individual cost-allocation splits** for fair expense sharing when printing (`Ctrl + P`).
* **Responsive Layout:** Designed natively using traditional CSS layout standards (CSS Grid and Flexbox) optimized to fluidly adapt to mobile viewports and desktop workstations.

---

# Project Structure

Conforming strictly to the project submission folder organization guidelines:

```text
BatchID_FullName_CartShare/
├── public/
│   └── assets/               # Custom branding logos, assets, and icons
├── src/
│   ├── components/           # Isolated React UI components
│   │   ├── ActivityLog.jsx   # Live operation logging screen
│   │   ├── CartItem.jsx      # Individual item row renderer
│   │   ├── Receipt.jsx       # Print-optimized receipt template
│   │   └── RoomLogin.jsx     # Entrance form gatekeeper
│   ├── css/                  # Application stylesheets
│   │   └── index.css         # Traditional CSS & print media directives
│   ├── App.jsx               # Application core state manager
│   └── main.jsx              # Application bootstrap script
├── index.html
├── package.json
├── vite.config.js
└── README.md