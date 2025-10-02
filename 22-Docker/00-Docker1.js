// /*==============================================================================
//  DOCKER — MOST IMPORTANT COMMANDS (QUICK REFERENCE)
// ==============================================================================*/

// # Run a container (detached, name, port map)
// docker run  myapp
// docker run -d --name myapp -p 8080:80 nginx

// # Override default CMD
// docker run --rm alpine echo "Hello"

// # List containers
// docker ps             # running
// docker ps -a          # all (including stopped)
// docker ps --all       # all (including stopped)


// # Start / Stop / Restart
// docker start myapp
// docker stop myapp
// docker restart myapp

// # Remove containers
// docker rm myapp
// docker container prune    # remove all stopped

// # Logs
// docker logs myapp
// docker logs -f myapp      # follow
// docker logs --tail 10 myapp  # last 10 lines




// # Exec into running container
// docker exec -it myapp sh

// # Run with shell directly
// docker run -it --rm alpine sh

// # Resource limits & isolation
// docker run -d --name limited --cpus=1.5 --memory=512m nginx



// # create a docker 
// docker create myapp
// docker start myapp
// docker stop myapp
// docker restart myapp
// docker rm myapp


// docker system prune -a         // remove all unused data
// docker volume prune            // remove all unused volumes
// docker image prune -a          // remove all unused images
// docker container prune         // remove all stopped containers





// creating a docker image

// Dockerfile
// FROM nginx
// COPY . /usr/share/nginx/html
// EXPOSE 80

// docker build -t mynginx .
// docker run -d -p 8080:80 mynginx

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////



// # Very basic Node.js Dockerfile
// FROM node:20-alpine

// # Create app dir
// WORKDIR /app

// # Install deps (uses lockfile if present)
// COPY package*.json ./
// RUN npm ci --only=production || npm install --omit=dev

// # Copy the rest
// COPY . .

// # Default envs (change as you like)
// ENV NODE_ENV=production
// ENV PORT=3000
// EXPOSE 3000

// # Start your app (adjust entry if different)
// CMD ["node", "server.js"]

// //////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////


// node_modules
// npm-debug.log*
// yarn-error.log*
// .pnpm-store
// .git
// .env
// //////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////


// docker build -t my-node-app .
// docker run -p 3000:3000 my-node-app

// //////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////