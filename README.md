ShieldPay

Payments made transparent. Businesses made smarter.

ShieldPay is an open-source payment and invoice management application designed to help businesses manage invoices, track payments, and explore blockchain-powered payment solutions through the Stellar network.

The project aims to combine straightforward invoice management with transparent payment tracking and Stellar Testnet integration.

Project Status

🚧 Under active development

ShieldPay is an early-stage project. Some features are still being developed, tested, and integrated.

Vision

To make digital payment management more transparent, accessible, and efficient for businesses through modern web technologies and blockchain infrastructure.

Planned Features

- Invoice creation and management.
- Customer and invoice tracking.
- Payment status monitoring.
- PostgreSQL database storage.
- Dashboard with financial summaries.
- Stellar wallet connectivity.
- Stellar Testnet payment creation and verification.
- Transaction history and payment confirmation.

Technology Stack

Frontend

- React
- JavaScript
- Vite
- CSS

Backend

- Node.js
- Express.js
- PostgreSQL
- Neon

Blockchain

- Stellar SDK
- Stellar Testnet
- Horizon API

Project Structure

shieldpay/
├── frontend/
│   ├── src/
│   └── package.json
├── backend/
│   ├── server.js
│   └── package.json
├── .gitignore
└── README.md

Getting Started

Prerequisites

- Node.js
- npm
- Git
- PostgreSQL database connection

1. Clone the repository

git clone https://github.com/Fabluchy-labs/shieldpay.git
cd shieldpay

2. Set up the backend

cd backend
npm install

Create a ".env" file inside the backend directory:

PORT=5000
DATABASE_URL=your_postgresql_connection_string

Never commit your ".env" file or share database credentials.

Start the backend:

node server.js

3. Set up the frontend

Open another terminal:

cd frontend
npm install
npm run dev

Open the local address provided by Vite in your browser.

API Endpoints

Method| Endpoint| Description
GET| "/"| Check backend status
GET| "/api/invoices"| Retrieve invoices
POST| "/api/invoices"| Create an invoice

Additional endpoints are planned as the backend develops.
Why Stellar?

ShieldPay aims to leverage the Stellar network to make business payments more transparent, accessible, and efficient.

By integrating Stellar, the project plans to support:

- Wallet Connectivity: Allow users to connect compatible Stellar wallets.
- Blockchain Payments: Enable businesses to initiate payments through Stellar.
- Transaction Verification: Verify payment transactions using Stellar network data.
- Payment Transparency: Provide transaction references and confirmation statuses.
- Testnet Development: Build and test blockchain functionality safely before considering production deployment.

ShieldPay will initially use the Stellar Testnet for development and experimentation.

The long-term goal is to explore how Stellar's fast, low-cost payment infrastructure can improve invoice settlement and payment tracking for businesses.

Development Roadmap

ShieldPay development is organised into four milestones:

Phase 1 — Backend Foundation

- Neon PostgreSQL connection and invoice retrieval.
- Complete invoice CRUD operations.
- Automated backend testing.

Phase 2 — Frontend Integration

- Connect the React dashboard to the backend API.
- Implement persistent invoice management.

Phase 3 — Stellar Integration

- Stellar Testnet wallet connectivity.
- Payment creation and transaction verification.

Phase 4 — Testing and Documentation

- Project documentation.
- Contributor setup instructions.
- Testing and quality improvements.

Contributing

Contributions are welcome!

If you are interested in contributing:

1. Check the open GitHub issues.
2. Choose an issue you would like to work on.
3. Comment on the issue before starting.
4. Fork the repository.
5. Create a feature branch.
6. Make your changes and test them.
7. Submit a pull request with a clear description.

Please do not commit environment files, passwords, private keys, or other sensitive information.

Security

- Use Stellar Testnet during development.
- Never request or store users' private keys or secret recovery phrases.
- Never submit blockchain transactions without explicit user approval.
- Do not use real customer funds in this development version.

Please report security vulnerabilities responsibly rather than publishing sensitive details in public issues.

Disclaimer

ShieldPay is an independent open-source project under development. It is not an official Stellar product or financial institution.

License

This project is licensed under the MIT License.
