

// docker images
    // blue print ,immutable , docker hub , docker desktop
    // base image 


// docker containers
     // a running instance of an image 

     // docker build -t 'my-image' .
     // docker run -d -p 80:80 my-image
     // docker image             //  to see the all images 
     // docker container ls      // to see all running containers
     // docker container ls -a   // to see all containers (running and stopped)
     // docker system prune -a // to remove all stopped containers and unused images
     // docker container stop <container_id> // to stop a running container
     // docker container rm <container_id> // to remove a stopped container
     // docker run -it <image_id> // to run a container interactively
     // 

// docker voulmes
    // persistent storage for containers


// compose file 
// docker-compose.yml
    // version: '3.8'   





////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////



/*
====================================
1. Introduction to Docker (Beginner Level)
====================================

1) What is Docker?
   - Docker is a platform for building, running, and managing containers.
   - A container is a lightweight, standalone package with everything needed to run an app (code, runtime, libraries, dependencies, config).
   - Ensures apps run the same in dev, test, and production.

2) History & Evolution of Containerization
   - Before containers → apps shipped with setup instructions, causing "works on my machine" problems.
   - Virtual Machines (VMs) solved some issues but were heavy (each VM had its own OS).
   - Containers share the host OS kernel → much lighter and faster.
   - Docker (released in 2013) made containers easy to use with simple CLI commands.

3) Difference Between Docker & Virtual Machines
   -------------------------------------------------
   | Feature       | Docker (Containers) | Virtual Machine |
   |---------------|---------------------|-----------------|
   | OS            | Shares host kernel  | Own OS per VM   |
   | Size          | MBs                 | GBs             |
   | Startup time  | Seconds             | Minutes         |
   | Performance   | Near-native         | Slower          |
   | Isolation     | Process-level       | Full OS-level   |
   -------------------------------------------------
   - Docker is faster, lighter, and more portable than VMs.

4) Why Docker?
   - Consistency: Same environment everywhere.
   - Speed: Containers start in seconds.
   - Isolation: No dependency conflicts.
   - Portability: Runs on any system with Docker installed.

5) Benefits
   - Portability → Move between dev, test, prod easily.
   - Speed → Faster startup and deployment.
   - Consistency → Eliminates "works on my machine" issues.
   - Resource Efficiency → Uses fewer resources than VMs.

6) Core Concepts
   - Image → Blueprint/template for an app (read-only).
   - Container → Running instance of an image.
   - Docker Engine → Core service that runs/manages containers.
   - Docker CLI → Command-line tool to interact with Docker.
   - Docker Desktop → GUI + CLI tool for Windows/Mac.

7) Installation & Setup
   - Windows → Install Docker Desktop (requires WSL2 or Hyper-V).
   - Mac → Install Docker Desktop for Mac.
   - Linux → Install via package managers (apt, yum, dnf, etc.).

   - Docker Compose:
     * Tool to run multi-container applications (e.g., app + DB).
     * Comes with Docker Desktop or install separately on Linux.

   - Verifying Installation:
     docker --version
     docker compose version
     → If versions appear, installation is successful.
*/


////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

/*
====================================
2) Docker Basics — Notes (JS-style)
====================================

A) Basic Commands (what they do + mini examples)
------------------------------------------------
- docker run IMAGE [CMD]         → Create + start a container from an image
  e.g. docker run alpine echo "hi"

- docker ps                      → List RUNNING containers
  e.g. docker ps
  -a (all) to include stopped: docker ps -a

- docker stop CONTAINER          → Gracefully stop (SIGTERM then SIGKILL)
  e.g. docker stop my-nginx

- docker rm CONTAINER            → Remove a (stopped) container
  e.g. docker rm my-nginx
  -f (force) stops then removes: docker rm -f my-nginx

- docker rmi IMAGE               → Remove image (must not be used by containers)
  e.g. docker rmi nginx:latest

- docker pull IMAGE[:TAG]        → Download image from registry (Docker Hub by default)
  e.g. docker pull redis:7

- docker images                  → List local images
  e.g. docker images

Tip: You can reference by name or ID (short IDs are fine). Use `docker ps` / `docker images` to copy IDs quickly.

B) Running Containers (key flags you’ll use daily)
--------------------------------------------------
1) Interactive containers (-it)
   - -i → keep STDIN open
   - -t → allocate a pseudo-TTY (nice shell experience)
   Examples:
     # Start a tiny Linux and open a shell
     docker run -it alpine sh

     # Ubuntu with bash
     docker run -it ubuntu bash

2) Detached mode (-d)
   - Run in the background (useful for services like nginx/redis)
   Example:
     docker run -d --name web nginx
     docker ps   # verify it’s running

3) Port mapping (-p HOST:CONTAINER)
   - Publishes container port(s) to your host so you can reach services
   Examples:
     # Map host 8080 → container 80 (nginx default)
     docker run -d --name web -p 8080:80 nginx
     # Now open http://localhost:8080

   Notes:
     - You can map multiple ports with multiple -p flags.
     - Only *published* ports are reachable from your host.

4) Volume mounting (-v SRC:DST[:MODE])
   - Bind mount: use a host folder inside the container (great for local dev)
   Examples:
     # Mount current folder into /usr/share/nginx/html (read-only)
     docker run -d -p 8080:80 \
       -v "$PWD":/usr/share/nginx/html:ro \
       --name web nginx

     # Windows PowerShell example (quote paths carefully):
     docker run -d -p 8080:80 `
       -v "${PWD}:/usr/share/nginx/html:ro" `
       --name web nginx

   Notes:
     - SRC: host path, DST: container path
     - :ro (read-only) or :rw (default)

C) Exploring Images
-------------------
1) Finding images on Docker Hub
   - Browse: https://hub.docker.com (search, read tags & docs)
   - Pull by name: docker pull <name>:<tag>
     e.g. docker pull node:18-alpine

2) Using official images (nginx, redis, mysql, etc.)
   Examples:
     # NGINX web server (publish to host 8080)
     docker run -d -p 8080:80 --name web nginx

     # Redis in-memory store
     docker run -d --name cache -p 6379:6379 redis:7

     # MySQL (set required env vars)
     docker run -d --name db -p 3306:3306 \
       -e MYSQL_ROOT_PASSWORD=secret \
       -e MYSQL_DATABASE=appdb \
       mysql:8

   Tips:
     - Check each image page for env vars, volumes, and default ports.
     - Prefer slim/alpine tags for smaller images when appropriate.

D) Container Lifecycle (Create → Start → Stop → Restart → Remove)
-----------------------------------------------------------------
1) Create (prepare but don’t start):
   docker create --name web -p 8080:80 nginx

2) Start (run a created/stopped container):
   docker start web

3) Stop (graceful) and Restart:
   docker stop web
   docker restart web

4) Remove container and image:
   docker rm web
   docker rmi nginx:latest

Related checks:
   - List running containers: docker ps
   - List all containers (incl. stopped): docker ps -a
   - See container details (useful for ports/volumes): docker inspect <container>
   - View logs of a running container: docker logs -f <container>

Mental model:
   Image (blueprint) → Container (running instance).
   You can create many containers from the same image.
   Remove containers before removing the underlying image.

--------------------------------
Quick practice (copy/paste-friendly)
--------------------------------
# 1) Pull and run nginx on http://localhost:8080
docker pull nginx:latest
docker run -d --name web -p 8080:80 nginx

# 2) Update site content via bind mount (serves current folder)
docker rm -f web
docker run -d --name web -p 8080:80 -v "$PWD":/usr/share/nginx/html:ro nginx

# 3) Inspect and clean up
docker ps
docker logs web
docker stop web && docker rm web
*/



////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////