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


