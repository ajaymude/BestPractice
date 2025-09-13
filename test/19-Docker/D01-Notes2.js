////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


/*
===============================================================================
DOCKER FOUNDATIONS — JS-STYLE NOTES (copy-paste friendly)
===============================================================================

0) WHY CONTAINERS?  (VMs vs Containers, Immutable Infra, Reproducibility)
----------------------------------------------------------------------------
// VMs = emulate hardware + full guest OS per VM → heavy (GBs), slow boots, strong isolation.
// Containers = host shares Linux kernel; isolate processes (namespaces + cgroups).
//   → light (MBs), fast (ms–s), high density, great for microservices.
// Immutable infra = ship images (read-only). To change → rebuild image, redeploy new tag.
// Reproducibility = the exact same image runs the same on laptop, CI, prod.

1) CORE LINUX CONCEPTS (what makes containers possible)
----------------------------------------------------------------------------
// Processes: a running program has a PID; a container is just a process tree with isolation.
// Namespaces (isolation):
//   - pid (process IDs), mnt (mounts), net (network stack), uts (hostname),
//   - ipc (shared memory), user (UID/GID mapping).
// cgroups (limits & accounting):
//   - Limit CPU, memory, IO, PIDs; track usage; OOM-kill if over memory.
// Filesystems:
//   - Overlay/union FS (overlay2): read-only layers + per-container writable layer.
//   - Volumes/bind mounts: real persistence outside the container writable layer.
// Signals:
//   - SIGTERM (graceful), SIGKILL (force). PID 1 must forward/reap. Use tini or proper entrypoint.

2) OCI ECOSYSTEM (standards + components)
----------------------------------------------------------------------------
// OCI Image Spec: layout of images (manifest, config, layers, digests).
// OCI Runtime Spec: how to run a container from a bundle (config.json).
// containerd: daemon for images/snapshots/container lifecycle.
// runc: low-level runtime that actually starts the container per OCI spec.
// BuildKit: modern builder (parallelism, cache, secrets, mounts).
// Mental model: Docker CLI/API → containerd → runc ; builds use BuildKit.

3) INSTALL & SETUP (Linux / macOS / Windows)
----------------------------------------------------------------------------
// Linux: install Docker Engine from official repo.
// macOS: Docker Desktop (runs Linux VM + tools).
// Windows 10/11: Docker Desktop with WSL2 backend.
// Verify:
//   $ docker version   // client + server versions (if "Server" missing → daemon not running)
//   $ docker info      // storage driver, cgroup version, default runtime, etc.

4) FIRST RUN (sanity checks)
----------------------------------------------------------------------------
// Hello image pulls & runs:
//   $ docker run hello-world
// Interactive shell in Alpine:
//   $ docker run -it alpine sh
// Inside container, try:
//   # uname -a; id; ps; hostname; ip addr

5) IMAGE vs CONTAINER vs LAYER
----------------------------------------------------------------------------
// Image = read-only artifact built from Dockerfile (think “class”).
// Layer = FS diff created by most Dockerfile steps; layers are cached & shared.
// Container = a running (or stopped) *instance* of an image with a writable layer (think “object”).

6) REGISTRY BASICS (Docker Hub, GHCR, self-hosted)
----------------------------------------------------------------------------
// Pull:
//   $ docker pull alpine:3.20
// Tag & push to GHCR:
//   $ docker tag myapp:1.0 ghcr.io/<user>/myapp:1.0
//   $ docker login ghcr.io
//   $ docker push ghcr.io/<user>/myapp:1.0
// Self-hosted: image "registry:2" for a private registry.

7) PRACTICE (do once to cement concepts)
----------------------------------------------------------------------------
// 7.1 Explore isolation:
///  $ docker run --rm -it alpine sh
///  # ls /; cat /etc/os-release; ps -ef; hostname
///  # ls /proc; cat /proc/self/status; cat /proc/meminfo; cat /proc/cpuinfo

// 7.2 Non-persistence of writable layer:
///  # echo "hello" > /tmp/demo.txt; exit
///  $ docker run --rm -it alpine sh
///  # ls /tmp   // demo.txt is gone (new writable layer)

// 7.3 Persist data with volumes:
///  $ docker run --rm -it -v mydata:/data alpine sh
///  # echo "kept" > /data/persist.txt; exit
///  $ docker run --rm -it -v mydata:/data alpine sh
///  # cat /data/persist.txt  // "kept"

// 7.4 Quick registry dance (optional):
///  $ docker login
///  $ docker pull busybox:latest
///  $ docker tag busybox:latest <registry>/<ns>/busybox:copy
///  $ docker push <registry>/<ns>/busybox:copy

8) THE STACK (draw it in your head)
----------------------------------------------------------------------------
// Your App (node/python/go/etc.)
///    ↓
/// Container Image (layers from Dockerfile)
///    ↓
/// Running Container (writable layer + isolated process tree)
///    ↓
/// Container Runtime (containerd → runc)
///    ↓
/// Linux Kernel (namespaces, cgroups, overlay2)
///    ↓
/// Host OS / VM (WSL2 on Windows, LinuxKit VM on macOS, Linux on Linux)

9) EXTRA PRO TIPS
----------------------------------------------------------------------------
// Graceful shutdown:
//   - Make app handle SIGTERM and close servers/connections cleanly.
//   - In Node: process.on('SIGTERM', () => server.close(/* ... */))
// Resource limits:
//   $ docker run --memory=512m --cpus=1.0 <img>
///  // Prevents one container from starving the host.
// Networking:
//   $ docker run -p 8080:80 <img>     // publish container port 80 to host 8080
//   $ docker network create mynet
//   $ docker run --network=mynet --name api <img>
// Image hygiene:
//   - Prefer small bases (alpine, distroless), multi-stage builds, pin versions.
//   - .dockerignore to reduce build context; keep layers ordered for better cache.
// Debugging basics:
//   $ docker ps -a               // list containers
//   $ docker images              // list images
//   $ docker logs <name|id>      // view logs
//   $ docker exec -it <name> sh  // shell into a running container
//   $ docker rm -f <name>; docker rmi <img>  // clean up

// END OF NOTES
===============================================================================
*/


////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

/*
===============================================================================
DOCKER — CORE CLI (Must-know commands) — JS-STYLE NOTES
===============================================================================

1) LIFECYCLE (create/run/start/stop/manage containers)
----------------------------------------------------------------------------
// Create + run:
$ docker run <img>                 // create container from image + start it
$ docker run --name web -d -p 8080:80 nginx:stable
// Common flags:
//   -d            → detached mode
//   -p H:P        → publish hostPort:containerPort
//   --rm          → auto-remove when container exits
//   -e K=V        → env var
//   -v vol:/path  → volume
//   --name NAME   → readable name

// Start/Stop/Restart/Kill:
$ docker start  web                 // start an existing, stopped container
$ docker stop   web                 // SIGTERM then (after timeout) SIGKILL
$ docker stop -t 5 web              // wait 5s before SIGKILL
$ docker restart web
$ docker kill web                   // send SIGKILL immediately (or -s SIGTERM)

// Pause/Unpause (freeze/unfreeze processes via cgroups freezer):
$ docker pause   web
$ docker unpause web

// Remove:
$ docker rm web                     // remove stopped container
$ docker rm -f web                  // force remove (stops then removes)
$ docker container prune            // remove all stopped containers

// List + filters:
$ docker ps                         // running containers
$ docker ps -a                      // all (including exited)
$ docker ps --filter "status=exited"
$ docker ps --filter "name=web" --format "table {{.ID}}\t{{.Names}}\t{{.Status}}"

// Logs:
$ docker logs web                   // historical logs
$ docker logs -f --tail 100 web     // follow/tail last 100 lines
$ docker logs --since 10m web       // last 10 minutes

// Exec into a running container:
$ docker exec -it web sh            // or bash if image has it
$ docker exec -u 0 -it web sh       // exec as root (UID 0)

// Inspect container (full JSON state, mounts, network, health, etc.):
$ docker inspect web
$ docker inspect --format '{{.State.Status}}' web
$ docker inspect --format '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' web

// Handy:
$ docker stats                      // live CPU/mem/IO usage per container
$ docker top web                    // processes inside the container
// Detach from an attached container: Ctrl-P, Ctrl-Q

2) IMAGES (pull/list/remove/tag/save/load/inspect)
----------------------------------------------------------------------------
// Pull/list/remove:
$ docker pull alpine:3.20
$ docker images                     // list local images
$ docker rmi alpine:3.20            // remove image
$ docker image prune                // remove dangling layers
$ docker system prune -a            // aggressive cleanup (be careful)

// Tag + push examples:
$ docker tag myapi:1.0 ghcr.io/me/myapi:1.0
$ docker push ghcr.io/me/myapi:1.0

// Save/Load vs Export/Import (IMPORTANT):
//   save/load   → image (keeps layers, metadata, tags)
//   export/import → container FS only (no history, no ENV/CMD/etc.)
$ docker save -o myapi.tar myapi:1.0
$ docker load -i myapi.tar

// Inspect image + history:
$ docker inspect myapi:1.0
$ docker history --no-trunc myapi:1.0

// Multi-arch manifest (Buildx imagetools):
$ docker buildx imagetools inspect nginx:stable    // view manifest list

3) COPY & FILESYSTEM DIFF
----------------------------------------------------------------------------
// Copy host ↔ container:
$ docker cp ./local.txt web:/usr/share/nginx/html/local.txt
$ docker cp web:/etc/nginx/nginx.conf ./nginx.conf

// FS changes relative to image (A=added, C=changed, D=deleted):
$ docker diff web

// Export/Import container filesystem (flat tar, no image history):
$ docker export web > webfs.tar
$ cat webfs.tar | docker import - webfs:latest     // makes a new image layer

4) RESOURCE LIMITS (cgroups)
----------------------------------------------------------------------------
// CPU shares:
$ docker run --cpus=1.5 nginx        // ~1.5 CPU cores worth of time
// Pin to specific cores:
$ docker run --cpuset-cpus="0,2" nginx
// Memory:
$ docker run --memory=512m --memory-swap=1g nginx
// Limit process count (PIDs):
$ docker run --pids-limit=200 nginx
// Observe live:
$ docker stats

5) HEALTH (Dockerfile HEALTHCHECK + runtime status)
----------------------------------------------------------------------------
// In Dockerfile:
HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD wget -qO- http://localhost/ || exit 1
// Check at runtime:
$ docker inspect --format '{{.State.Health.Status}}' web    // healthy|starting|unhealthy
$ docker inspect web | jq '.[0].State.Health'               // full health object (if jq installed)

6) PRACTICE LAB (Nginx on :8080, logs, exec, limits)
----------------------------------------------------------------------------
// 1) Run Nginx mapped to 8080 and give it a name:
$ docker run --name web -d -p 8080:80 nginx:stable

// 2) Tail logs while hitting the endpoint (open http://localhost:8080):
$ docker logs -f web

// 3) Exec in and peek around:
$ docker exec -it web sh
# ls -al /usr/share/nginx/html
# nginx -v
# exit

// 4) Apply CPU/mem limits and observe:
$ docker rm -f web
$ docker run --name web -d -p 8080:80 --cpus=0.5 --memory=256m nginx:stable
$ docker stats   // watch CPU/MEM while refreshing the page or load-testing

// 5) Bonus: show FS diff after modifying content:
$ docker exec -it web sh -c 'echo "hi" > /usr/share/nginx/html/hello.txt'
$ docker diff web    // look for A /usr/share/nginx/html/hello.txt

// Cleanup:
$ docker rm -f web
$ docker image prune -f

7) QUICK REFERENCE (one-liners)
----------------------------------------------------------------------------
// List only container names:
$ docker ps --format '{{.Names}}'
// Get container IP (default bridge):
$ docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' web
// Stop all containers:
$ docker stop $(docker ps -q)
// Remove all stopped + dangling:
$ docker container prune -f && docker image prune -f

// END — keep this as your core CLI cheat-sheet.
===============================================================================
*/



////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


/*
===============================================================================
DOCKERFILE CRAFTSMANSHIP (Images) — JS-STYLE NOTES (copy-paste friendly)
===============================================================================

2.0  CORE INSTRUCTIONS (when + why)
----------------------------------------------------------------------------
// FROM        : base image (pin digests for reproducibility)
FROM node:22-alpine AS base

// RUN         : exec form preferred; each RUN creates a layer
RUN apk add --no-cache curl

// COPY        : copy files from build context; use --chown for non-root
COPY --chown=node:node package.json package-lock.json ./

// ADD         : AVOID generally. Only for LOCAL tar auto-extract.
//               Do NOT use ADD for remote URLs (use curl/wget in RUN instead).
// GOOD:  ADD app.tgz /opt/app/    // auto-extracts
// BAD :  ADD https://… /tmp/x     // use RUN curl -L … -o /tmp/x

// WORKDIR     : sets working directory (auto-creates path)
WORKDIR /app

// ENV / ARG   : ENV persists in image runtime; ARG only at build-time
ARG  BUILD_COMMIT
ENV  NODE_ENV=production

// EXPOSE      : documentation only (no port publish)
EXPOSE 3000

// USER        : drop root; prefer non-root runtime
RUN adduser -D -u 10001 app && chown -R app:app /app
USER app

// HEALTHCHECK : let orchestrators gate routing on health
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

// ENTRYPOINT vs CMD:
//   ENTRYPOINT = the executable (rarely changes)
//   CMD        = default args (override with `docker run … <args>`)
// Use exec form for signals (no shell).
ENTRYPOINT ["node", "server.js"]
// OR split:
// ENTRYPOINT ["node"]
// CMD ["server.js"]

2.1  BUILD — classic vs BuildKit
----------------------------------------------------------------------------
// Classic build (works everywhere):
$ docker build -t myapp:dev .

// Enable BuildKit (faster, cache mounts, secrets):
// Temporarily:
$ DOCKER_BUILDKIT=1 docker build -t myapp:dev .
// Or permanently set in Docker config/Env.

// Caching rules (key ideas):
// - Each instruction produces a cacheable layer.
// - If an instruction’s inputs (command + files it touches) haven't changed,
//   Docker reuses the cached layer; otherwise cache busts from that step downward.
// - Reorder steps: put SLOW / INFREQUENTLY CHANGING steps first (deps),
//   and FREQUENTLY CHANGING steps (source code) later.

// Cache-friendly Node example (two-step deps install):
# 1) copy only manifests → cache deps layer when app code changes
COPY package*.json ./
RUN npm ci --omit=dev
# 2) now copy app sources
COPY . .

// Invalidation pitfalls:
// - COPY . .  high blast radius → use .dockerignore aggressively.
// - Changing env/ARG before COPY can bust caches.
// - ADD from remote URL breaks determinism; avoid.

2.2  MULTI-STAGE BUILDS (builder → runtime)
----------------------------------------------------------------------------
// Goal: compile/build in a fat image, then copy JUST the outputs to a tiny runtime.

# (A) Node.js — build assets then ship minimal runtime
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci

FROM deps AS build
COPY . .
RUN npm run build

FROM node:22-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app
# copy only runtime deps:
COPY --from=deps /app/node_modules ./node_modules
# copy built artifacts + minimal runtime files:
COPY --from=build /app/dist ./dist
COPY package*.json ./
USER node
EXPOSE 3000
ENTRYPOINT ["node","dist/server.js"]

// Build specific stage only (debug):
$ docker build --target build -t myapp:build .

# (B) Python — wheels cache + venv, then copy venv only
FROM python:3.12-slim AS pybuild
WORKDIR /app
RUN --mount=type=cache,target=/root/.cache/pip \
    python -m venv /opt/venv
ENV PATH="/opt/venv/bin:${PATH}"
COPY requirements.txt .
RUN --mount=type=cache,target=/root/.cache/pip \
    pip install --no-cache-dir -r requirements.txt
COPY . .

FROM python:3.12-slim AS pyrun
ENV PATH="/opt/venv/bin:${PATH}"
WORKDIR /app
COPY --from=pybuild /opt/venv /opt/venv
COPY . .
USER 10001
ENTRYPOINT ["python","app.py"]

# (C) Go — static binary → scratch/distroless
FROM golang:1.22-alpine AS gobuild
WORKDIR /src
COPY go.mod go.sum ./
RUN --mount=type=cache,target=/go/pkg/mod \
    go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
    go build -trimpath -ldflags="-s -w" -o /out/app ./cmd/app

FROM gcr.io/distroless/static AS gorun   // or FROM scratch
COPY --from=gobuild /out/app /app
USER 65532:65532
ENTRYPOINT ["/app"]

# (D) Java — JDK build stage → minimal JRE (Temurin or jlink)
FROM eclipse-temurin:21-jdk AS jbuild
WORKDIR /build
COPY mvnw pom.xml ./
COPY .mvn .mvn
RUN ./mvnw -q -DskipTests package
# Optional: layered jar (Spring Boot supports layertools)
# RUN java -Djarmode=layertools -jar target/app.jar extract

FROM eclipse-temurin:21-jre AS jrun   // or jlink custom runtime if needed
WORKDIR /app
COPY --from=jbuild /build/target/app.jar /app/app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]

2.3  .dockerignore (small contexts = faster builds + stable caches)
----------------------------------------------------------------------------
// Common patterns (tune per project)
//  ⚠️ Don’t ignore package-lock.json / poetry.lock / Pipfile.lock — you want them!
node_modules
dist
build
coverage
.git
.gitignore
Dockerfile*
docker-compose*.yml
*.log
.env
.env.*
.vscode
.DS_Store
**/__pycache__/
*.pyc

2.4  OS BASES + PACKAGE MANAGERS — trade-offs
----------------------------------------------------------------------------
// Debian/Ubuntu (slim/bookworm):
//   + glibc, best compat with prebuilt binaries; richer repos; larger size.
// Alpine (musl):
//   + tiny; musl libc; may require building native modules (node-gyp, etc.).
//   - some wheels (Python) or binaries expect glibc → build from source or switch base.
// Distroless:
//   + minimal attack surface; no shell/package manager.
//   - you must copy in certs/CA if needed; debug is harder (use ephemeral debug sidecars).

// Gotchas:
// - musl vs glibc: native addons, DNS/resolver behavior, timezone packages (install tzdata).
// - If you need glibc on Alpine → consider debian-slim instead of hacking glibc in.
// - Pin versions to reduce surprise updates.

2.5  APP-SPECIFIC PATTERNS
----------------------------------------------------------------------------
// NODE:
// - Use npm ci (lockfile), not npm install.
// - BuildKit cache: RUN --mount=type=cache,target=/root/.npm npm ci
// - Set NODE_ENV=production (or use npm ci --omit=dev).
// - Drop root (USER node) and use COPY --chown=node:node.
// - Secrets: RUN --mount=type=secret,id=npmrc npm ci   // build with: --secret id=npmrc,src=$HOME/.npmrc

// PYTHON:
// - pip: --no-cache-dir; cache mounts speed up rebuilds.
// - Consider a venv under /opt/venv; set PATH.
// - Wheels: manylinux wheels expect glibc; on Alpine (musl) pip may compile → add build deps or switch base.
// - Use non-root USER.

// GO:
// - CGO_ENABLED=0 for static binaries; final FROM scratch/distroless:static.
// - Copy /etc/ssl/certs if your app calls HTTPS and base is scratch (or use distroless:static which includes certs).

// JAVA:
// - Build with JDK, run on JRE; Spring Boot supports layered jars for cache-friendly images.
// - jlink/jdeps can produce a custom minimal runtime (smaller than generic JRE).

2.6  ENTRYPOINT vs CMD, SIGNALS, PID 1
----------------------------------------------------------------------------
// Exec form (JSON array) preserves signals: PID 1 receives SIGTERM on `docker stop`.
// If your app spawns children, either:
//   - Use tini as an init to reap zombies:
//       RUN apk add --no-cache tini
//       ENTRYPOINT ["tini","--","node","server.js"]
//   - Or run with `docker run --init …`
//
// Node graceful shutdown example:
//   process.on('SIGTERM', () => server.close(() => process.exit(0)));

// Shell form (string) spawns a sh -c; signals may not propagate — avoid unless needed.

2.7  IMAGE METADATA & LABELS (OCI)
----------------------------------------------------------------------------
// Add useful metadata for traceability and SBOM tooling:
ARG  BUILD_DATE
ARG  VCS_REF
ARG  VERSION
LABEL org.opencontainers.image.title="myapp" \
      org.opencontainers.image.description="Awesome service" \
      org.opencontainers.image.url="https://example.com/myapp" \
      org.opencontainers.image.source="https://github.com/me/myapp" \
      org.opencontainers.image.version="${VERSION}" \
      org.opencontainers.image.revision="${VCS_REF}" \
      org.opencontainers.image.created="${BUILD_DATE}" \
      org.opencontainers.image.licenses="MIT"

// Build with args:
$ docker build \
  --build-arg BUILD_DATE=$(date -u +%Y-%m-%dT%H:%M:%SZ) \
  --build-arg VCS_REF=$(git rev-parse --short HEAD) \
  --build-arg VERSION=1.2.3 \
  -t myapp:1.2.3 .

// SBOM hints:
// - Generate after build (e.g., syft: `syft packages docker:myapp:1.2.3 -o spdx-json > sbom.json`)
// - Or use buildx sbom integrations if available in your setup.

2.8  PRACTICE — make it small, make it healthy
----------------------------------------------------------------------------
// A) Convert fat → multi-stage minimal:
//   1) Start with a single-stage image (e.g., node:22) ~ 180MB.
//   2) Split into deps/build/runtime stages; copy only dist + prod node_modules.
//   3) Measure:
//      $ docker images | grep myapp
//      $ docker history myapp:latest

// B) Add HEALTHCHECK and watch transitions:
$ docker run --name myapp -d -p 3000:3000 myapp:latest
$ docker ps        // STATUS shows (health: starting|healthy|unhealthy)
$ docker inspect --format '{{.State.Health}}' myapp

2.9  QUICK TIPS CHECKLIST
----------------------------------------------------------------------------
// [ ] Pin base images (tag or digest).
// [ ] Keep context tiny (.dockerignore).
// [ ] Split deps install from source COPY for better cache.
// [ ] Multi-stage builds to strip dev tools.
// [ ] Drop root; set USER.
// [ ] Use exec-form ENTRYPOINT/CMD; handle SIGTERM.
// [ ] Add HEALTHCHECK for L4 routing/auto-restarts upstream.
// [ ] Labels for provenance; consider SBOM generation.
// [ ] Prefer BuildKit for cache mounts + secrets.

===============================================================================
*/


////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////