# Chop Chow API (ChopChowSD)

Node.js backend for Chop Chow customer accounts, supplier administration, ordering and logistics. **Do not use the previous Create React App scaffold instructions** as backend setup guidance.

## Documentation

- [Infrastructure and hosting](docs/infrastructure.md)
- [Deployments and environments](docs/deployment.md)
- [Current staging/production release workflow](https://github.com/olasubomi/ChopChowSD/blob/staging-main/docs/deployment-workflow.md)
- [Authentication and email](docs/authentication.md)
- [Developer onboarding](docs/developer-guide.md)

## Service map

Render production: [chopchowsd.onrender.com](https://chopchowsd.onrender.com), auto-deploy branch `master`. Render staging: [chopchowserver2.onrender.com](https://chopchowserver2.onrender.com), auto-deploy branch `staging-main`. These branch assignments were verified in Render on 2026-11-23. The Vercel frontend project `chopchow` uses the production API URL `https://chopchowsd.onrender.com/api` and general Preview API URL `https://chopchowserver2.onrender.com/api` (verified in Vercel project configuration on 2026-11-23). An additional Vercel backend project exists but its role is not confirmed.

Frontend: [CCNext](https://github.com/olasubomi/CCNext) · Website: https://www.chopchow.app · Jira: https://awowebops.atlassian.net/browse/CCD-486

For local commands, inspect `package.json`. Obtain development configuration securely; never commit credentials. See the developer guide before modifying authentication or production deployment branches.
