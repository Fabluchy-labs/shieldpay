Contributing to ShieldPay

Thank you for your interest in contributing to ShieldPay!

ShieldPay is an independent open-source project focused on invoice management, payment tracking, and Stellar blockchain integration.

We welcome developers, testers, designers, technical writers, and anyone interested in improving the project.

Before You Start

1. Check the existing GitHub issues.
2. Look for an issue that matches the work you want to do.
3. Comment on the issue to discuss your proposed contribution.
4. Wait for clarification or confirmation before starting substantial work.

For significant changes, consider opening an issue first so the proposed solution can be discussed.

Development Setup

Requirements

- Node.js
- npm
- Git
- PostgreSQL database connection

Clone the repository

git clone https://github.com/Fabluchy-labs/shieldpay.git
cd shieldpay

Backend setup

cd backend
npm install

Create a ".env" file in the backend directory using your own development credentials.

Example:

PORT=5000
DATABASE_URL=your_postgresql_connection_string

Never commit ".env" files or real credentials.

Start the backend:

node server.js

Frontend setup

Open a separate terminal:

cd frontend
npm install
npm run dev

Open the local URL provided by Vite.

Branching Guidelines

Create a separate branch for each contribution.

Examples:

git checkout -b fix/neon-connection
git checkout -b feature/invoice-crud
git checkout -b feature/stellar-wallet
git checkout -b docs/update-readme

Use clear and descriptive branch names.

Making Changes

- Keep changes focused on the issue being addressed.
- Follow the existing project structure and coding style.
- Write readable, maintainable code.
- Add or update tests where appropriate.
- Update documentation when behaviour or setup instructions change.
- Avoid introducing unnecessary dependencies.

Pull Request Guidelines

Before submitting a pull request:

1. Test your changes locally.
2. Check that no secrets or environment files are included.
3. Provide a clear explanation of the changes.
4. Reference the related GitHub issue using "Closes #ISSUE_NUMBER" where appropriate.
5. Include screenshots or test results when useful.

Pull requests should be focused, descriptive, and easy to review.

Security Guidelines

- Do not commit passwords, API keys, private keys, or secret phrases.
- Never request or store Stellar wallet secret keys.
- Use Stellar Testnet for blockchain development.
- Require explicit wallet approval before submitting transactions.
- Do not use real customer funds.

If you discover a security vulnerability, avoid publishing sensitive exploit details in a public issue.

Communication

Be respectful, constructive, and welcoming.

Ask questions when requirements are unclear. Explain your reasoning when proposing significant changes.

Thank you for helping make ShieldPay better!
