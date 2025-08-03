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
//    Example: echo "Hello, World!" file.txt  
//    it will print "Hello, World!" to the terminal and save it to file.txt

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
