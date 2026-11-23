# Deployments and environments

## Deployment workflow

- Backend source: [ChopChowSD](https://github.com/olasubomi/ChopChowSD). Render `chopchowsd` auto-deploys commits on `master`; `chopchowserver2` auto-deploys commits on `staging-main` (verified live in Render on 2026-11-23).
- Frontend source: [CCNext](https://github.com/olasubomi/CCNext). Vercel project `chopchow` serves `www.chopchow.app`; verify production branch in Vercel before releases.
- Extra backend Vercel project `chopchowserver` exists. Its role is unconfirmed; **do not deploy there as a replacement for Render** without an architecture decision.
- Documentation-only changes should use a PR. Backend branches with auto-deploy must be treated as deploy triggers.

## Before staging QA

1. Verify the staging Render API URL, health, branch and database isolation.
2. Confirm frontend Preview `NEXT_PUBLIC_API_URL` points to `https://chopchowserver2.onrender.com/api` (verified general Preview setting on 2026-11-23); check branch-specific overrides and rebuild if values change.
3. Resolve Axios `get` import warnings in `pages/marketplace/index.js` and `src/components/public-market/input.jsx`.
4. Redeploy Preview; Next.js `NEXT_PUBLIC_*` variables are embedded at build time.
5. Test customer, supplier and admin manual login; Google ID-token verification; forgot/reset password (single-use and expiry); store-admin invites; failed and unauthorized cases.
6. Review the related Jira tasks and GitHub PRs before any merge.

## Production release checklist

- PR reviewed, automated tests pass, staging end-to-end tests pass.
- Production frontend-to-backend URL and MongoDB database verified.
- Secrets provisioned in hosting provider; no secret values in logs, GitHub or Jira.
- Rollback deployment identified; expected session invalidation communicated if JWT secrets rotate.
- Merge/deploy deliberately, monitor error logs and auth flows, update Jira with evidence.

## References

[Jira CCD board](https://awowebops.atlassian.net/jira/software/projects/CCD/boards) · [Security hotfix CCD-486](https://awowebops.atlassian.net/browse/CCD-486) · [User endpoints CCD-489](https://awowebops.atlassian.net/browse/CCD-489) · [Gmail API CCD-490](https://awowebops.atlassian.net/browse/CCD-490).

## Branch naming and service ownership

**Current deployment branches (verified on Render, 2026-11-23):**

| Render service | Current deployment branch | Intended role | Proposed long-lived branch (not created) |
|---|---|---|---|
| `chopchowsd` | `master` | Production | No migration planned |
| `chopchowserver2` | `staging-main` | Staging | No migration planned |

The old `staging/ccd-490-password-reset` branch is not Render's current staging deployment branch. Treat `staging-main` as the active long-lived staging branch. Keep feature work separate and merge reviewed staging PRs into `staging-main`; promote to `master` only following explicit production review and approval. See the [current release workflow](https://github.com/olasubomi/ChopChowSD/blob/staging-main/docs/deployment-workflow.md). Before switching service branches, verify database isolation, branch protections, and deployment settings. Frontend Vercel production and preview remain separate mappings.
