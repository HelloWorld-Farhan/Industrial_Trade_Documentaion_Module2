# AeroLogix AI - Trade Compliance & Documentation Automation Suite

AeroLogix AI is an advanced, enterprise-grade dashboard built for modern customs and logistics operations. It provides an intelligent layer over traditional ERP data, integrating automated document generation, AI-powered tax & duty calculation, live clearance tracking, automated insurance binding, and compliance risk auditing.

## Features

- **Responsive & Interactive Layout**: A custom-designed, fully responsive shell with glassmorphism overlays, built-in mobile offcanvas navigation, and highly optimized transitions.
- **AI-Powered Modules**:
  - **Doc Gen & OCR**: Automated ingestion and generation of customs documentation.
  - **Duty & Tax AI**: Real-time extraction of HS Codes and automated tariff calculations powered by live table queries.
  - **Clearance Tracker**: Real-time visualization of shipment lifecycle stages, including interactive IoT/Ping Port Telemetry simulated modals.
  - **Insurance Bind**: Intelligent extraction of ERP Risk Profiles with single-click batch policy bindings.
  - **Compliance Risk**: Machine learning outlier detection interface for flagging weight variances and sanctions screening.

## Tech Stack

- **Framework**: React 18 (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (with highly customized utility classes and micro-animations)
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Installation

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build
```

## Structure

- `/src/components` - Core reusable UI components and modular modals (e.g., `RiskAuditModal`, `UserProfileModal`).
- `/src/pages` - High-level dashboard views for each module.
- `/public` - Static assets, including the custom AeroLogix SVG favicon.

## License

Proprietary Software - All rights reserved.
