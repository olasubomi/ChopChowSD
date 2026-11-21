# Chop Chow API (ChopChowSD)

Node.js backend for Chop Chow customer accounts, supplier administration, ordering and logistics. **Do not use the previous Create React App scaffold instructions** as backend setup guidance.

## Documentation

- [Infrastructure and hosting](docs/infrastructure.md)
- [Deployments and environments](docs/deployment.md)
- [Authentication and email](docs/authentication.md)
- [Developer onboarding](docs/developer-guide.md)

## Service map

Render production **candidate**: [chopchowsd.onrender.com](https://chopchowsd.onrender.com), branch `master`. Render staging **candidate**: [chopchowserver2.onrender.com](https://chopchowserver2.onrender.com), branch `staging/ccd-490-password-reset`. Both are connected to this repository; the actual live frontend API destination remains to be verified. An additional Vercel backend project exists but its role is not confirmed.

Frontend: [CCNext](https://github.com/olasubomi/CCNext) · Website: https://www.chopchow.app · Jira: https://awowebops.atlassian.net/browse/CCD-486

For local commands, inspect `package.json`. Obtain development configuration securely; never commit credentials. See the developer guide before modifying authentication or production deployment branches.
