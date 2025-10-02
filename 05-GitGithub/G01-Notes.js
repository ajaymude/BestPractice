// GIT MASTER SYLLABUS (Beginner → Master)
// Audience: Developers who want to go from zero → expert, with practical labs.
// Format: Bite-sized topics + key commands + mini-projects. Save this as notes.

// 0) Setup & Foundations
// - What is Git? DVCS vs centralized; snapshots vs diffs; working dir ↔ index ↔ HEAD.
// - Install & tools: git CLI, GUI (optional), difftool/mergetool.
// - Config scopes: system / global / local.
//   $ git config --global user.name "Your Name"
//   $ git config --global user.email "you@example.com"
//   $ git config --global init.defaultBranch main
// - Line endings & file modes:
//   $ git config --global core.autocrlf input   // mac/linux; use 'true' on Windows if needed
// - SSH vs HTTPS auth; generate & add SSH keys.
// - Ignore rules & attributes: ~/.gitignore_global, .gitignore, .gitattributes (text, eol).
// LAB: Install Git, set global config, create ~/.gitignore_global (node_modules, .env, build/).

// 1) First Steps: Single-dev Workflow
// - Initialize, snapshot, inspect, undo.
//   $ git init
//   $ git status                 // always!
//   $ git add <path> | -A
//   $ git commit -m "feat: first commit"
//   $ git log --oneline --graph --decorate
//   $ git show HEAD              // last commit details
//   $ git diff                   // wd ↔ index
//   $ git diff --staged          // index ↔ HEAD
// - Move & delete tracked files:
//   $ git mv a.js src/a.js
//   $ git rm file.txt
// - Restore/checkout basics:
//   $ git restore <file>         // undo working changes
//   $ git restore --staged <f>   // unstage
// - .gitkeep for empty dirs.
// LAB: Build a tiny repo (README.md), commit, rename a file, practice restore/unstage.

// 2) Branching Basics
// - Branch concepts: HEAD, fast-forward, merge commit, conflict resolution.
//   $ git branch                  // list
//   $ git switch -c feature/x     // create & switch
//   $ git merge feature/x         // merge into current branch
//   $ git mergetool               // optional GUI for conflicts
// - Stash for WIP:
//   $ git stash push -m "wip: ui"
//   $ git stash list | git stash pop | git stash drop
// - Tagging releases:
//   $ git tag v1.0.0              // lightweight
//   $ git tag -a v1.0.0 -m "1.0"  // annotated
//   $ git push --tags
// LAB: Create feature branch, make conflicting edits, resolve merge, add a version tag.

// 3) Remotes & Collaboration Basics
// - Clone, remotes, tracking, fetch/pull/push.
//   $ git clone <url>
//   $ git remote -v | git remote add origin <url> | git remote rename origin upstream
//   $ git fetch origin
//   $ git branch -u origin/main    // set upstream
//   $ git pull --ff-only            // safer pulls
//   $ git push -u origin main       // first push
// - Shallow & partial clones (speed/CI):
//   $ git clone --depth 1 <url>
// LAB: Fork/clone a sample repo, set upstream, create a branch, push & open PR.

// 4) Commit Craft & Clean History
// - Good messages (subject ≤ 50 chars, body = what/why).
// - Conventional Commits (feat/fix/docs/refactor/test/chore).
// - Squash vs merge vs rebase; when to use each.
//   $ git commit --amend
//   $ git rebase main              // move branch atop main
//   $ git merge --no-ff feature    // preserve feature history
//   $ git cherry-pick <sha>
// - Range & rev syntax: A..B, A...B, ^, ~, @{u}, @{-1}.
// - Signed-off-by & DCO basics.
// LAB: Rewrite your last two commits into one (squash), reword message, push with --force-with-lease.

// 5) Recovery & Debugging
// - Reflog = safety net; recover “lost” work.
//   $ git reflog
//   $ git reset --hard <sha>      // caution
//   $ git branch rescue/<name> <sha>
// - Revert vs reset (public vs private history).
//   $ git revert <shaRange>
// - Bisect to find bad commit:
//   $ git bisect start; git bisect bad; git bisect good <sha>; (run tests) ; git bisect reset
// - fsck & gc basics:
//   $ git fsck --lost-found
// LAB: Simulate a bad reset; find previous commit via reflog and recover.

// 6) Interactive Rebase (History Surgery)
// - Use cases: reorder commits, split, squash/fixup, reword authors/dates.
//   $ git rebase -i HEAD~5
// - Fixup pipelines:
//   $ git commit --fixup=<sha> ; git rebase -i --autosquash
// - Risks & safe pushes:
//   $ git push --force-with-lease
// LAB: Turn 5 “noisy” commits into 2 clean ones via autosquash.

// 7) Large Files & Repository Hygiene
// - .gitattributes (text, binary, linguist, eol, diff drivers).
// - Git LFS: when & how.
//   $ git lfs install ; git lfs track "*.psd"
// - Remove secrets/large files from history:
//   - Prefer: git filter-repo (modern), or BFG (GUI-ish approach).
//   $ git filter-repo --path <path> --invert-paths
// - export-ignore for packaged archives.
// LAB: Accidentally committed .env; scrub it with filter-repo, rotate the secret, force-push safely.

// 8) Submodules, Subtrees, Monorepos
// - Submodules (pin exact commit of another repo).
//   $ git submodule add <url> vendor/lib ; git submodule update --init --recursive
// - Subtree merge & split (alternative to submodules).
// - Monorepo tools: sparse-checkout, worktrees, partial clone.
//   $ git sparse-checkout init --cone ; git sparse-checkout set packages/app
//   $ git worktree add ../app-hotfix hotfix/1.2
// LAB: Convert a multi-repo library to a subtree in a monorepo and keep history.

// 9) Productivity & Power Tools
// - Aliases & helpers:
//   $ git config --global alias.st "status -sb"
//   $ git config --global alias.lg "log --oneline --graph --decorate --all"
// - Better diffs & paging (delta), auto-correct, rerere (reuse recorded resolutions).
//   $ git config --global rerere.enabled true
// - grep, shortlog, describe, blame:
//   $ git grep "TODO("
//   $ git describe --tags
// - Templates & commit hooks (client-side).
// - Credential managers; signing commits (GPG/SSH/Sigstore).
// LAB: Create a pre-commit hook (lint + test), enable rerere, add log aliases.

// 10) Collaboration Models & Governance
// - GitHub Flow, Git Flow, Trunk-Based Development: pros/cons.
// - Branch protection, required reviews, status checks.
// - PR hygiene: small, focused; draft PRs; squash on merge.
// - Changelogs & release notes (Conventional Commits + tooling).
// LAB: Configure a protected main branch; enforce linear history, squash merges.

// 11) CI/CD Touchpoints (Git-centric)
// - Tag-driven releases; version bumping (semantic-release / changesets).
// - Shallow fetch in CI for speed; caching strategy.
// - Using generated changelogs from commits.
// LAB: Build a pipeline that triggers on tags v* and publishes artifacts.

// 12) Git Internals (Deep Dive)
// - Object model: blob/tree/commit/tag; content-addressable store (SHA-1/SHA-256).
// - Refs & refnames: HEAD, refs/heads, refs/tags, packed-refs.
// - Index/staging, packfiles, delta compression, maintenance tasks.
//   $ git cat-file -t <sha> | -p <sha>
//   $ git rev-parse HEAD ; git rev-list --count HEAD
//   $ git gc ; git repack -Ad ; git maintenance start
// - Plumbing vs porcelain: hash-object, update-index, write-tree, commit-tree.
// LAB: Manually craft a commit using plumbing commands (educational!).

// 13) Server-Side & Enterprise Git
// - Bare repos, mirrors, replication & backup:
//   $ git clone --mirror <url> ; git bundle create backup.bundle --all
// - Access control via SSH; server-side hooks (pre-receive, update).
// - Monorepo performance tuning: partial clone, bitmap indexes.
// LAB: Create a bare repo as central remote; add pre-receive hook to block secrets.

// 14) Security, Compliance & Policy
// - Secret hygiene: .gitignore, pre-commit scanning, rotating keys.
// - CODEOWNERS, DCO/CLA, Signed commits, Protected tags.
// - SBOMs & provenance (signed artifacts), release attestation (intro).
// LAB: Require signed commits on main; verify signatures locally.

// 15) Disaster Playbooks (Practice Until Bored)
// - “I force-pushed wrong branch” → reflog + force-with-lease to repair.
// - “Deleted branch with unmerged commits” → restore via reflog & refs stash.
// - “Merged secrets” → revert + history rewrite + rotate secret.
// - “Binary bloat” → LFS + filter-repo + pack maintenance.
// LAB: Run each scenario on a throwaway repo until recovery is muscle memory.

// 16) Interview & Real-World Scenarios
// - Explain rebase vs merge with examples & risks.
// - Design a branching strategy for a team of 50 with weekly releases.
// - Remove a 200MB file added 6 months ago from all history without breaking clones.
// - Speed up CI on a 10GB monorepo.
// - Show 3 ways to recover a lost commit.
// LAB: Document your answers and automate the fixes as scripts/hooks.

// 17) Capstone Projects (Pick 2+)
// - A) “Release Factory”: Conventional Commits → auto-changelog → tag → GitHub/GitLab release.
// - B) “History Surgeon”: Migrate legacy repo, scrub PII & binaries, keep authorship, compress history.
// - C) “Mono Move”: Convert multi-repo to monorepo using subtree; enable sparse-checkout + worktrees.
// - D) “Guardrails”: Secret-scanning pre-commit, protected branches, signed tags, CI status checks.
// Deliverables: design doc, scripts, README with runbooks, before/after repo stats.

// ────────────────────────────────────────────────────────────────────────────────
// Quick Command Cheat Sheet (curated)
//   Status/Inspect:        git status -sb | git log --oneline --graph --decorate --all
//   Stage/Undo:            git add -p | git restore <f> | git restore --staged <f>
//   Branch/Switch:         git switch -c feat/x | git branch -vv | git switch -
//   Merge/Rebase:          git merge --no-ff feat/x | git rebase main | git rebase -i HEAD~N
//   Sync:                  git fetch --prune | git pull --ff-only | git push --force-with-lease
//   Tags:                  git tag -a v1.2.0 -m "1.2.0" | git push origin v1.2.0
//   Stash:                 git stash push -m "wip" | git stash pop
//   History Surgery:       git commit --amend | git cherry-pick <sha> | git reset --soft <sha>
//   Recovery:              git reflog | git revert <sha> | git fsck --lost-found
//   Search:                git grep "<text>" | git log -S"<code>" | git blame <file>
//   Ranges & Refs:         git log A..B | git diff A...B | git show @{u} | git show @{-1}
//   Monorepo helpers:      git sparse-checkout set <dir> | git worktree add ../dir branch
//   Maintenance:           git gc | git repack -Ad | git maintenance start
//   LFS:                   git lfs track "*.zip" | git lfs migrate import --include="*.zip"
//   Filter-Repo (example): git filter-repo --path secrets.txt --invert-paths
//   Backup:                git bundle create backup.bundle --all

// Study Path Suggestion (timeboxed; adjust as needed)
// - Week 1–2: Sections 0–3 + Labs → daily use comfort.
// - Week 3–4: Sections 4–6 + Disaster Playbooks → history control & recovery.
// - Week 5–6: Sections 7–9 + CI hooks → large repos & automation.
// - Week 7–8: Sections 10–14 + Capstones → team workflows & enterprise guardrails.

// Tip: Practice on throwaway repos. Repeat recovery labs until you can do them without notes.
// When you’re ready, say “give me Lab 1” and I’ll hand you a realistic, graded exercise set.
