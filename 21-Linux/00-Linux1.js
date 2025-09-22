/*
========================================
🔥 LINUX COMPLETE SYLLABUS (Beginner → Master)
========================================

1. Linux Fundamentals
   - What is Linux? History & evolution
   - Linux distributions (Ubuntu, CentOS, Fedora, Arch, etc.)
   - Open Source & GNU philosophy
   - Kernel vs OS
   - Linux installation methods (VM, Dual Boot, WSL, Cloud)
   - Linux directory structure (/bin, /etc, /home, /var, /tmp, /opt)

2. Basic Linux Commands
   - pwd, ls, cd
   - cat, touch, cp, mv, rm, mkdir, rmdir
   - less, more, head, tail, nano, vi/vim
   - find, locate, which, whereis
   - grep, egrep, fgrep
   - ln, ln -s (hard & soft links)

3. File Permissions & Ownership
   - File permission types (rwx for user, group, others)
   - chmod (symbolic & numeric)
   - chown, chgrp
   - umask
   - SUID, SGID, Sticky bit

4. User & Group Management
   - /etc/passwd, /etc/shadow, /etc/group
   - useradd, userdel, passwd
   - groupadd, gpasswd
   - id, who, whoami, w
   - su, sudo (sudoers file)

5. File Handling & Text Processing
   - Redirection (> , >> , < , 2>)
   - Pipes (|)
   - cut, sort, uniq, wc
   - tr, awk, sed
   - diff, cmp, comm

6. Process Management
   - ps, top, htop
   - jobs, fg, bg
   - kill, killall, pkill
   - nice, renice
   - signals (SIGTERM, SIGKILL, SIGSTOP);

7. Package Management
   - apt, dpkg (Debian/Ubuntu)
   - yum, dnf, rpm (CentOS/Fedora)
   - snap, flatpak, AppImage
   - Compile from source (make, ./configure)

8. Disk Management & File Systems
   - lsblk, blkid, df, du
   - fdisk, parted
   - mount, umount, /etc/fstab
   - ext4, xfs, btrfs, zfs basics
   - LVM basics
   - Disk quotas



9. Archiving & Compression
   - tar, gzip, gunzip, bzip2, xz
   - zip, unzip
   - rsync basics

10. Shells & Scripting
   - Bash, Zsh, Fish
   - Variables & operators
   - Conditionals (if, case)
   - Loops (for, while, until)
   - Functions
   - Command substitution
   - Shell profiles (.bashrc, .bash_profile)
   - Writing & running shell scripts

11. Networking Basics
   - ifconfig, ip addr, ip route
   - ping, traceroute, nslookup, dig
   - netstat, ss, lsof
   - curl, wget, scp, sftp
   - ssh, ssh-keygen
   - Firewall basics: ufw, iptables

12. System Monitoring & Logs
   - uptime, dmesg, vmstat, iostat
   - free, sar, mpstat
   - top, htop, glances
   - journalctl (systemd logs)
   - Log files in /var/log

13. Scheduling & Automation
   - cron jobs
   - at, anacron
   - systemd timers
   - Backup strategies (rsync, tar, snapshots)

14. Security & Hardening
   - SELinux, AppArmor
   - Firewall (ufw, firewalld, nftables)
   - Fail2ban
   - SSH hardening
   - Auditing & monitoring logs
   - Rootkit detection tools

15. Virtualization & Containers
   - KVM, QEMU basics
   - VirtualBox, VMware
   - Docker fundamentals
   - Podman
   - Namespaces & cgroups

16. System Administration (Intermediate → Advanced)
   - Boot process (BIOS/UEFI → GRUB → init/systemd)
   - Runlevels & systemd targets
   - Service management with systemctl
   - Recovery & single-user mode
   - Kernel modules (lsmod, insmod, modprobe)

17. Advanced Networking
   - Configuring static & dynamic IPs
   - Netplan, NetworkManager
   - Advanced iptables rules
   - VPN basics (OpenVPN, WireGuard)
   - NFS, Samba, FTP servers
   - Web servers (Apache, Nginx basics)

18. Advanced Scripting & Automation
   - Advanced bash scripting
   - Using awk & sed deeply
   - Writing monitoring scripts
   - Ansible basics
   - Puppet, Chef overview
   - Infrastructure as Code concept

19. Linux for Developers
   - GCC & build tools
   - Makefiles
   - Git on Linux
   - Debugging with gdb, strace, ltrace
   - Environment setup (Node.js, Python, etc.)

20. Linux in Cloud & DevOps
   - Linux on AWS/Azure/GCP
   - Cloud-init basics
   - Docker with Linux
   - Kubernetes on Linux
   - CI/CD tools on Linux (Jenkins, GitHub Actions)

21. Expert Linux Topics
   - Kernel compilation & tuning
   - Custom initramfs
   - Advanced system calls
   - Namespaces in depth
   - Performance tuning & optimization
   - High Availability: HAProxy, Keepalived, Pacemaker
   - Security hardening (CIS Benchmarks)

22. Linux Certification & Interview Prep
   - RHCSA, RHCE, LFCS, LFCE
   - Troubleshooting scenarios
   - Real-world sysadmin case studies
   - Common interview Q&A

========================================
END OF SYLLABUS
========================================
*/



// sudo apt update     -- for the update the package list
// sudo apt upgrade    -- for the upgrade the package
// sudo apt install package_name   -- for the install the package
// sudo apt remove package_name    -- for the remove the package
// sudo apt autoremove              -- for the remove the unused package 





// command option arguments


// pwd

// cd ..
// cd /home

// ls
// ls -l
// ls -a     -- it will show the hidden files also

// mkdir myfolder

// mv myfolder newfoldername

// rmdir newfoldername
// rm myfile.txt

// rm -r newfoldername

// cp source destination
// cp -r sourcefolder destinationfolder
// cp -i source destination   -- it will ask before overwrite the file
// cp -u source destination   -- it will copy only when the source file is newer than the destination file or when the destination file is missing



// cd myfolder

// touch myfile.txt

// cat myfile.txt

// head -n 10 textfile.txt   -- it will show the first 10 lines of the file
// tail -n 10 textfile.txt   -- it will show the last 10 lines of the file

// less textfile.txt   -- it will show the file content page by page
// more textfile.txt   -- it will show the file content page by page

// wc -l textfile.txt   -- it will show the number of lines in the file
// wc -w textfile.txt   -- it will show the number of words in the file
// wc -c textfile.txt   -- it will show the number of characters in the file
// wc -lwc textfile.txt   -- it will show the number of lines, words and characters in the file


// du myfolder   -- it will show the size of the folder
// du -h myfolder   -- it will show the size of the folder in human readable format
// du -sh myfolder   -- it will show the total size of the folder in human readable format


// echo "Hello World" >> myfile.txt
// echo "test "    -- it will print the test in the terminal
// echo "ff" >> myfile.txt   -- it will append the ff to the file





// nano myfile.txt

// vim myfile.txt

// rm myfile.txt

//  absolute path
//  relative path

// cd .. ; ls



// user management 
// system user
// root user
// normal user




// pipe command 
// command1 | command2 | command3
// it will take the output of the command1 and pass it to the command2 as input
// it will take the output of the command2 and pass it to the command3 as input



// sort user.txt   -- it will sort the file in ascending order
// sort -r user.txt   -- it will sort the file in descending order
// sort -n user.txt   -- it will sort the file in numerical order
// sort -k 2 user.txt   -- it will sort the file based on the second column
// sort -t ',' -k 2 user.txt   -- it will sort the file based on the second column with comma as delimiter


// uniq user.txt   -- it will remove the duplicate lines from the file
// uniq -c user.txt   -- it will count the number of occurrences of each line in the file
// uniq -d user.txt   -- it will show only the duplicate lines in the file
// uniq -u user.txt   -- it will show only the unique lines in the file

// grep 'search_term' user.txt   -- it will search the search_term in the file
// grep -i 'search_term' user.txt   -- it will search the search_term in the file ignoring case
// grep -v 'search_term' user.txt   -- it will show the lines which does not contain the search_term
// grep -r 'search_term' /path/to/directory   -- it will search the search_term in all the files in the directory recursively
// grep -n 'search_term' user.txt   -- it will show the line number along with the line which contains the search_term
// grep -c 'search_term' user.txt   -- it will show the count of lines which contains the search_term
// grep -A 3 'search_term' user.txt   -- it will show the 3 lines after the line which contains the search_term
// grep -B 3 'search_term' user.txt   -- it will show the 3 lines before the line which contains the search_term
// grep -C 3 'search_term' user.txt   -- it will show the 3 lines before and after the line which contains the search_term
// grep -E 'search_term1|search_term2' user.txt   -- it will search for multiple search terms in the file
// grep -F 'search_term' user.txt   -- it will search for the fixed string in the file
// grep -L 'search_term' *.txt   -- it will show the files which does not contain the search_term
// grep -l 'search_term' *.txt   -- it will show the files which contains the search_term
// grep -o 'search_term' user.txt   -- it will show only the matched search_term in the file
// grep -P 'search_term' user.txt   -- it will search for the perl compatible regular expression in the file
// grep -w 'search_term' user.txt   -- it will search for the whole word in the file
// grep -x 'search_term' user.txt   -- it will search for the whole line in the file
// grep -R 'search_term' /path/to/directory   -- it will search the search_term in all the files in the directory recursively
// grep --color=auto 'search_term' user.txt   -- it will highlight the search_term in the file


// tr 'a-z' 'A-Z' < user.txt   -- it will convert all the lowercase letters to uppercase letters in the file
// tr 'A-Z' 'a-z' < user.txt   -- it will convert all the uppercase letters to lowercase letters in the file
// tr -d 'a-z' < user.txt   -- it will delete all the lowercase letters from the file
// tr "b" "B" < user.txt   -- it will replace all the b with B in the file
// tr -s ' ' < user.txt   -- it will replace multiple spaces with single space in the file
// tr -s '\n' < user.txt   -- it will replace multiple new lines with single new line in the file
// tr -c 'a-zA-Z0-9' '\n' < user.txt   -- it will replace all the special characters with new line in the file

// rev user.txt   -- it will reverse the lines in the file
// cut -d ' ' -f 1 user.txt   -- it will cut the first column from the file with space as delimiter
// cut -d ',' -f 1 user.txt   -- it will cut the first column from the file with comma as delimiter

// sed 's/old/new/g' user.txt   -- it will replace all the old with new in the file
// sed -n '1,5p' user.txt   -- it will print the lines from 1 to 5 in the file
// sed '3d' user.txt   -- it will delete the 3rd line from the file
// sed '3q' user.txt   -- it will quit after printing the 3rd line from the file
// sed '$d' user.txt   -- it will delete the last line from the file
// sed '1i\This is the first line' user.txt   -- it will insert the line at the beginning of the file
// sed '5a\This is the last line' user.txt   -- it will append the line at the end of the file
// sed -i 's/old/new/g' user.txt   -- it will replace all the old with new in the file and save the changes to the file




// env with the environment variables

// echo $HOME
// echo "$PATH"
// export VAR_NAME="value"   -- it will set the environment variable for the current session
// unset VAR_NAME   -- it will unset the environment variable for the current session
// export VAR_NAME="value" >> ~/.bashrc   -- it will set the environment variable permanently
// source ~/.bashrc   -- it will reload the bashrc file to apply the changes



// learn about the path 


// soft link hard link 

// ln source_file link_name   -- it will create a hard link
// ln -s source_file link_name   -- it will create a soft link
// ls -ltr  -- it will show the details of the files in the directory




// linux user management

// root user
// normal user
// system user

// group
// super user
// sudo user


// linux file system 


// df  -h   -- it will show the disk space in human readable format
// du -sh *   -- it will show the size of each file and folder in the current directory in human readable format

// top -- it will show the running processes in the system
// htop -- it will show the running processes in the system with more details
// ps aux -- it will show the running processes in the system with more details

// free -h -- it will show the memory usage in human readable format
// vmstat -- it will show the virtual memory statistics
// iostat -- it will show the input/output statistics
// sar -- it will show the system activity report
// mpstat -- it will show the CPU usage statistics

// uptime -- it will show the system uptime

// journalctl -- it will show the system logs

// systemctl -- it will show the systemd services status
// service -- it will show the init.d services status

// free -- it will show the memory usage

// uname -r -- it will show the kernel version
// lsb_release -a -- it will show the linux distribution details

// whoami -- it will show the current logged in user
// who -- it will show the currently logged in users
// w -- it will show the currently logged in users with more details
// id -- it will show the user id, group id and groups of the current user 

// which command_name -- it will show the path of the command
// whereis command_name -- it will show the path of the

// sudo command_name -- it will show the path of the command with super user privileges

// shutdown -h now -- it will shutdown the system immediately
// shutdown -r now -- it will reboot the system immediately
// reboot -- it will reboot the system immediately

// control r - for the reverse search of the command in the history




// useradd username   -- it will create a new user
// useradd -m username   -- it will create a new user with home directory
// useradd -s /bin/bash username   -- it will create a new user with bash shell
// useradd -G groupname username   -- it will create a new user and add to the group
// usermod -aG groupname username   -- it will add the existing user to the group


// userdel username   -- it will delete the user
// passwd username    -- it will change the password of the user
// su - username      -- it will switch to the user
// sudo command_name  -- it will run the command with super user privileges
// groupadd groupname -- it will create a new group
// groupdel groupname -- it will delete the group
// gpasswd -d username groupname -- it will remove the user from the group
// gpasswd -a username groupname -- it will add the user to the group
// gpasswd -M user1,user2 groupname -- it will set the members of the group


// groups username   -- it will show the groups of the user
// id username       -- it will show the user id, group id and groups of the user
// groups username   -- it will show the groups of the user
// gpasswd username  -- it will change the password of the group
// newgrp groupname  -- it will switch to the group



// exit -- it will exit from the current user to the previous user


// chmod 755 filename   -- it will set the permissions to rwxr-xr-x
// chmod 644 filename   -- it will set the permissions to rw-r--r--
// chmod 700 filename   -- it will set the permissions to rwx------


// umask 022   -- it will set the default permissions to rwxr-xr-x
// umask 002   -- it will set the default permissions to rwxrwxr-x
// umask 077   -- it will set the default permissions to rwx------

// chown user:group filename   -- it will change the owner and group of the file

// chgrp groupname filename   -- it will change the group of the file

// echo $$ -- it will show the process id of the current shell
// echo $SHELL -- it will show the current shell
// echo $0 -- it will show the current shell
// echo $PATH -- it will show the path of the commands
// echo $PPID -- it will show the parent process id of the current shell




// linux networking basics

// ifconfig -- it will show the network interfaces details
// ip addr  -- it will show the network interfaces details
// ip link  -- it will show the network interfaces details
// ip route -- it will show the routing table
// ping google.com -- it will ping the google.com
// traceroute google.com -- it will show the route to the google.com
// tracepath google.com -- it will show the path to the google.com
// nslookup google.com -- it will show the DNS details of the google.com
// dig google.com -- it will show the DNS details of the google.com
// netcat -zv google.com 80 -- it will check if the port 80 is open on google.com
// mtr google.com -- it will show the route to the google.com with more details

// netstat -tuln -- it will show the listening ports
// ss -tuln -- it will show the listening ports
// lsof -i -- it will show the open files and network connections
// curl google.com -- it will show the html content of the google.com
// wget google.com -- it will download the html content of the google.com
// scp file.txt user@remote_host:/path/to/destination -- it will copy the file to the remote host
// sftp user@remote_host -- it will open the sftp session to the remote host
// ssh user@remote_host -- it will open the ssh session to the remote host


// telnet remote_host 80 -- it will connect to the remote host on port 80
// ssh-keygen -- it will generate the ssh key pair
// ssh-copy-id user@remote_host -- it will copy the ssh public key to the remote host


// iwconfig -- it will show the wireless network interfaces details
// iwlist scan -- it will scan the available wireless networks
// nmcli -- it will show the network manager details
// nmtui -- it will open the network manager text user interface




// # 📁 USER ACCOUNT FILES
// cat /etc/passwd          # View basic user details
// cat /etc/shadow          # View hashed passwords (root only)
// cat /etc/group           # View groups and members

// # 👤 USER MANAGEMENT
// sudo useradd ajay                         # Create new user
// sudo useradd -m -s /bin/bash ajay         # Create with home dir and bash shell
// sudo passwd ajay                          # Set/change password
// sudo usermod -aG sudo ajay                # Add user to sudo group
// sudo usermod -l newname ajay              # Rename user
// sudo usermod -d /home/newhome ajay        # Change home directory
// sudo chage -l ajay                        # View password aging info
// sudo chage -M 90 ajay                     # Set password expiration (90 days)
// sudo userdel ajay                         # Delete user (keep home)
// sudo userdel -r ajay                      # Delete user and home

// # 👥 GROUP MANAGEMENT
// sudo groupadd developers                  # Create group
// sudo groupmod -n devteam developers       # Rename group
// sudo groupdel developers                  # Delete group
// sudo usermod -aG developers ajay          # Add user to group
// sudo gpasswd -d ajay developers           # Remove user from group
// groups ajay                               # Show groups for a user
// id ajay                                   # Show UID, GID, memberships

// # 🔑 SWITCH USERS & ELEVATE PRIVILEGES
// su - ajay                                 # Switch user with environment
// sudo -u postgres psql                     # Execute as another user
// sudo visudo                               # Safely edit /etc/sudoers
// sudo -l                                   # List allowed sudo commands
// sudo whoami                               # Confirm elevated privileges

// # 📜 /ETC/SUDOERS EXAMPLES
// # ajay ALL=(ALL:ALL) ALL                          # Grant sudo rights
// # %devteam ALL=NOPASSWD: /bin/systemctl restart apache2  # Group restart Apache w/o password

// # 📂 FILE PERMISSIONS & OWNERSHIP
// ls -l                                      # List with permissions
// stat filename                              # Detailed file info
// chmod u+x script.sh                        # Add execute for owner
// chmod g-w file.txt                          # Remove write for group
// chmod o=r file.txt                          # Set read for others
// chmod 755 script.sh                         # rwxr-xr-x
// sudo chown ajay file.txt                    # Change owner
// sudo chown ajay:developers file.txt         # Change owner and group
// chmod -R 755 /var/www                       # Recursive change
// chown -R www-data:www-data /var/www         # Recursive ownership change
// umask                                      # Show default mask
// umask 022                                  # Set default perms to 755

// # 📌 SPECIAL PERMISSIONS
// chmod +t /shared                            # Sticky bit for shared dirs
// chmod u+s /path/to/program                  # SUID: run as file owner
// chmod g+s /projectdir                       # SGID: inherit group ID

// # ✅ BEST PRACTICES (NOT COMMANDS)
// # - Use sudo, not root login
// # - Edit /etc/sudoers with visudo
// # - Manage permissions via groups
// # - Use restrictive umask (e.g., 027)
// # - Audit /etc/passwd, /etc/shadow, /etc/sudoers regularly



// # 📌 PROCESS BASICS
// ps                     # List running processes (default = current shell)
// ps aux                 # BSD-style full listing of all processes
// ps -ef                 # Full-format listing (SysV style)
// top                    # Interactive real-time process monitor
// htop                   # Alternative interactive monitor (colorful, scrollable)
// pgrep nginx            # Find PIDs of processes matching "nginx"
// pidof sshd             # Find PID of a specific program

// # 📌 PROCESS STATES & CONTEXT SWITCHING
// # (Use ps, top, or htop to view states like R=Running, S=Sleeping, Z=Zombie)
// # Context switches are internal to multitasking—monitored via tools like vmstat or perf.

// # 📌 PROCESS PRIORITY (NICENESS)
// nice -n 10 mycommand          # Start with lower priority (higher niceness)
// sudo renice -5 1234           # Change priority of PID 1234 to -5 (higher priority)
// ps -o pid,comm,ni -p 1234     # Show niceness of specific PID

// # 📌 SIGNALS & KILLING PROCESSES
// kill -l                       # List all available signals
// kill -SIGINT 1234             # Send SIGINT (Ctrl+C equivalent) to PID 1234
// kill -SIGTERM 1234            # Gracefully terminate PID 1234
// kill -9 1234                  # Force-kill PID 1234 (SIGKILL)
// kill -SIGHUP 1234             # Hangup signal—restart some daemons
// kill -SIGSTOP 1234            # Pause a process
// kill -SIGCONT 1234            # Resume a paused process
// killall firefox               # Send default SIGTERM to all firefox processes
// sudo pkill -HUP apache2       # Send SIGHUP to apache2 processes

// # 📌 FOREGROUND & BACKGROUND CONTROL
// sleep 100 &                   # Run in background (&)
// jobs                          # List background jobs
// fg %1                         # Bring job #1 to foreground
// bg %1                         # Resume job #1 in background
// disown %1                      # Remove job #1 from shell job table 

// # 📌 PROCESS CLEANUP
// # Zombie processes (Z) indicate parent didn’t reap—kill or restart parent or reassign orphan to init.
// # Orphan processes get adopted by PID 1 (systemd).

// # 📌 ADVANCED MONITORING
// top -u ajay                   # Show processes for a specific user
// top -p 1234                   # Monitor specific PID
// htop -u root                  # Filter htop by user
// watch -n 1 ps aux             # Refresh ps every second

// # ✅ BEST PRACTICES
// # - Prefer SIGTERM before SIGKILL for graceful shutdown.
// # - Use nice/renice instead of killing CPU-hungry processes immediately.
// # - Monitor with top/htop to avoid runaway resource usage.
// # - Use pkill/killall cautiously—may affect multiple processes.












// # 🧰 JOB CONTROL CHEAT SHEET (Bash)

// # ▶️ START JOBS IN BACKGROUND
// cmd &                              # Run in background, print [job_id] PID
// long_task >/tmp/out.log 2>&1 &     # Background + redirect output

// # 📋 LIST & INSPECT JOBS
// jobs                                # List background/suspended jobs
// jobs -l                             # Include PIDs
// jobs -r                             # Running only
// jobs -s                             # Stopped only

// # 🎮 BRING TO FOREGROUND / SEND TO BACKGROUND
// fg                                  # Foreground most recent job
// fg %1                               # Foreground job by job-id
// bg %1                               # Resume stopped job in background
// %?name                               # Refer to job by partial command match (e.g., fg %?node)

// # ⏸️ SUSPEND FROM FOREGROUND (CTRL+Z)
// # While a job runs in foreground, press: Ctrl+Z  -> stops it
// bg %1                               # Then continue it in background

// # 🧹 DETACH FROM SHELL
// disown %1                           # Remove job from shell’s job table (keeps running)
// disown -h %1                        # Keep in job table but don’t send HUP on shell exit
// shopt -s huponexit                  # Auto-send HUP to jobs when shell exits (optional)

// # 🚫 STOP/TERM/KILL JOBS
// kill -SIGSTOP %1                    # Stop (pause) a job
// kill -SIGCONT %1                    # Continue a stopped job
// kill %1                             # Send SIGTERM (graceful) to job
// kill -9 %1                          # Force kill (SIGKILL) job
// kill -TERM 12345                    # By PID instead of job-id

// # 🕰️ WAIT / SYNCHRONIZE
// wait                                # Wait for all child jobs
// wait %1                             # Wait for specific job-id
// wait 12345                          # Wait for PID
// wait -n                             # Wait for the next job to finish (Bash 4.3+)
// echo $?                             # Exit status of last waited job

// # 🔒 KEEP RUNNING AFTER LOGOUT: nohup vs &
// nohup cmd >nohup.out 2>&1 &         # Immune to HUP; output to nohup.out
// nohup -p 12345                      # (GNU coreutils) show if PID is nohup-immune (where available)
// setsid cmd &                        # Start in new session (no controlling TTY)

// # 🧷 STICKY BACKGROUND (avoid SIGHUP on logout)
// # Option A: disown after starting
// cmd & disown
// # Option B: start with nohup
// nohup cmd &

// # 📦 GROUPED/BATCH JOBS
// { cmd1 & cmd2 & cmd3 & wait; }      # Run 3 jobs in parallel, wait for all
// pids=(); for i in {1..3}; do sleep $i & pids+=($!); done; wait "${pids[@]}"

// # 📡 CONTROL TTY OUTPUT FLOW (stty: suspend/flow control)
// stty -a                             # Inspect TTY settings
// # XON/XOFF flow control: Ctrl+S to pause output, Ctrl+Q to resume (if enabled)
// stty ixon                           # Enable software flow control (Ctrl+S / Ctrl+Q)
// stty -ixon                          # Disable it
// # Send “suspend” (Ctrl+Z) is handled by the shell, not stty; to change key:
// stty susp '^Z'                      # Set suspend char (rarely needed)

// # 🔍 QUICK FILTERS & REFERENCES
// jobs | grep "node"                  # Find a specific job by command text
// ps -o pid,ppid,tty,stat,time,cmd --ppid $$  # Child processes of current shell

// # 🧭 BEST PRACTICES
// # 1) Prefer SIGTERM before SIGKILL.
// # 2) Use nohup or disown for long-lived jobs before logging out.
// # 3) Name logs for background jobs: cmd >cmd.out 2>cmd.err &
// # 4) Use wait (or wait -n) to coordinate parallel steps in scripts.
