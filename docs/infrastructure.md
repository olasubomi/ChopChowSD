# Chop Chow infrastructure inventory

_Hosting branches, latest Render deploys, and frontend API environment values verified: 2026-11-23. Database isolation and end-to-end login behavior still require independent verification._

## Repository and hosting map

| Component | Repository | Hosting account / project | Branch | URL | Confidence |
|---|---|---|---|---|---|
| Customer-facing frontend | [CCNext](https://github.com/olasubomi/CCNext) | Vercel project `chopchow` | Production branch: verify in Vercel | https://www.chopchow.app | Domain confirmed |
| Production backend | [ChopChowSD](https://github.com/olasubomi/ChopChowSD) | Render `chopchowsd` | `master` | https://chopchowsd.onrender.com | Service live, branch and frontend production API URL verified |
| Staging backend | [ChopChowSD](https://github.com/olasubomi/ChopChowSD) | Render `chopchowserver2` | `staging-main` | https://chopchowserver2.onrender.com | Service live, branch and general Vercel Preview API URL verified |
| Additional backend deployment | [ChopChowSD](https://github.com/olasubomi/ChopChowSD) | Vercel project `chopchowserver` | Preview seen: `hotfix/require-password-authentication` | https://chopchowserver.vercel.app | Production role **unverified** |

Render workspace: **Olasubomi O Awokoya's Workspace**, connected via `chopchowsd@gmail.com`, workspace ID `tea-csps3ti3esus73eogurg`. The two services above have auto-deploy on commit; PR previews are disabled. Most recent successful staging Render deployment checked on 2026-11-23: `54feedbe56e35810e9418067b85cd51fba202ba5` (`staging-main`). [Production candidate dashboard](https://dashboard.render.com/web/srv-cjoisa5he99c73d6tjbg) · [Staging candidate dashboard](https://dashboard.render.com/web/srv-clj4radae00c7383p71g).

Second connected Render workspace: **Subomi's workspace**, via `subomi@awokorp.com`, workspace ID `tea-dbvkml60tbcc738qf4q0`. **No Render services returned** as of the verification date. This does not inventory other hosting providers or prove that account owns no other resources.

Vercel projects are in the `olasubomis-projects-078efd3e` team. Frontend: `chopchow`; additional backend: `chopchowserver`.

## Important verification gaps

1. Vercel project `chopchow` now has production `NEXT_PUBLIC_API_URL=https://chopchowsd.onrender.com/api` and general Preview `NEXT_PUBLIC_API_URL=https://chopchowserver2.onrender.com/api`; confirm the exact deployed browser bundle and any branch-scoped overrides before changing traffic.
2. Confirm backend MongoDB database names and isolation using secret **names / destinations only**, never copy credentials into documentation.
3. Confirm authentication requests end-to-end using safe browser/network testing, and whether the additional Vercel backend project is obsolete.
4. Preview API scope is now configured; verify preview authentication CORS origin matching, backend availability, staging test accounts, and whether custom Preview branch overrides are active.
5. Jira task [CCD-490](https://awowebops.atlassian.net/browse/CCD-490) references Render secrets for Gmail API; confirm actual configuration before assuming email sending works.

## Security rules

Do not commit .env files, OAuth client secrets, refresh tokens, JWT secrets, database URIs with credentials, or reset tokens. Document **variable names and owning platform only**. Never point staging at production data without explicit review. Rotate compromised credentials through the relevant provider, with a coordinated rollout.
