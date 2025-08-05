/**********************************************************************************************
*                                  L I N U X   C O M M A N D S                                *
*                            One-Screen Cheat-Sheet (JS comment style)                        *
*                 All commands are in UPPER-CASE for the keyword and ⟨arg⟩ for arguments.     *
*                 Keep this file as notes—you can copy-paste into any editor.                 *
**********************************************************************************************/

/* ─────────────────────────────  📂  FILE & DIRECTORY NAVIGATION  ─────────────────────────── */
// PWD                    → Print current working directory path.
// CD ⟨dir⟩               → Change into directory ⟨dir⟩.  Use `CD ..` to move up one level.
// LS [opts] [file|dir]   → List directory contents.  Popular flags: -l (long), -a (all hidden).
// TREE [dir]             → Recursively display a directory tree (may require `apt install tree`).
// PUSHd ⟨dir⟩ / POPd     → Push and pop directories on a stack for quick toggling.

/* ───────────────────────────────  📄  BASIC FILE OPERATIONS  ─────────────────────────────── */
// TOUCH ⟨file⟩           → Create empty file or update its timestamp.
// CP  ⟨src⟩ ⟨dst⟩        → Copy files / directories (add -r for recursive).
// MV  ⟨src⟩ ⟨dst⟩        → Move / rename files or directories.
// RM  ⟨file⟩             → Delete file; add -r to remove directories recursively.
// MKDIR ⟨dir⟩            → Create directory; -p makes parent dirs as needed.
// RMDIR ⟨dir⟩            → Remove **empty** directory only.
// LN  ⟨target⟩ ⟨link⟩    → Create hard link; add -s for symbolic link.
// RSYNC -av ⟨src⟩ ⟨dst⟩  → Fast incremental copy / sync (a = archive, v = verbose).

/* ──────────────────────────────  🔐  PERMISSIONS & OWNERSHIP  ────────────────────────────── */
// CHMOD MODE ⟨file⟩      → Change permissions (e.g. `CHMOD 755 script.sh`).
// CHOWN ⟨user⟩[:group] ⟨file⟩ → Change file owner (and optionally group).
// CHGRP ⟨group⟩ ⟨file⟩   → Change group ownership.
// UMASK ⟨mask⟩           → Set default permission mask for new files (e.g. 022).

/* ────────────────────────────  📝  TEXT VIEWING & PROCESSING  ───────────────────────────── */
// CAT / TAC              → Concatenate or reverse-concatenate files to stdout.
// HEAD / TAIL -n ⟨N⟩ ⟨file⟩  → Show first / last N lines (default 10).
// LESS ⟨file⟩            → Scrollable pager; q to quit, /pattern to search.
// GREP "pat" ⟨file⟩      → Search for pattern in file(s); -r for recursive, -i ignore case.
// SED 's/A/B/g' ⟨file⟩   → Stream editor—replace A with B globally.
// AWK '{print $1}'       → Field/column processing; default separator is whitespace.
// SORT | UNIQUE | CUT    → Ordering, deduplication, and column extraction of data.
// WC -l / -w / -c ⟨file⟩ → Count lines / words / bytes.
// DIFF ⟨file1⟩ ⟨file2⟩   → Show differences; `PATCH < diff` applies them.

/* ─────────────────────────────  🔍  SEARCHING & FINDING FILES  ───────────────────────────── */
// FIND ⟨path⟩ -name "*.log"      → Recursive search by name.
// LOCATE ⟨name⟩                 → Instant lookup using prebuilt DB (updatedb).
// WHICH / WHEREIS / TYPE ⟨cmd⟩  → Discover full path or shell builtin status.
// XARGS ⟨cmd⟩                   → Build & execute command lines from stdin (e.g. cleanup).

/* ───────────────────────────  📦  ARCHIVING & COMPRESSION  ──────────────────────────────── */
// TAR -cf archive.tar ⟨files⟩    → Create tarball; -xvf to extract (-z to gzip, -J to xz).
// GZIP / GUNZIP ⟨file⟩          → Compress / decompress .gz files.
// ZIP -r archive.zip ⟨dir⟩      → Zip directory; UNZIP archive.zip to extract.

/* ────────────────────────  ⚙️  PROCESS & JOB (TASK) MANAGEMENT  ─────────────────────────── */
// PS AUX                     → Snapshot of all processes with user/CPU/mem info.
// TOP / HTOP                 → Interactive, real-time process viewer (htop = nicer UI).
// JOBS, FG, BG               → View background jobs; bring to ForeGround / BackGround.
// KILL -SIG ⟨pid⟩ / KILLALL ⟨name⟩ / PKILL -f ⟨pattern⟩ → Terminate processes.
// NICE -n 10 ⟨cmd⟩           → Start command with lower priority (+nice = lower priority).
// RENICE ⟨prio⟩ -p ⟨pid⟩       → Change priority of running process.
// NOHUP ⟨cmd⟩ &              → Run immune to hangups and log out.

/* ───────────────────────────────  📦  PACKAGE MANAGEMENT  ───────────────────────────────── */
// APT UPDATE / UPGRADE            → Refresh & upgrade on Debian/Ubuntu.
// APT INSTALL ⟨pkg⟩ / REMOVE ⟨pkg⟩ → Install or remove packages.
// YUM / DNF INSTALL ⟨pkg⟩         → Red Hat / Fedora family installer.
// PACMAN -S ⟨pkg⟩                 → Arch Linux package manager.
// SNAP INSTALL ⟨pkg⟩ / FLATPAK INSTALL flathub ⟨pkg⟩ → Universal sandboxed apps.

/* ──────────────────────────────  🌐  NETWORKING & INTERNET  ─────────────────────────────── */
// PING ⟨host⟩                 → ICMP echo request; Ctrl-C to stop.
// TRACEROUTE ⟨host⟩           → Route hops diagnostic (install: `APT install traceroute`).
// CURL / WGET URL            → Transfer data (HTTP, FTP, etc.). Add -O to save filename.
// SSH user@host              → Secure remote shell; use -i key.pem for key auth.
// SCP src user@host:dest     → Secure copy; -r for folders.
// SFTP user@host             → Interactive file transfer session.
// IP ADDR / IP LINK / IP ROUTE → Modern network interface commands (replaces ifconfig).
// NETSTAT -tulpn / SS -tulpn → List sockets listening on TCP/UDP ports.
// DIG ⟨domain⟩               → DNS lookup; +short for concise.

/* ──────────────────────────────  ℹ️  SYSTEM INFORMATION  ───────────────────────────────── */
// UNAME -a                    → Kernel name, version, architecture.
// HOSTNAME                    → System’s network name.
// UPTIME                      → Time since last boot + load averages.
// WHOAMI / ID                 → Current username and UID/GID details.
// DATE, CAL                   → Show current date/time and calendar.
// DF -h                       → Disk space usage (human-readable).
// DU -sh *                    → Size of each item in current dir.
// FREE -h                     → Memory usage summary.
// LSCPU, LSBLK, LSPCI, LSUSB  → CPU, block devices, PCI, USB hardware listings.
// DMESG | LESS                → Kernel ring buffer logs for boot/hardware diagnostics.

/* ───────────────────────────────  💾  DISK & FILESYSTEM  ───────────────────────────────── */
// MOUNT ⟨dev⟩ ⟨mnt⟩           → Attach filesystem to tree; UMOUNT ⟨mnt⟩ to detach.
// FDISK / CFDISK / PARTED     → Partition table editors.
// MKFS.EXT4 ⟨dev⟩            → Create ext4 filesystem (analogous MKFS.XFS, MKFS.VFAT, …).
// FSCK ⟨dev⟩                 → Check & repair filesystem errors.
// TUNE2FS -l ⟨dev⟩           → View / change ext2/3/4 superblock settings.

/* ────────────────────────────────  👥  USERS & GROUPS  ──────────────────────────────────── */
// USERADD ⟨user⟩             → Create new user (add -m for home dir).
// USERMOD -aG ⟨group⟩ ⟨user⟩ → Append user to extra group.
// USERDEL -r ⟨user⟩          → Delete user & optionally their home (-r).
// PASSWD ⟨user⟩              → Change user password.
// GROUPADD / GROUPDEL        → Create / delete groups.
// SU - ⟨user⟩ / SUDO ⟨cmd⟩   → Switch user / run command as root or privileged user.
// WHO, W, LAST               → See logged-in users and historic logins.

/* ────────────────────────────  🖥️  SYSTEM SERVICES & LOGS  ─────────────────────────────── */
// SYSTEMCTL [start|stop|status|enable] ⟨service⟩ → Control systemd services.
// JOURNALCTL -u ⟨service⟩ --since "1h ago"      → View logs for a service.
// SERVICE ⟨name⟩ status                         → SysV init compatibility wrapper.
// CHKCONFIG ⟨name⟩ on/off                       → Enable/disable legacy services.

/* ────────────────────────────  🛠️  JOB SCHEDULING & TASKS  ─────────────────────────────── */
// CRONTAB -e                 → Edit user cron table; format = "min hr dom mon dow cmd".
// AT 09:00                   → Schedule one-shot job; CTRL-D to save.
// WATCH -n 2 ⟨cmd⟩          → Run & refresh command every n seconds (e.g. monitor log).

/* ──────────────────────────────────  🐚  SHELL & MISC  ─────────────────────────────────── */
// BASH                       → GNU Bourne Again SHell (interactive and scripting).
// ECHO "Hello"               → Print to stdout; good for quick tests.
// READ var                   → Prompt and store user input into variable.
// ALIAS ll='ls -la'          → Create shortcut commands; UNALIAS ll to remove.
// HISTORY | GREP ⟨cmd⟩      → Search command history; !123 re-executes entry 123.
// MAN ⟨cmd⟩ / ⟨cmd⟩ --help  → Read manual page or inline help.
// CLEAR                      → Clear terminal screen.
// SLEEP ⟨sec⟩               → Pause execution (useful in scripts).

/**********************************************************************************************
*  HOW TO USE THESE NOTES                                                                     *
*  • Copy this file anywhere (.js, .txt).                                                     *
*  • Use Ctrl+F to jump to a topic or command.                                               *
*  • Practice by typing commands in a terminal—add flags like -h or --help to learn deeper.  *
*  • Combine pipes (|) and redirects (>, >>) to build powerful one-liners!                   *
**********************************************************************************************/












//////////////////////////////////////////////////////////////////////////////////////////////

/**********************************************************************************************
*                            L I N U X   M A S T E R   N O T E S                              *
*                            ── Complete Road-Map, One Screen ──                              *
*        Copy-paste into any editor (Markdown / VS Code).  All lines are JavaScript comments. *
**********************************************************************************************/

/*──────────────────────────  MODULE 1 — INTRO & GETTING STARTED  ────────────────────────────*/
/**
 * WHAT IS LINUX?
 * - Open-source, Unix-like OS kernel created by Linus Torvalds (1991); GNU utilities + Linux kernel = “GNU/Linux”.
 *
 * HISTORY: 1970s Unix  →  1980s BSD / Minix  →  1991 Linux kernel  →  1993 Debian, Red Hat  →  Today’s ecosystem.
 *
 * THE “BIG THREE” FAMILIES
 *   • Debian-based  : Debian, Ubuntu, Linux Mint (APT packaging, .deb).
 *   • Red Hat-based : RHEL, Fedora, CentOS, Alma/Rocky (DNF/YUM, .rpm, SELinux enabled).
 *   • Arch-based    : Arch Linux, Manjaro (rolling release, Pacman).
 *
 * INSTALLING LINUX
 *   1. Flash ISO → USB using balena Etcher / Rufus.
 *   2. Boot → “Live USB” mode: tests hardware w/out installing.
 *   3. Choose *Dual-boot* (side-by-side with Windows/macOS) or *VM* (VirtualBox, VMware, KVM) for isolation.
 *
 * FILESYSTEM HIERARCHY (FHS)
 *   /         = root of everything
 *   /home     = per-user data & configs
 *   /etc      = system-wide configuration
 *   /var      = variable files (logs, spool, caches)
 *   /usr      = user-space programs & libs
 *   /opt      = optional 3rd-party apps
 *
 * BASIC SHELL COMMANDS
 *   Navigation  :  PWD → show dir,  LS → list,  CD dir / CD .. / CD -  → move around
 *   File ops    :  CAT (view), CP (copy), MV (move/rename), RM (remove), MKDIR, RMDIR
 */

/*───────────────────────────  MODULE 2 — FILES & PERMISSIONS  ──────────────────────────────*/
/**
 * OWNERSHIP & PERMISSIONS
 *   Linux enforces *user*:*group* ownership; `LS -l` shows rwx bits.
 *   - CHMOD  u+rx,g-w  file    → change mode.
 *   - CHOWN  alice:dev file    → change owner/group.
 *   - CHGRP  dev  file         → change group only.
 *
 * LINKS
 *   Hard Link : directly points to inode (LN target link).
 *   Soft Link : pathname alias, may span filesystems (LN -s target link).
 *
 * COMPRESSION & ARCHIVING
 *   TAR czf backup.tar.gz dir/   → create gzip tarball.
 *   TAR xvf archive.tar          → extract.
 *   GZIP, BZIP2, ZIP, UNZIP      → (de)compress individual files.
 *
 * DISK USAGE
 *   DF -h         → free space per filesystem.
 *   DU -sh *      → size of each item in cwd.
 *   NCDU          → ncurses disk-usage browser.
 */

/*───────────────────────────  MODULE 3 — TEXT PROCESSING & FILTERS  ────────────────────────*/
/**
 * VIEWING
 *   HEAD -n 20  file,  TAIL -f  log.txt,  MORE / LESS (search with /pattern).
 *
 * SEARCHING
 *   GREP -i pattern files*,  EGREP (=GREP -E),  FGREP (=GREP -F literal).
 *
 * STREAM EDITING
 *   SED  's/old/new/g' file   → substitute; add -i for in-place.
 *
 * FIELD PROCESSING
 *   AWK '{print $1,$3}' file   → column select.
 *   CUT -d, -f1-3  file        → field slice.
 *   SORT | UNIQ -c             → sort & count uniques.
 *   TR 'A-Z' 'a-z'             → transform.
 */

/*────────────────────────────  MODULE 4 — USERS & AUTH  ───────────────────────────────────*/
/**
 * USER MGMT FILES
 *   /etc/passwd  : usernames + UID/GID + shell.
 *   /etc/shadow  : hashed passwords (root-only).
 *
 * COMMANDS
 *   USERADD -m bob,  USERMOD -aG sudo bob,  USERDEL -r bob,  PASSWD bob
 *   GROUPADD dev,  GROUPMOD,  GROUPDEL
 *
 * SUDO
 *   /etc/sudoers  managed with VISUDO (syntax check).
 *   Grants per-command or %group privileges; least privilege principle!
 */

/*───────────────────────────  MODULE 5 — PROCESS & JOB CONTROL  ───────────────────────────*/
/**
 * VIEW
 *   PS aux            → snapshot.
 *   TOP / HTOP        → interactive.
 *
 * FORE/BACKGROUND
 *   CMD &     → run in bg,  JOBS  list,  FG %1  bring back,  BG %1 resume.
 *
 * KILL / RENICE
 *   KILL -9 PID,  KILLALL firefox,  PKILL -f pattern
 *   NICE -n 10 cmd,  RENICE 5 -p PID  → adjust priority (-20=highest).
 */

/*──────────────────────────  MODULE 6 — PACKAGE MANAGEMENT  ───────────────────────────────*/
/**
 * DEBIAN/UBUNTU
 *   APT UPDATE && APT UPGRADE
 *   APT INSTALL htop    APT REMOVE pkg
 *   DPKG -i pkg.deb     DPKG -l | grep name
 *
 * RED HAT/FEDORA
 *   DNF/YUM INSTALL docker,  DNF UPDATE,  RPM -qi pkg.rpm
 *
 * ARCH
 *   PACMAN -Syu,  PACMAN -S vim,  PACMAN -Rs pkg
 */

/*───────────────────────────  MODULE 7 — SHELL SCRIPTING  ─────────────────────────────────*/
/**
 * SHEBANG
 *   #!/bin/bash          → interpreter directive, makes file executable (CHMOD +x script.sh).
 *
 * VARIABLES & PARAMS
 *   NAME="Alice";  echo $NAME;  $1 $2 ... for positional args;  "$@" all args quoted.
 *
 * CONTROL STRUCTURES
 *   IF [[ expr  ]]; THEN ... FI
 *   CASE $x IN 1) ... ;; 2) ... ;; *) ;; ESAC
 *   FOR file IN *.log; DO ...; DONE
 *   WHILE read line; DO ...; DONE < file
 *
 * FUNCTIONS / EXIT CODES
 *   function hello() { return 0; }
 *   $? holds exit status of last cmd.
 *
 * ERROR HANDLING
 *   set -euo pipefail   # safest flags.
 *   Use traps:  trap 'echo "ERR"; exit 1' ERR
 */

/*────────────────────────────  MODULE 8 — NETWORKING  ─────────────────────────────────────*/
/**
 * IP CONFIG
 *   IP ADDR SHOW        (or IFCONFIG);  IP LINK SET eth0 up.
 *
 * CONNECTIVITY
 *   PING 8.8.8.8,  TRACEROUTE google.com,  MTR combo.
 *
 * PORT/SOCKET
 *   NETSTAT -tulpn      (view listeners),  SS -lntu faster.
 *
 * SECURE REMOTE
 *   SSH user@host,  SCP file user@host:/path,  SFTP user@host
 */

/*───────────────────────────  MODULE 9 — SYSTEM ADMIN  ────────────────────────────────────*/
/**
 * SYSTEMD
 *   SYSTEMCTL status nginx,  SYSTEMCTL enable --now sshd
 *   JOURNALCTL -u nginx --since "10 min ago"
 *
 * SCHEDULING
 *   CRONTAB -e          (min hr dom mon dow cmd)
 *   AT 14:00            → type commands, Ctrl-D to queue.
 *
 * LOG MGMT
 *   Logs in /var/log; LOGROTATE rotates/compresses per policy.
 *
 * TIME SYNC
 *   NTPD or CHRONYD     (sync system clock).
 *
 * MOUNTING
 *   MOUNT /dev/sdb1 /mnt,  UMOUNT /mnt
 *   /etc/fstab defines auto-mount at boot.
 */

/*──────────────────────────  MODULE 10 — SECURITY & HARDENING  ────────────────────────────*/
/**
 * FIREWALLS
 *   IPTABLES  (low-level rules),  UFW  (simple),  FIREWALLD  (RHEL firewalld-cmd).
 *
 * MANDATORY ACCESS CONTROL
 *   SELINUX getenforce / setenforce,  APPARMOR profiles in /etc/apparmor.d/.
 *
 * SSH HARDENING
 *   Disable root login, change Port, PermitEmptyPasswords no, use key auth.
 *
 * SERVICE/PORТ HARDENING
 *   Run minimal services, bind to localhost when possible, use fail2ban.
 */

/*────────────────────────── MODULE 11 — MONITORING & TUNING  ──────────────────────────────*/
/**
 * RESOURCE MON
 *   VMSTAT, IOSTAT, SAR, DSTAT   → CPU, memory, I/O stats.
 *
 * LOGS & METRICS
 *   JOURNALCTL, LOGROTATE, syslog-NG; integrate with Prometheus/Grafana.
 *
 * KERNEL TUNABLES
 *   SYSCTL net.ipv4.ip_forward=1,  SYSCTL -p reloads /etc/sysctl.conf.
 *
 * KERNEL MODULES
 *   LSMOD list;  MODPROBE br_netfilter load/unload dynamically.
 */

/*─────────────────────────────  MODULE 12 — ADVANCED  ─────────────────────────────────────*/
/**
 * KERNEL COMPILATION
 *   make menuconfig; make -j$(nproc); make modules_install install; update-grub.
 *
 * CONTAINERS
 *   DOCKER run nginx,  PODMAN rootless alternative.
 *
 * VIRTUALIZATION
 *   KVM/QEMU virt-manager,  VIRTUALBOX cross-platform.
 *
 * CI/CD
 *   JENKINS pipelines (agent on Linux),  GITLAB RUNNER w/ Docker executor.
 *
 * CLOUD LINUX
 *   AWS EC2 AMI mgmt,  GCP Compute Engine,  use cloud-init scripts.
 */

/*───────────────────────  MODULE 13 — TROUBLESHOOTING & BEST PRACTICES  ───────────────────*/
/**
 * LOG ANALYSIS & DEBUG
 *   Tail -f /var/log/syslog,  JOURNALCTL -xe,  STRACE -p PID
 *
 * RESCUE MODES
 *   Single-user/maintenance mode,  Live USB chroot to repair bootloader.
 *
 * BACKUP & RESTORE
 *   RSYNC -a /home /backup,  TAR incremental,  Timeshift/Snapshot,  DB-specific tools.
 *
 * HIGH AVAILABILITY
 *   Clustering with Corosync/Pacemaker,  Load-balancing via HAProxy,  DRBD replication.
 *
 * GENERAL BEST PRACTICES
 *   - Keep system patched.
 *   - Principle of least privilege.
 *   - Automate with Ansible/Terraform.
 *   - Document changes & monitor continuously.
 */

/**********************************************************************************************
* TIP:  Practice each module before advancing!  Use MAN pages and --help flags for depth.     *
* Happy hacking 🚀                                                                             *
**********************************************************************************************/








