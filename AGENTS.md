<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Public content flows through src/data/site.ts and useSiteContent; a root query preloads published records and retains safe fallbacks so public consumers never fetch separately.
- Supply the root's public-content snapshot through SiteInitialContext to keep the first browser render identical to SSR without recursive router type inference.
- Content kinds share public.content with typed kind/data fields; authorization lives only in user_roles and RLS to keep editing consistent and prevent client privilege escalation.
- Private clinic-images storage serves signed URLs only for published approved images; media foreign keys restrict deletion to prevent broken references.
- Admin UI lives under the managed _authenticated layout and an admin role gate; all ordinary data access uses the caller's RLS client, while validated public appointment submission is a dedicated server function.
- Provision the first administrator out of band using the Users view and the administrator setup command; never expose public role assignment, credentials, or self-promotion.
- Editable page wording and menu order/visibility live in website_settings.pages (keys defined in src/data/pages.ts with defaults); kept separate from settings.data so the settings form cannot overwrite them.
- Detail pages (eye-care_/$id, doctors_/$id, careers_/$id) read from the preloaded site content by row id; job applications are submitted only through a rate-limited server function into an admin-only table.
