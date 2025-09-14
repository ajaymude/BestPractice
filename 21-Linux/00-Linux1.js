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
   - signals (SIGTERM, SIGKILL, SIGSTOP)

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



