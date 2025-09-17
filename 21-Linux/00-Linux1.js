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

