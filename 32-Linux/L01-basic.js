/**
 * Linux Commands Reference
 * 
 * Each command is listed with its syntax and explanation.
 * Use these commands in the terminal to perform various tasks.
 */

// 1. ls - list directory contents
//    Syntax: ls [options] [path]
//    Why: To view files and directories in the specified path.

// 2. cd - change directory
//    Syntax: cd [directory]
//    Why: To navigate between directories.

// 3. pwd - print working directory
//    Syntax: pwd
//    Why: To display the current directory’s full path.

// 4. mkdir - make directory
//    Syntax: mkdir [options] directory
//    Why: To create a new directory.

// 5. rmdir - remove directory
//    Syntax: rmdir [options] directory
//    Why: To delete an empty directory.

// 6. touch - create or update file timestamp
//    Syntax: touch [options] file
//    Why: To create an empty file or update its access/modification time.

// 7. cp - copy files or directories
//    Syntax: cp [options] source destination
//    Why: To copy files or directories.

// 8. mv - move or rename files or directories
//    Syntax: mv [options] source destination
//    Why: To move or rename files or directories.

// 9. rm - remove files or directories
//    Syntax: rm [options] file
//    Why: To delete files or directories (use with care!).

// 10. cat - concatenate and display file content
//     Syntax: cat [options] file
//     Why: To view file contents or combine multiple files.

// 11. head - output the first part of files
//     Syntax: head [options] file
//     Why: To view the beginning of a file (default: first 10 lines).

// 12. tail - output the last part of files
//     Syntax: tail [options] file
//     Why: To view the end of a file; often used with -f to follow logs in real time.

// 13. less - view file with paging
//     Syntax: less [options] file
//     Why: To browse through large files interactively (scroll up/down).

// 14. grep - search text using patterns
//     Syntax: grep [options] pattern file
//     Why: To find lines matching a pattern in files using regular expressions.

// 15. find - search for files and directories
//     Syntax: find [path] [options] [expression]
//     Why: To locate files/directories based on name, size, permissions, etc.

// 16. chmod - change file permissions
//     Syntax: chmod [options] mode file
//     Why: To set read/write/execute permissions for user/group/others.

// 17. chown - change file owner and group
//     Syntax: chown [options] owner[:group] file
//     Why: To modify file ownership to a different user or group.

// 18. ps - report process status
//     Syntax: ps [options]
//     Why: To list running processes and their PIDs.

// 19. top - display real-time system processes
//     Syntax: top
//     Why: To monitor CPU and memory usage dynamically.

// 20. kill - terminate processes
//     Syntax: kill [options] pid
//     Why: To stop processes by PID (use -9 for force).

// 21. df - report file system disk space usage
//     Syntax: df [options]
//     Why: To check available and used disk space on mounted filesystems.

// 22. du - estimate file and directory space usage
//     Syntax: du [options] [path]
//     Why: To see disk usage of files/directories (size summary).

// 23. free - display memory usage
//     Syntax: free [options]
//     Why: To view system RAM and swap usage.

// 24. uname - print system information
//     Syntax: uname [options]
//     Why: To get OS name, kernel version, architecture, etc.

// 25. man - display manual pages
//     Syntax: man command
//     Why: To read documentation and usage details for commands.

// 26. echo - display a line of text
//     Syntax: echo [options] [string]
//     Why: To print messages or variable values to the terminal.

// 27. history - show command history
//     Syntax: history [options]
//     Why: To view or reuse previously executed commands.

// 28. ssh - secure shell connection
//     Syntax: ssh [options] user@host
//     Why: To log into a remote machine securely over the network.

// 29. scp - secure copy over SSH
//     Syntax: scp [options] source destination
//     Why: To transfer files between hosts securely.

// 30. tar - archive files
//     Syntax: tar [options] archive file(s)
//     Why: To create or extract tarball archives (.tar, .tar.gz formats).

// 31. wget - download files from the web
//     Syntax: wget [options] url
//     Why: To fetch files via HTTP, HTTPS, or FTP from the command line.

// 32. curl - transfer data to or from a server
//     Syntax: curl [options] url
//     Why: To interact with URLs, test APIs, download/upload data.

// 33. sudo - run command with elevated privileges
//     Syntax: sudo command
//     Why: To execute commands as the superuser or another user.

// 34. apt-get - Debian/Ubuntu package management
//     Syntax: sudo apt-get [options] action package
//     Why: To install, update, or remove software packages.

// 35. rpm - Red Hat Package Manager
//     Syntax: rpm [options] package
//     Why: To manage packages on RPM-based distributions.

// 36. systemctl - control systemd services
//     Syntax: systemctl [options] command service
//     Why: To start, stop, enable, or check status of services.

// 37. journalctl - query systemd journal logs
//     Syntax: journalctl [options]
//     Why: To view system and service logs collected by systemd.

// 38. ip - show/manipulate routing, devices, policy routing
//     Syntax: ip [options] object command
//     Why: To configure networking (addresses, routes, links).

// 39. ifconfig - configure network interfaces (deprecated)
//     Syntax: ifconfig [interface] [options]
//     Why: To view or configure network interfaces (use ip instead).

// 40. ping - send ICMP ECHO_REQUEST to network hosts
//     Syntax: ping [options] destination
//     Why: To test connectivity between local and remote hosts.

// 41. whoami - display effective username
//     Syntax: whoami
//     Why: To show the current logged-in user.

// 42. uptime - tell how long the system has been running
//     Syntax: uptime
//     Why: To view system load averages and uptime.

// 43. chmod +x - make script executable
//     Syntax: chmod +x script.sh
//     Why: To grant execute permission to run scripts.

// 44. uname -a - print all system information
//     Syntax: uname -a
//     Why: To get detailed system information in one go.

// 45. export - set environment variables
//     Syntax: export VAR="value"
//     Why: To define or modify environment variables for sessions.

// 46. alias - create shortcuts for commands
//     Syntax: alias ll="ls -la"
//     Why: To define custom command shortcuts.

// 47. sleep - delay for a specified amount of time
//     Syntax: sleep [seconds]
//     Why: To pause execution in scripts or terminals.

// 48. killall - kill processes by name
//     Syntax: killall [options] process_name
//     Why: To terminate all instances of a process by name.

// 49. xargs - build and execute command lines from standard input
//     Syntax: xargs [options] command
//     Why: To apply commands to lists of items from input.

// 50. tee - read from standard input and write to standard output and files
//     Syntax: command | tee file
//     Why: To capture output to files while also displaying it.

// Advanced Commands

// 51. htop - interactive process viewer
//     Syntax: htop
//     Why: To monitor processes with an improved interface, supports scrolling, sorting, and killing.

// 52. lsof - list open files
//     Syntax: lsof [options] [file|directory|-p pid]
//     Why: To display all files opened by processes, useful for diagnosing resource locks.

// 53. strace - trace system calls and signals
//     Syntax: strace [options] command [args]
//     Why: To debug program execution by tracing system calls and signals.

// 54. ss - socket statistics
//     Syntax: ss [options]
//     Why: To inspect network sockets, connections, and listening ports; faster and more informative than netstat.

// 55. tcpdump - network packet analyzer
//     Syntax: tcpdump [options] [filter]
//     Why: To capture and analyze network traffic for diagnostics and security auditing.

// 56. rsync - remote and local file synchronization
//     Syntax: rsync [options] source destination
//     Why: To efficiently sync files and directories, transferring only changes, supports compression and SSH.

// 57. tmux - terminal multiplexer
//     Syntax: tmux [options] [command]
//     Why: To manage multiple terminal sessions, detach and reattach sessions for persistent work.

// 58. iptables - IPv4 packet filtering and NAT
//     Syntax: sudo iptables [options] [chain] [rule-specification]
//     Why: To configure firewall rules, network address translation, and packet mangling.

// 59. sed - stream editor
//     Syntax: sed [options] 'script' file
//     Why: To perform basic text transformations on file streams using scripts.

// 60. awk - pattern scanning and processing language
//     Syntax: awk [options] 'program' file
//     Why: To process and analyze text files line by line using patterns and actions.








////////////////////////////////////////////////////////////

// for the login we use the ssh port 22 
// for the web server we use the http port 80
// for the secure web server we use the https port 443
// for the mail server we use the smtp port 25
// for the secure mail server we use the smtps port 465
// for the pop3 server we use the pop3 port 110


// public key authentication is more secure than password authentication
// private key is kept secret on the client side
// ssh keys are generated using ssh-keygen
// putty is a popular SSH client for Windows











///////////////////////////////////////////////////


/**
 * Linux Commands Cheat-Sheet
 *
 * 1. Login-Related
 *    ssh user@host             // Securely open a remote shell session
 *
 * 2. Disk-Usage
 *    df -h                     // Show available disk space (human-readable)
 *    du -sh [path]             // Show directory size summary (human-readable)
 *
 * 3. Process Management
 *    ps aux                    // List all processes with CPU/memory details
 *    top                       // Interactive real-time view of running processes
 *    fuser -m [path]           // Identify processes accessing a file or filesystem
 *    kill PID                  // Terminate a process by its PID (use -9 for force)
 *    nohup cmd &               // Run command immune to hangups; continues after logout
 *    free -h                   // Display RAM and swap usage (human-readable)
 *    vmstat [interval]         // Show VM, CPU, I/O stats periodically
 *
 * 4. System-Level Commands
 *    uname                     // Print kernel name and system info
 *    uptime                    // Show system uptime and load averages
 *    date                      // Display current date and time
 *    who, whoami               // who: list logged-in users; whoami: current effective username
 *    which <cmd>               // Locate the full path of <cmd> executable
 *    id                        // Show UID, GID, and group memberships of current user
 *    sudo <cmd>                // Execute <cmd> as root (or another user)
 *    shutdown [options]        // Halt or power off the system safely
 *    reboot                    // Restart the system immediately
 *    apt-get                   // Debian/Ubuntu package management frontend
 *    yum                       // RHEL/CentOS legacy RPM package manager
 *    dnf                       // Fedora/RHEL modern RPM package manager
 *    pacman                    // Arch Linux package manager
 *    emerge/portage            // Gentoo package management (Portage system)
 *
 * 5. User & Group Management
 *    sudo <cmd>                // Execute commands with elevated privileges
 *    useradd <user>            // Create a new user account
 *    whoami                    // Display the current effective username
 *    su - <user>               // Switch to another user account
 *    passwd <user>             // Set or change the password for <user>
 *    userdel <user>            // Delete a user account
 *    groupadd <group>          // Create a new group
 *    gpasswd -a <user> <group> // Add <user> to <group> (use -m to create group if missing)
 *    groupdel <group>          // Delete a group
 *
 * 6. File Permission Commands
 *    umask [mask]              // Set default file creation permission mask
 *    ls -l [file/dir]          // List files/directories with detailed perms and ownership
 *    chmod [options] mode file // Change file or directory permissions
 *    chown [options] owner[:group] file // Change file owner and optionally group
 *    chgrp [options] group file // Change group ownership of a file or directory
 *
 * 7. Compression Commands
 *    zip archive.zip files...              // Create a ZIP archive
 *    unzip archive.zip                    // Extract a ZIP archive
 *    gzip file                             // Compress file to file.gz
 *    gunzip file.gz                        // Decompress gzip file
 *    tar -cvf archive.tar files...         // Create tar archive
 *    tar -xvf archive.tar                  // Extract tar archive
 *    tar -czvf archive.tar.gz files...     // Create gzipped tarball (tar + gzip)
 *    tar -xzvf archive.tar.gz              // Extract gzipped tarball
 *
 * 8. File Transfer Commands
 *    scp source user@host:destination      // Secure copy files over SSH
 *    rsync -avz source/ user@host:dest/   // Synchronize files/directories (with compression)
 *
 * 9. Text Processing Commands
 *    cat [file]                            // Concatenate and display file contents
 *    head [options] file                   // Show first lines of a file (default 10)
 *    tail [options] file                   // Show last lines of a file (default 10, use -f to follow)
 *    less file                             // View file pages interactively
 *    grep [options] pattern file...        // Search for pattern in files
 *    sed 'script' file                     // Stream editor for text transformations
 *    awk 'program' file                    // Pattern scanning and processing language
 *    cut [options] file                    // Extract columns or fields from lines
 *    sort [options] file                   // Sort lines in text files
 *    uniq [options] file                   // Report or filter duplicate lines
 *
 * 10. Networking Commands
 *    ping [options] host                   // Send ICMP ECHO_REQUEST to network host
 *    ss [options]                          // Show socket statistics (preferred over netstat)
 *    netstat [options]                     // Network connections, routing tables, interface stats
 *    traceroute host                       // Print route packets take to network host
 *    curl [options] url                    // Transfer data with URL syntax
 *    wget [options] url                    // Non-interactive download of files from web
 *    dig [options] host                    // DNS lookup utility
 *    nslookup host                         // Query Internet name servers interactively
 *
 * 11. Filesystem & Storage Commands
 *    lsblk                                 // List block devices
 *    blkid                                 // Locate/print block device attributes
 *    mount [options] device dir            // Mount a filesystem
 *    umount [options] target               // Unmount a filesystem
 *    fdisk / parted                        // Partition table manipulator (fdisk or parted)
 *    mkfs.<fstype> device                  // Create a filesystem on a device (e.g. mkfs.ext4)
 *    fsck [options] filesystem             // File system consistency check and repair
 *
 * 12. Logs & Monitoring
 *    journalctl [options]                  // Query systemd journal logs
 *    dmesg [options]                       // Print or control kernel ring buffer
 *    tail -f file                          // Follow file output in real time
 *    watch [options] cmd                   // Execute a program periodically, showing output
 *
 * 13. Shell Utilities
 *    history                               // Display or manipulate command history
 *    alias [name[='value']]                // Define or display aliases
 *    env                                   // Display environment variables
 *    export VAR=value                      // Set environment variable for current shell
 *    echo [string]                         // Display a line of text
 *    clear                                 // Clear the terminal screen
 *    xargs [options] cmd                   // Build and execute command lines from input
 *    tee file                              // Read stdin and write to stdout and file
 *
 * 14. Job Scheduling
 *    crontab -e                            // Edit user's cron jobs
 *    crontab -l                            // List user's cron jobs
 *    at time                                // Schedule command to run once at a later time
 *
 * Usage Tips:
 *   • Combine these commands for routine maintenance:
 *     - Quick checks: uname -a; uptime; df -h; free -h
 *     - Text search: grep -R 'pattern' /path
 *     - Schedule tasks: crontab -e; at 09:00
 */
