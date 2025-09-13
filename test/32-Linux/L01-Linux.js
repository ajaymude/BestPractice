// ============================================================
// Linux — Creating Files (Quick Notes in JS Comment Style)
// ============================================================
//
// Overview:
// You can create files in Linux via commands, redirection, or editors.
// Below are the primary methods with usage, behavior, and tips.
//
// ------------------------------------------------------------
// 1) touch  — create an empty file or update timestamps
// ------------------------------------------------------------
// Creates the file if it doesn't exist; if it exists, updates atime/mtime.
//
// Usage:
//   touch myfile.txt
//
// Notes:
// - Ideal for creating many empty files quickly: touch a b c
// - Won’t add content; just creates/updates the file.
//
// ------------------------------------------------------------
// 2) echo  — write a line of text (creates if missing)
// ------------------------------------------------------------
// Overwrite:
//   echo "Hello Linux" > file.txt
//
// Append (no overwrite):
//   echo "More text" >> file.txt
//
// Notes:
// - Simple for one-liners.
// - Use quotes to preserve spaces/special chars.
//
// ------------------------------------------------------------
// 3) cat (with redirection) — interactive content entry
// ------------------------------------------------------------
// Overwrite and type content, then Ctrl+D to save:
//   cat > file.txt
//   (type your lines...)
//   Ctrl+D
//
// Append existing file (type more, Ctrl+D to finish):
//   cat >> file.txt
//
// Notes:
// - Fast for quick multi-line notes without opening an editor.
//
// ------------------------------------------------------------
// 4) Editors (nano / vi / vim) — full editing experience
// ------------------------------------------------------------
// Open (creates if missing):
//   nano myfile.txt
//   vi myfile.txt
//   vim myfile.txt
//
// Tips:
// - nano: Ctrl+O (write out), Enter, Ctrl+X (exit).
// - vi/vim: press i to insert, Esc to stop inserting,
//           :w to save, :q to quit, :wq to save & quit.
//
// ------------------------------------------------------------
// 5) Redirection only  — create an empty file instantly
// ------------------------------------------------------------
// Truncate/create empty file:
//   > emptyfile.txt
//
// Notes:
// - Fastest way to produce a zero-byte file.
// - Overwrites content if the file exists.
//
// ------------------------------------------------------------
// 6) printf — like echo, but better formatting control
// ------------------------------------------------------------
// Overwrite:
//   printf "Linux Rocks!\n" > file.txt
//
// Append:
//   printf "Another line\n" >> file.txt
//
// Notes:
// - No automatic trailing newline unless you add \n.
// - Prefer over echo for portability/formatting.
//
// ------------------------------------------------------------
// 7) install — create with specific ownership/mode/dirs
// ------------------------------------------------------------
// Create an empty file with default perms via /dev/null:
//   install /dev/null myfile.txt
//
// Create with explicit mode (e.g., 640):
//   install -m 640 /dev/null secure.txt
//
// Notes:
// - Great for scripts where permissions matter.
// - Can also create directories: install -d -m 755 path/to/dir
//
// ------------------------------------------------------------
// 8) cp from /dev/null — another way to make an empty file
// ------------------------------------------------------------
// Zero-byte file:
//   cp /dev/null myfile.txt
//
// Notes:
// - Similar result to `> file`, useful in some scripting styles.
//
// ------------------------------------------------------------
// Summary (What creates empty vs writes content?)
// ------------------------------------------------------------
// Method          | Empty? | Write Text? | Overwrite? | Append?
// ----------------|--------|-------------|------------|--------
// touch           |  yes   |     no      |     n/a    |  n/a
// echo >          |  yes   |    yes      |    yes     |  no
// echo >>         |   no   |    yes      |     no     |  yes
// cat >           |  yes   |    yes*     |    yes     |  no
// cat >>          |   no   |    yes*     |     no     |  yes
// editors         |  yes   |    yes      |   choose   | choose
// > file          |  yes   |     no      |    yes     |  n/a
// printf > / >>   | yes/no |    yes      | >: yes     | >>: yes
// install         |  yes   |     no      |     n/a    |  n/a
// cp /dev/null    |  yes   |     no      |    yes     |  n/a
// (* via interactive typing)
//
// ------------------------------------------------------------
// Quick Cheat Sheet
// ------------------------------------------------------------
// Empty file (zero bytes):
//   touch f.txt
//   > f.txt
//   cp /dev/null f.txt
//   install /dev/null f.txt
//
// One-liner content:
//   echo "hello" > f.txt
//   printf "line 1\nline 2\n" > f.txt
//
// Append content:
//   echo "more" >> f.txt
//   printf "another\n" >> f.txt
//
// Interactive multi-line:
//   cat > notes.txt   (type, Ctrl+D)
//   nano notes.txt    (save & exit)
//   vim notes.txt     (:wq)
//
// ------------------------------------------------------------
// Tips & Gotchas
// ------------------------------------------------------------
// - Use >> (append) when you don’t want to lose existing content.
// - Use > (overwrite) carefully; it truncates files.
// - Prefer printf over echo for consistent formatting and escapes.
// - For precise permissions in scripts, prefer `install -m MODE`.
// - Remember editors need save/quit commands (nano/vim differences).





//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// ============================================================
// Linux Directory Structure — Notes (JS Comment Style)
// ============================================================
//
// Big idea: Linux has a single tree that starts at / (root). Everything
// (devices, filesystems, processes) is mounted somewhere under /.
//
// Quick map (top-level):
// /            — root of the filesystem tree
// /bin         — essential user binaries (now often symlink to /usr/bin)
// /sbin        — essential system binaries (often symlink to /usr/sbin)
// /usr         — userland apps & read-only data (most software lives here)
// /usr/local   — locally installed software (not managed by distro pkg mgr)
// /lib, /lib64 — essential shared libraries for /bin and /sbin
// /etc         — host-specific system configuration
// /var         — variable data (logs, caches, spool, dbs that change)
// /home        — users’ home directories (/home/alice, /home/bob)
// /root        — home for the superuser root
// /tmp         — temporary files (world-writable; usually cleared on reboot)
// /var/tmp     — temporary files preserved across reboots (usually)
// /opt         — optional third-party packages (e.g., /opt/google/chrome)
// /srv         — service data for system-provided services (e.g., /srv/www)
// /dev         — device files (disks, ttys, random, null, etc.)
// /proc        — procfs: runtime kernel & process info (virtual, in-memory)
// /sys         — sysfs: devices, drivers, kernel tunables (virtual)
// /run         — volatile runtime state (PID files, sockets; replaces /var/run)
// /boot        — kernel, initramfs, bootloader files (e.g., GRUB)
// /media       — mount points for removable media (USB, CD/DVD)
// /mnt         — generic mount point for temporary mounts
// /lost+found  — fsck recovery area (per-filesystem; on ext* filesystems)
//
// ------------------------------------------------------------
// Visual sketch (partial):
// ------------------------------------------------------------
// /
// ├── bin -> /usr/bin
// ├── sbin -> /usr/sbin
// ├── lib  (and/or lib64)
// ├── usr/
// │   ├── bin/        (most executables)
// │   ├── sbin/       (admin executables)
// │   ├── lib*/       (libraries for usr binaries)
// │   ├── share/      (arch-independent data: man pages, icons)
// │   └── local/      (your locally built/installed stuff)
// ├── etc/            (configs: ssh/, sysctl.conf, fstab, hosts, passwd)
// ├── var/
// │   ├── log/        (system/app logs)
// │   ├── lib/        (state for services: databases, pkg state)
// │   ├── spool/      (mail, print queues)
// │   ├── cache/      (apt cache, app caches)
// │   └── tmp/        (temp; kept across reboots)
// ├── home/
// ├── root/           (root user’s home)
// ├── dev/            (sda, nvme*, tty*, null, zero, random, urandom)
// ├── proc/           (cpuinfo, meminfo, pid/… subtrees)
// ├── sys/            (devices/, class/, fs/, kernel/)
// ├── run/            (systemd, app sockets, PID files)
// ├── boot/           (vmlinuz-*, initrd.img-*, grub/)
// ├── media/          (auto mounts like /media/$USER/USBSTICK)
// └── mnt/            (manual mounts)
//
// ------------------------------------------------------------
// Directory-by-directory quick refs & examples
// ------------------------------------------------------------
//
// /etc (configs):
//   /etc/ssh/sshd_config   // SSH server settings
//   /etc/fstab             // filesystems to mount at boot
//   /etc/hosts, /etc/hostname
//   /etc/systemd/system/*.service  // custom systemd units (overrides)
// Best practice: backup /etc before major changes.
//
// /usr vs /usr/local:
//   /usr           → OS/distro-managed software (packages)
//   /usr/local     → local installs you manage (e.g., built from source)
// Rule: don’t put your own binaries in /usr/bin; use /usr/local/bin.
//
// /var (changes frequently):
//   /var/log/             // syslog, auth.log, nginx/, journal (if on disk)
//   /var/lib/             // app state (e.g., databases, containers)
//   /var/cache/           // package caches (apt, dnf)
//   /var/spool/           // queued jobs (print, mail)
//   /var/tmp/             // long-lived temp files
//
// /tmp vs /var/tmp:
//   /tmp      → world-writable, may be tmpfs, typically wiped on reboot
//   /var/tmp  → persists across reboots (use for longer-lived temp files)
// Check sticky bit on /tmp: `ls -ld /tmp` → drwxrwxrwt (the trailing 't').
//
// /dev (devices & special files):
//   /dev/sda, /dev/nvme0n1p1  // disks/partitions
//   /dev/tty*, /dev/pts/*     // terminals/pts
//   /dev/null                 // write-to-discard
//   /dev/zero                 // infinite zeros
//   /dev/random, /dev/urandom // entropy sources
//
// /proc (virtual runtime info):
//   /proc/cpuinfo, /proc/meminfo, /proc/uptime
//   /proc/<PID>/cmdline, environ, fd/  // per-process info
//   Mounts view: /proc/mounts
//
// /sys (kernel/device model):
//   /sys/class/net/eth0/      // network device attrs
//   /sys/block/sda/           // block device info
//
// /run (volatile runtime):
//   /run/systemd/, /run/user/1000/, /run/nginx.pid
//   Replaced older /var/run and /var/lock symlinks on many distros.
//
// /boot:
//   vmlinuz-<ver>     // compressed kernel
//   initrd/initramfs  // early userspace image
//   grub/             // bootloader config, modules
//
// /opt & /srv:
//   /opt/vendor/app/…              // vendor/third-party packages
//   /srv/www, /srv/ftp, /srv/git   // service data roots (if you use them)
//
// /lost+found:
//   Created by ext* filesystems; fsck puts orphaned files here. Don’t delete.
//
// ------------------------------------------------------------
// Modern “usr-merge” note
// ------------------------------------------------------------
// Many distros (Ubuntu, Debian, Fedora) unify paths so /bin→/usr/bin,
// /sbin→/usr/sbin, /lib*→/usr/lib*. You may see symlinks at top level.
// Practical effect: most binaries actually live in /usr/*.
//
// ------------------------------------------------------------
// What goes where? (rules of thumb)
// ------------------------------------------------------------
// • Your custom binaries/scripts       → /usr/local/bin (system-wide) or ~/bin
// • Third-party large apps             → /opt/<vendor>/<app>
// • Service data (served to clients)   → /srv/<service> (optional convention)
// • Configuration                      → /etc/<app>
// • Logs/state/cache                   → /var/log, /var/lib, /var/cache
// • Temporary files                    → /tmp (short-lived), /var/tmp (longer)
// • User data                          → /home/<user>
//
// ------------------------------------------------------------
// Handy commands to explore
// ------------------------------------------------------------
// ls -l /                     // top-level directories & symlinks
// tree -L 1 /usr              // one-level view (install `tree` first)
// df -Th                      // filesystems, types & usage
// find /etc -maxdepth 1 -type f | sort   // top-level config files
// lsblk -f                    // block devices & mount points
// mount | column -t           // current mounts
// stat /bin /usr/bin          // see if /bin is a symlink
// ls -ld /tmp /var/tmp        // check permissions/sticky bit
//
// ------------------------------------------------------------
// Safety & best practices
// ------------------------------------------------------------
// • Don’t manually modify files under /usr managed by your package manager.
// • Keep /etc, /var, and /home on backups; they hold config, state, and data.
// • Be cautious under /dev, /proc, /sys — they’re virtual; don’t try to “clean” them.
// • Use UUIDs in /etc/fstab to avoid device-name drift.
// • Check permissions on world-writable dirs: /tmp should be drwxrwxrwt.
//
// End — Linux Directory Structure quick reference.
// Want a printable one-pager or an exercise set to locate files & explain their place?
// ============================================================



//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////











// ============================================================
// Vim / Vi — Essential Commands (JS Comment Style Cheat Sheet)
// ============================================================
//
// Core idea:   [count] [operator] [motion]
// Example:     3dw  → delete (d) 3 words (w)
// Repeat last change: .
// Undo/Redo:   u / Ctrl+R
//
// ------------------------------------------------------------
// MODES
// ------------------------------------------------------------
// Normal mode        : <Esc> (default on open)
// Insert mode        : i (before), I (start of line), a (after), A (end)
//                      o (new line below), O (new line above)
// Replace mode       : R (overwrite characters)
// Visual mode        : v (char-wise), V (line-wise), Ctrl+v (block/column)
// Command-line mode  : :  (then type ex commands)
// Search mode        : /pattern  or  ?pattern
//
// ------------------------------------------------------------
// FILE: SAVE / QUIT
// ------------------------------------------------------------
// :w           → write (save) current file
// :wa          → write all
// :q           → quit (fails if unsaved changes)
// :q!          → quit without saving
// :wq / :x     → write & quit
// ZZ           → write & quit (like :x)
// ZQ           → quit without saving (like :q!)
//
// ------------------------------------------------------------
// CURSOR MOVEMENT (BASICS)
// ------------------------------------------------------------
// h j k l      → left, down, up, right
// 0            → start of line
// ^            → first non-blank
// $            → end of line
// gg           → top of file
// G            → bottom of file
// {  }         → previous/next paragraph/block
// H M L        → top/middle/bottom of screen
// Ctrl+u/d     → half-page up/down
// Ctrl+b/f     → page up/down
// %            → jump to matching (), {}, []
//
// ------------------------------------------------------------
// WORD / FIND MOTIONS
// ------------------------------------------------------------
// w / W        → next word (W = WORD, space-delimited)
// b / B        → previous word
// e / E        → end of word
// ge / gE      → end of previous word
// f{char}      → to next {char} on the line
// F{char}      → to previous {char}
// t{char}      → till before next {char}
// T{char}      → till after previous {char}
// ; / ,        → repeat last f/t forward / backward
//
// ------------------------------------------------------------
// EDITING (OPERATORS + EXTRAS)
// ------------------------------------------------------------
// d{motion}    → delete (cut).  e.g., dw, d$, d0, dd (delete line)
// c{motion}    → change = delete then insert.  e.g., cw, c$, cc (change line)
// y{motion}    → yank (copy).  e.g., yw, y$, yy (yank line)
// p / P        → paste after / before cursor
// r{char}      → replace a single char
// ~            → toggle case of character
// J            → join line below to current line
// gu{motion}   → lowercase (e.g., guw)
// gU{motion}   → uppercase (e.g., gUw)
// g~{motion}   → swap case
// x / X        → delete char under / before cursor
// >> / <<      → indent / unindent line (use in Visual mode for ranges)
// =            → auto-indent (e.g., =ap to format a paragraph)
// gq{motion}   → reflow text (wrap to 'textwidth')
// .            → repeat last change
//
// ------------------------------------------------------------
// POWER MOVES WITH TEXT OBJECTS (INSIDE/AROUND)
// ------------------------------------------------------------
// i{ } (inside) / a{ } (around) work with: w, s, p, ', ", `, ), ], }, t
// Examples:
// ciw          → change inside word
// di" / da"    → delete inside/around quotes
// yi)          → yank inside parentheses
// ca{          → change around {…}
//
// ------------------------------------------------------------
// SEARCH / REPLACE
// ------------------------------------------------------------
// /pattern     → search forward
// ?pattern     → search backward
// n / N        → next / previous match
// * / #        → search word under cursor forward/backward
// :noh         → clear highlight
// Substitution (with flags g=global, c=confirm, i=ignorecase):
// :s/old/new/       → replace first match on the line
// :s/old/new/g      → replace all on the line
// :%s/old/new/g     → replace in whole file
// :%s/old/new/gc    → confirm each replace
//
// ------------------------------------------------------------
// MULTI-LINE / MULTI-CURSOR–ISH TRICKS (VISUAL BLOCK)
// ------------------------------------------------------------
// Ctrl+v       → enter Visual Block mode
// I            → insert at start of block (then <Esc> to apply to all lines)
// A            → append at end of block (then <Esc>)
// c / d        → change/delete block selection across columns
//
// ------------------------------------------------------------
// BUFFERS / TABS / WINDOWS (SPLITS)
// ------------------------------------------------------------
// Buffers (open files):
// :e {file}    → edit file
// :ls / :buffers  → list buffers
// :b {num|name}   → switch buffer
// :bn / :bp    → next / previous buffer
// :bd          → delete (close) buffer
//
// Tabs:
// :tabnew {file}   → new tab
// gt / gT          → next / previous tab
// :tabc            → close tab
//
// Splits (windows):
// :sp / :vsp   → horizontal / vertical split
// Ctrl+w h/j/k/l → move between splits
// Ctrl+w =     → equalize sizes
// Ctrl+w q     → close split
// :only        → keep current split only
//
// ------------------------------------------------------------
// MARKS / JUMPS / REGISTERS
// ------------------------------------------------------------
// Marks:
// m{a-z}       → set mark (local to file), e.g., ma
// '{a-z}       → jump to line of mark (e.g., 'a)
// `{a-z}       → jump to exact position of mark
// '' / ``      → jump back to previous location
//
// Jumps:
// Ctrl+o / Ctrl+i → older / newer cursor positions (jump list)
//
// Registers (clipboards):
// "{reg}{op}   → use register with op (y, d, p...)
// Example: "ayy  (yank line to register a),  "ap (paste it)
// System clipboard (if available): "+y, "+p   (or "*y, "*p)
//
// ------------------------------------------------------------
// MACROS (RECORD & PLAYBACK)
// ------------------------------------------------------------
// q{reg}       → start recording into register (e.g., qa)
// (do your edits/motions)
// q            → stop recording
// @{reg}       → play macro once (e.g., @a)
// @@           → replay last-used macro
// {count}@a    → play macro N times
//
// ------------------------------------------------------------
// INDENT / FORMATTING QUICKIES
// ------------------------------------------------------------
// ==           → reindent current line
// =%           → reindent a block enclosed by brackets
// =i{          → reindent inside {…}
// gqap         → reflow a paragraph
//
// ------------------------------------------------------------
// FILE / DIRECTORY TRICKS
// ------------------------------------------------------------
// :r {file}    → read file into current buffer (insert below cursor)
// :r !{cmd}    → read the output of a shell command
// :w {file}    → write current buffer to new file
// :Explore     → open file explorer (netrw)
// gf           → go to file under cursor (if path-like text)
//
// ------------------------------------------------------------
// SETTINGS YOU’LL USE A LOT
// ------------------------------------------------------------
// :set number            → show line numbers
// :set relativenumber    → relative line numbers
// :set hlsearch          → highlight search
// :set incsearch         → incremental search as you type
// :set ignorecase smartcase → case-insensitive unless pattern has caps
// :set tabstop=4 shiftwidth=4 expandtab → spaces for tabs, 4-width
// :set clipboard=unnamedplus → use system clipboard (if compiled)
// :set wrap / nowrap     → toggle soft-wrapping long lines
// :syntax on             → syntax highlighting
// :set mouse=a           → enable mouse support
//
// ------------------------------------------------------------
// QUICK FIXES & MISC
// ------------------------------------------------------------
// gi           → go to last insert position and enter Insert mode
// gv           → reselect last visual selection
// xp           → swap two characters (delete char to register + paste)
// ci" / ci'    → change inside quotes
// dap / dip    → delete around/inside paragraph
// :help {topic} → open help (e.g., :help motion, :help text-objects)
// K            → open man/help for word under cursor (in many setups)
//
// ------------------------------------------------------------
// MINI PRACTICE DRILLS
// ------------------------------------------------------------
// 1) Change a word:          ciw  (type new word)  <Esc>
// 2) Wrap word in quotes:    viw  then s"  (or use surround plugin if available)
// 3) Duplicate a line:       yyp
// 4) Move 5 lines down:      5j
// 5) Delete to end of line:  D   (same as d$)
// 6) Replace next 10 lines' start with "// ":  Ctrl+v (select 10 lines), I// <Esc>
// 7) Global replace w/ confirm:  :%s/old/new/gc
//
// End of cheat sheet. Happy vim-ing! 🚀

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// ============================================================
// 2) Getting Started with Linux — Notes (JS Comment Style)
// ============================================================
//
// A. Accessing Linux
// ------------------------------------------------------------
// • Local (on your machine):
//   - Desktop terminal: open from app menu OR shortcut (Ubuntu: Ctrl+Alt+T).
//   - TTY consoles: Ctrl+Alt+F3..F6 (return with Ctrl+Alt+F1/F7 depending on distro).
// • Remote (another machine/server): use SSH (see Section C).
// • Files app + terminal combo: useful for beginners to navigate + run commands.
//
//
// B. Installing Linux (4 common ways)
// ------------------------------------------------------------
// 1) Virtual Machine (VM) — safest for practice
//    Tools: VirtualBox / VMware Workstation / UTM (Mac ARM).
//    Steps:
//      1. Download an ISO (e.g., Ubuntu LTS).
//      2. Create VM → assign CPU/RAM (≥2 cores, 4–8 GB RAM if possible).
//      3. Attach ISO as optical drive, create virtual disk (e.g., 30–60 GB).
//      4. Boot VM → run installer → create user, timezone, etc.
//      5. (Optional) Install Guest Additions/Tools for clipboard, shared folders.
//    Networking tips:
//      - NAT (default) is simplest; Bridged lets VM get LAN IP for SSH from host.
//
// 2) Dual Boot (Linux + Windows on same machine)
//    PREP: Backup important data; ensure UEFI/BIOS access.
//    Steps:
//      1. In Windows: shrink partition (Disk Management) to free space for Linux.
//      2. Create bootable USB (Rufus/BalenaEtcher) from Linux ISO.
//      3. Disable Fast Startup (and BitLocker or suspend) to avoid boot issues.
//      4. Boot from USB → choose “Install alongside Windows” (guided).
//         (Manual scheme: EFI ~512MB (if missing), / (ext4), optional swap).
//      5. Finish install → reboot → GRUB menu lets you pick OS.
//    Notes: Keep both systems in UEFI mode; Secure Boot can stay ON for most distros.
//
// 3) WSL (Windows Subsystem for Linux) — dev-friendly, no reboot
//    Requirements: Windows 10 (2004+) or Windows 11.
//    Quick install (PowerShell as Admin):
//      - wsl --install -d Ubuntu
//      - After reboot: create Linux username/password.
//      - Check version: wsl -l -v   |   Set default to WSL2: wsl --set-default-version 2
//      - Update kernel if prompted: wsl --update
//    Notes: Great for CLI and dev tooling; not a full Linux kernel on Win10 WSL1.
//           WSL2 uses a lightweight VM with real Linux kernel.
//
// 4) Cloud (VPS/Instance) — learn real server ops
//    Providers: AWS (EC2), GCP (Compute Engine), Azure (VM), DigitalOcean, Linode.
//    Typical flow (AWS EC2 example):
//      1. Launch instance with Ubuntu LTS AMI.
//      2. Create/download an SSH key-pair (.pem).
//      3. Open port 22 (SSH) in Security Group.
//      4. Connect: ssh -i path/to/key.pem ubuntu@PUBLIC_IP
//      5. Post-install: sudo apt update && sudo apt upgrade -y
//         Create a non-root admin: sudo adduser dev && sudo usermod -aG sudo dev
//         (Optional) Firewall: sudo ufw allow OpenSSH && sudo ufw enable
//
//
// C. Remote Connection (SSH)
// ------------------------------------------------------------
// 1) Generate SSH key (on your client machine):
//    - Modern: ssh-keygen -t ed25519 -C "your_label"
//      (Files default to ~/.ssh/id_ed25519 and id_ed25519.pub)
//    - Start agent & add key (Linux/macOS): eval "$(ssh-agent -s)" && ssh-add ~/.ssh/id_ed25519
//
// 2) Put your PUBLIC key on the server:
//    - Linux/macOS: ssh-copy-id user@SERVER_IP
//    - Manual: copy your id_ed25519.pub → server’s ~/.ssh/authorized_keys (chmod 600)
//
// 3) Connect:
//    - ssh user@SERVER_IP
//    - Non-default port: ssh -p 2222 user@SERVER_IP
//    - Using a key explicitly: ssh -i ~/.ssh/id_ed25519 user@SERVER_IP
//
// 4) SSH config (~/.ssh/config) for shortcuts:
//    Host mybox
//      HostName 203.0.113.10
//      User ubuntu
//      IdentityFile ~/.ssh/id_ed25519
//      Port 22
//    // Then just: ssh mybox
//
// 5) Windows (PuTTY) notes:
//    - Convert .pem → .ppk via PuTTYgen if needed.
//    - In PuTTY: Host Name = user@IP, Port = 22, Category → SSH → Auth → browse .ppk.
//
// 6) File transfer quickies:
//    - scp file.txt user@SERVER_IP:/home/user/
//    - scp -r mydir/ user@SERVER_IP:/path/
//    - rsync -av mydir/ user@SERVER_IP:/path/   // efficient syncing
//
//
// D. Basic Navigation Commands
// ------------------------------------------------------------
// 1)   — print working directory
//    - Shows absolute path of your current directory.
//    - Example:
//        $ pwd
//        /home/ajay/projects
//
// 2) ls — list files/directories
//    - Common flags:
//        ls -a    // include hidden files (dotfiles)
//        ls -l    // long format (permissions, owner, size, dates)
//        ls -lh   // human-readable sizes
//        ls -la   // long + hidden
//        ls -ltr  // long, time-sorted, newest last
//        ls -R    // recursive
//    - Examples:
//        ls -lah
//        ls --group-directories-first   // (GNU ls; groups folders first)
//
// 3) cd — change directory
//    - cd /absolute/path
//    - cd relative/path
//    - cd ~            // go to your home
//    - cd ~user        // go to another user’s home (if permitted)
//    - cd ..           // up one directory
//    - cd -            // jump back to previous directory
//    - Tips: paths with spaces → quotes or escaping: cd "My Folder"
//
// Bonus helpers:
//    - tree             // pretty directory tree (sudo apt/yum install tree)
//    - clear            // clear terminal
//    - whoami           // current user
//    - uname -a         // kernel/system info
//    - man <cmd>        // manual page, e.g., man ls   |  <cmd> --help
//
// Pro tips:
//    - Use Tab for auto-completion of paths/files.
//    - Use ↑/↓ to cycle command history; Ctrl+R for reverse-search history.
//    - Combine: pwd && ls -lah  // show where you are and list nicely
//
// End of Section 2.
// Want a practice checklist for each install method or SSH setup? I can add one.
// ============================================================



//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////



// ============================================================
// 3) File & Directory Management — Notes (JS Comment Style)
// ============================================================
//
// A. Create files & folders
// ------------------------------------------------------------
// touch — create empty file (or update timestamps)
///  touch file.txt
///  touch a b c                         // multiple files
///  touch -t 202501011200 file.txt      // set time (YYYYMMDDhhmm)
//
// mkdir — create directories
///  mkdir photos
///  mkdir -p projects/app/src           // create parent dirs if missing
///  mkdir -m 755 bin                    // set permissions at creation
//
// ------------------------------------------------------------
// B. Copy / Move / Rename
// ------------------------------------------------------------
// cp — copy files/directories
///  cp a.txt b.txt                      // copy file
///  cp -i a.txt b.txt                   // prompt before overwrite
///  cp -r dir1 dir2                     // recursive copy of a directory
///  cp -a src dst                       // archive mode: -r + preserve perms/times/links
///  cp --parents src/one/two.txt out/   // keep parent path in destination
//
// mv — move or rename
///  mv oldname.txt newname.txt          // rename
///  mv file.txt /tmp/                   // move to directory
///  mv -i file.txt /tmp/                // prompt before overwrite
///  mv -n file.txt /tmp/                // never overwrite
//
// rsync — safer/faster copy/sync (bonus)
///  rsync -avh src/ dst/                // sync directory (preserve attrs, show progress)
///  rsync -avh --delete src/ dst/       // make dst mirror src (be careful!)
//
// ------------------------------------------------------------
// C. Remove files/folders  (DANGER ZONE)
// ------------------------------------------------------------
// rm — remove files
///  rm file.txt
///  rm -i file.txt                      // confirm before delete
///  rm -v file.txt                      // verbose
//
// rm -r — remove directories recursively
///  rm -r mydir                         // delete directory and contents
///  rm -rf mydir                        // force + recursive (NO prompts) — be careful!
// Tip: use -- to stop option parsing when names start with '-' :
///  rm -- -weirdfilename
//
// rmdir — remove empty directories only
///  rmdir emptydir
///  rmdir -p a/b/c                      // remove chain if each is empty
//
// Safer alternative (optional):
///  trash-put file.txt                  // sends to trash if `trash-cli` installed
//
// ------------------------------------------------------------
// D. View file contents
// ------------------------------------------------------------
// cat — print file contents (concat)
///  cat file.txt
///  cat -n file.txt                     // show line numbers
//
// less — pager for large files (interactive, recommended)
///  less big.log
//   Controls:  ↑/↓ or j/k scroll,  /text search,  n/N next/prev,  g/G top/bottom,  q quit
//
// more — simple pager (older, less features)
///  more file.txt
//
// head / tail — beginning / end of files
///  head -n 20 file.txt                 // first 20 lines
///  tail -n 50 file.txt                 // last 50 lines
///  tail -f /var/log/syslog             // follow appended lines (live logs)
///  tail -F /var/log/app.log            // robust follow across rotations
//
// tac / nl (bonus)
///  tac file.txt                        // reverse of cat (last line first)
///  nl file.txt                         // cat with line numbers
//
// ------------------------------------------------------------
// E. Find files
// ------------------------------------------------------------
// 1) find — slow but precise, scans filesystem each time
// Syntax: find <path> <tests> <actions>
///  find . -type f -name "*.js"                 // all .js files under current dir
///  find /var/log -type f -mtime -1             // modified in last 1 day
///  find . -type f -size +10M                   // files larger than 10 MB
///  find . -maxdepth 2 -type d -name "build"    // depth-limited
///  find . -empty                               // empty files/dirs
// Execute an action on matches:
///  find . -type f -name "*.tmp" -delete        // delete matches (careful!)
///  find . -type f -name "*.log" -exec gzip {} \;         // gzip each file
///  find . -type f -print0 | xargs -0 grep -n "ERROR"     // safe with spaces/newlines
//
// 2) locate — lightning-fast name search (uses a DB)
// First ensure DB is built (may run nightly via cron):
///  sudo updatedb
// Then search:
///  locate nginx.conf
///  locate -i "readme"                          // case-insensitive
///  locate -b "\readme.md"                      // match basename only
//
// ------------------------------------------------------------
// F. Practical combos & tips
// ------------------------------------------------------------
///  cd ~/projects && pwd && ls -lah             // where am I + nice listing
///  mkdir -p logs && touch logs/app.log         // ensure dir then create a file
///  cp -a config/ /backup/config-$(date +%F)/   // dated config backup
///  grep -RIn "TODO" src/                       // find text recursively
///  find . -type f -name "*.sh" -exec chmod +x {} \;  // make all scripts executable
// Quotes/Spaces:
//   Use quotes around paths with spaces:  cp "My File.txt" "My Folder/"
// Tab completion:
//   Press <Tab> to auto-complete paths/names; double-Tab to list options.
//
// End of Section 3.
// Want a practice worksheet with tasks and expected outputs for each command?
// ============================================================

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


// ============================================================
// 4) User & Permission Management — Notes (JS Comment Style)
// ============================================================
//
// A. Users & Groups (core commands)
// ------------------------------------------------------------
// whoami                // prints your current username
// id                    // shows UID, GID, and group memberships
// id <user>             // info for another user
// groups <user>         // list groups a user belongs to
//
// adduser <name>        // (Debian/Ubuntu) interactive, creates home, sets shell
// useradd <name>        // (Low-level) may need flags: -m (home), -s (shell)
//   useradd -m -s /bin/bash <name>
//   passwd <name>       // set password for that user
//
// deluser <name>        // (Debian/Ubuntu) remove user (keeps home by default)
// userdel <name>        // low-level removal
//   userdel -r <name>   // remove user AND home directory
//
// usermod -aG <group> <user>   // add user to extra group(s)
//   usermod -aG sudo ajay      // example: grant sudo (Debian/Ubuntu)
// gpasswd -a <user> <group>     // alternate way to add to a group
// gpasswd -d <user> <group>     // remove from a group
//
// groupadd <group>       // create a new group
// groupdel <group>       // delete a group
//
// getent passwd|group    // display system user/group database entries
//
// su - <user>            // switch user (start login shell)
// sudo <cmd>             // run a single command as root (if permitted)
// sudo -i                // root login shell (with care)
// visudo                 // edit /etc/sudoers safely (syntax-checked)
//
// Quick flows:
//   // Create dev user with home, bash, and sudo:
//   useradd -m -s /bin/bash dev && passwd dev && usermod -aG sudo dev
//   // Add existing user to docker group (no sudo for docker):
//   sudo usermod -aG docker $USER && newgrp docker
//
//
// B. File Ownership & Groups
// ------------------------------------------------------------
// Every file has an owner (user) and a group.
// ls -l shows:  -rw-r--r--  1 owner group  size  date  name
//
// chown <owner> <file>         // change owner
// chown <owner>:<group> <file> // change owner AND group
// chgrp <group> <file>         // change group only
//
// Recursively:
//   chown -R www-data:www-data /var/www
//   chgrp -R developers /opt/project
//
//
// C. Permission Bits (rwx) — how they work
// ------------------------------------------------------------
// There are 3 classes:  User (u), Group (g), Others (o)
// And 3 bits for each:  Read (r=4), Write (w=2), Execute (x=1)
//
// Numeric (octal) mode = sum of bits per class:
//   7 = r+w+x (4+2+1)   6 = r+w (4+2)   5 = r+x (4+1)   4 = r
//
// Common modes:
//   755  → u=rwx, g=rx, o=rx    (executables, directories)
//   644  → u=rw,  g=r,  o=r     (text/config files)
//   700  → u=rwx, g=---, o=---  (private scripts or dirs)
//   600  → u=rw,  g=---, o=---  (private keys, secrets)
//   775  → u=rwx, g=rwx, o=rx   (team-writable dirs)
//   664  → u=rw,  g=rw,  o=r    (team-writable files)
//
// Directory nuance:
//   - Read (r): list names in dir (with additional help from x)
//   - Execute (x): "traverse" dir; needed to cd into it
//   - Write (w): create/delete/rename entries in that dir
//
// Examples:
//   // Give execute to owner (keep others same):
//   chmod u+x script.sh
//   // Remove write from group and others:
//   chmod go-w file.txt
//   // Set exact mode numerically:
//   chmod 644 README.md
//   // Recursively set dir exec bit and file modes (two-phase approach):
//   find app -type d -exec chmod 755 {} \;
//   find app -type f -exec chmod 644 {} \;
//
// Symbolic combos:
//   chmod u=rw,go=r file.txt     // explicit set
//   chmod a+r file.txt           // add read for all
//   chmod -R g+w shared/         // add write for group recursively
//
//
// D. Special Permission Bits (advanced but essential)
// ------------------------------------------------------------
// setuid (4xxx): execute as file owner (on executables)
// setgid (2xxx): execute as file’s group; on directories, new files inherit group
// sticky (1xxx): on directories, only owner of a file can delete/rename it
//
// Numeric prefixes:
//   4755  → setuid + 755
//   2755  → setgid + 755
//   1777  → sticky + 777  (e.g., /tmp)
//
// Symbolic forms:
//   chmod u+s /usr/local/bin/someprog   // setuid
//   chmod g+s /srv/shared               // setgid on directory
//   chmod +t  /var/tmp                  // sticky bit
//
// Check with ls -l:
//   -rwsr-xr-x  (s in user-exec position → setuid)
//   drwxrwsr-x  (s in group-exec position on dir → setgid)
//   drwxrwxrwt  (t in others-exec position → sticky, like /tmp)
//
//
// E. Default Permissions & umask
// ------------------------------------------------------------
// When creating files/dirs, defaults are:
//   Files start from 666, Dirs start from 777, then subtract umask.
//   Example: umask 022 → files: 644, dirs: 755
//
// Show current umask:
//   umask
// Set (shell session):
//   umask 027   // files: 640, dirs: 750
// Persistent (per shell): add `umask 027` to ~/.profile or shell rc.
//
//
// F. Access Control Lists (ACLs) — per-user/per-group fine-grained perms
// ------------------------------------------------------------
// Enable extended permissions beyond basic u/g/o.
// getfacl <path>            // view ACL
// setfacl -m u:alice:rwx <path>     // grant alice rwx
// setfacl -m g:devs:rx <path>       // grant group devs rx
// setfacl -x u:alice <path>         // remove ACL for alice
// setfacl -R -m u:alice:rwX <dir>   // recursive; X sets execute on dirs/executables
//
// Default ACLs on dirs (inherit to new files/dirs):
//   setfacl -d -m u:alice:rwX /srv/shared
//
//
// G. Quick Safety & Best Practices
// ------------------------------------------------------------
// - Prefer least privilege: grant only what’s needed.
// - Use groups for team permissions (avoid per-user chown churn).
// - For shared project dirs: setgid on the directory (chmod g+s project/) so files inherit group.
// - Never `chmod -R 777 /` (or anywhere sensitive) — huge security risk.
// - Keep private keys at 600 (chmod 600 ~/.ssh/id_ed25519).
// - Review with: namei -l <path>   // shows perms along path components.
//
// End of Section 4.
// Want hands-on exercises (create users, set ACLs, verify with ls -l/getfacl)?
// ============================================================


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


// ============================================================
// 5) Package Management — Notes (JS Comment Style)
// ============================================================
//
// Scope: Debian-based (APT) • Red Hat-based (YUM/DNF) • From Source
//
// ------------------------------------------------------------
// A. Debian / Ubuntu / Mint … (APT, dpkg)
// ------------------------------------------------------------
//
// Update package lists (metadata):
//   sudo apt update
//
// Upgrade installed packages:
//   sudo apt upgrade                // safe upgrade
//   sudo apt full-upgrade           // may remove/install to resolve deps
//
// Install / Remove:
//   sudo apt install nginx
//   sudo apt install nginx=1.24.*   // install specific version pattern
//   sudo apt remove nginx           // remove binaries, keep config
//   sudo apt purge nginx            // remove binaries + config files
//   sudo apt autoremove             // remove unused dependencies
//
// Search / Info:
//   apt search redis
//   apt show redis-server
//   apt list --installed            // list all installed
//   apt policy nginx                // show candidate, repo, pinned versions
//
// Repository management (basics):
//   ls /etc/apt/sources.list.d/     // extra repo files
//   cat /etc/apt/sources.list       // main sources
//   sudo add-apt-repository ppa:…   // add a PPA (Ubuntu)
//   // After adding sources, run: sudo apt update
//
// dpkg (low-level):
//   dpkg -i package.deb             // install a local .deb file
//   sudo apt -f install             // fix missing deps after dpkg -i
//   dpkg -L nginx                   // list files installed by package
//   dpkg -S /path/to/file           // which package owns this file
//
// Holds (freeze a package at current version):
//   sudo apt-mark hold nginx
//   sudo apt-mark unhold nginx
//
// Cleanup cache (free disk):
//   sudo apt clean                  // remove downloaded .deb cache
//
// Note: `apt-get` is the older scripting-centric interface; `apt` is friendlier
// for interactive use. Commands map closely (apt-get install/update/upgrade…).
//
//
// ------------------------------------------------------------
// B. RHEL / CentOS / Fedora / Rocky / Alma … (DNF/YUM, rpm)
// ------------------------------------------------------------
//
// Metadata & upgrade:
//   sudo dnf makecache              // populate/update metadata cache
//   sudo dnf check-update           // list available upgrades
//   sudo dnf upgrade                // upgrade packages
//
// Install / Remove:
//   sudo dnf install nginx
//   sudo dnf remove nginx
//   sudo dnf autoremove             // remove unneeded deps
//
// Search / Info:
//   dnf search redis
//   dnf info redis
//   dnf list installed              // list all installed packages
//
// Repos (enable/disable):
//   dnf repolist all
//   sudo dnf config-manager --add-repo <repo_url>
//   sudo dnf config-manager --set-enabled crb    // example (RHEL derivatives)
//   // EPEL on RHEL/Alma/Rocky:
//   sudo dnf install epel-release
//
// Module streams (Fedora/RHEL8+):
//   dnf module list nodejs
//   sudo dnf module enable nodejs:18
//   sudo dnf install nodejs
//
// History (rollback if needed):
//   dnf history
//   sudo dnf history undo <ID>
//
// Clean caches:
//   sudo dnf clean all
//
// rpm (low-level):
//   rpm -ivh pkg.rpm                // install local rpm
//   rpm -Uvh pkg.rpm                // upgrade (install if absent)
//   rpm -e  pkg                     // erase/remove
//   rpm -q  pkg                     // query if installed
//   rpm -ql pkg                     // list files owned by package
//   rpm -qf /path/to/file           // which package owns this file
//
//
// ------------------------------------------------------------
// C. Installing from Source (tarball / make / configure)
// ------------------------------------------------------------
//
// Typical autotools project:
//   # 1) Get and extract source
//   wget https://example.com/foo-1.2.3.tar.gz
//   tar -xzf foo-1.2.3.tar.gz
//   cd foo-1.2.3
//
//   # 2) Install build tools & deps
//   // Debian/Ubuntu:
//   sudo apt install build-essential pkg-config libssl-dev
//   // RHEL/Fedora:
//   sudo dnf groupinstall "Development Tools"
//   sudo dnf install pkgconf-pkg-config openssl-devel
//
//   # 3) Configure build
//   ./configure --prefix=/usr/local   // choose install prefix
//   // (If ./configure missing, project may use CMake or a bootstrap script.)
//
//   # 4) Build & (optionally) test
//   make -j$(nproc)
//   make test                         // if tests provided
//
//   # 5) Install (writes under --prefix)
//   sudo make install
//   sudo ldconfig                     // refresh shared library cache if libs installed
//
// Uninstall (only if supported):
//   sudo make uninstall               // works when project provided uninstall target
//
// CMake-based projects:
//   mkdir build && cd build
//   cmake -DCMAKE_INSTALL_PREFIX=/usr/local ..
//   make -j$(nproc)
//   sudo make install
//
// Tips & good practice:
//   • Prefer your distro’s packages when possible (easier updates/rollback).
//   • Use /usr/local as prefix to keep source-built files separate from system.
//   • Track what you installed: consider `checkinstall` (Debian) to create a .deb
//     from “make install” so it’s manageable via apt/dpkg.
//   • To stage installs without polluting root, use DESTDIR:
//       make DESTDIR=/tmp/pkgroot install
//   • If binaries aren’t found after install, ensure /usr/local/bin is in $PATH.
//
//
// ------------------------------------------------------------
// D. Quick Cheat Sheet (copy-paste friendly)
// ------------------------------------------------------------
// Debian/Ubuntu:
//   sudo apt update && sudo apt upgrade -y
//   sudo apt install <pkg>
//   sudo apt remove <pkg> && sudo apt autoremove -y
//   apt search <term> && apt show <pkg>
//   dpkg -L <pkg>    // files from pkg
//   dpkg -S <file>   // who owns file
//
// RHEL/Fedora/Alma/Rocky:
//   sudo dnf makecache && sudo dnf upgrade -y
//   sudo dnf install <pkg>
//   sudo dnf remove <pkg> && sudo dnf autoremove -y
//   dnf search <term> && dnf info <pkg>
//   rpm -ql <pkg>    // files from pkg
//   rpm -qf <file>   // who owns file
//
// From source:
//   tar -xf src.tar.gz && cd src
//   ./configure --prefix=/usr/local && make -j$(nproc)
//   sudo make install && sudo ldconfig
//
// End of Section 5.
// Want me to add a “common errors & fixes” page (GPG key, repo 404, broken deps)?
// ============================================================



//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// ============================================================
// 6) Process & System Monitoring — Notes (JS Comment Style)
// ============================================================
//
// A. View running processes
// ------------------------------------------------------------
// ps — snapshot of processes (non-interactive)
//
//   ps aux                       // BSD style: all processes
//   ps -ef                       // SysV style: full-format
//   ps -eo pid,ppid,user,stat,pcpu,pmem,etime,cmd --sort=-pcpu | head
//   ps -o pid,user,pcpu,pmem,cmd -C nginx   // filter by command name
//
// Columns quick-glossary:
//   PID  = process id          PPID  = parent pid
//   STAT = state+flags (R,S,D,T,Z,+)  R=running S=sleep D=uninterruptible I/O
//   %CPU = CPU percent         %MEM  = memory percent
//   VSZ  = virt mem (KiB)      RSS   = resident (RAM) in KiB
//
// Grep safely (avoid matching the grep itself):
//   ps aux | grep '[m]y-service'
//
// pgrep / pkill helpers (see kill section):
//   pgrep -a node              // show PIDs + args for node processes
//
//
// top — interactive live view (built-in on most systems)
//
//   top                        // launch
//   top -d 1                   // 1s refresh
//   top -b -n 1                // batch mode (for scripts)
//
//   Inside top (hotkeys):
//     P  sort by CPU           M  sort by memory
//     T  sort by time          1  per-CPU breakdown
//     c  toggle full command   k  kill a process (prompts for PID/SIG)
//     r  renice                u  filter by user
//     h  help                  q  quit
//
// htop — nicer top (needs install: apt/dnf install htop)
//
//   htop
//   Keys:
//     F6 sort by column   F3 search     F4 filter
//     F5 tree view        F9 kill       F2 setup (show CPU %, MEM bars, I/O, etc.)
//   Mouse support + color + easy process selection.
//
//
// B. Kill processes (signals)
// ------------------------------------------------------------
// Signals (common):
//   SIGTERM (15)  polite stop (default for kill) — try first
//   SIGKILL (9)   force kill (can’t be trapped) — last resort
//   SIGHUP (1)    “hangup”; often triggers reload
//   SIGINT (2)    like Ctrl+C
//   SIGSTOP (19)  pause; SIGCONT (18) continue
//   List all:  kill -l
//
// kill — by PID
//   kill 1234                 // send SIGTERM
//   kill -9 1234              // send SIGKILL (force)
//   kill -HUP 1234            // send SIGHUP
//
// pkill / killall — by name/pattern/user/session
//   pkill nginx               // TERM all processes named nginx
//   pkill -9 -f 'python app.py'   // match full cmdline, force kill
//   pkill -u alice            // kill all processes of user alice
//   killall chrome            // similar to pkill (name match)
//
// Find then kill (explicit):
//   pgrep -a myservice        // list
//   pgrep myservice | xargs -r kill
//
// Notes:
//   • Prefer TERM → wait → then KILL if needed.
//   • Zombies (STAT=Z) can’t be killed; their parent must reap them.
//   • If the process is a service, prefer systemctl stop <svc> (cleaner).
//
//
// C. Monitor system resources
// ------------------------------------------------------------
// Memory — free
//   free -h                   // human readable (Mem, Swap, available)
//   watch -n 1 free -h        // refresh every 1s
//
// Disks — df (filesystem usage)
//   df -h                     // usage by mount point
//   df -hT                    // include filesystem type
//   df -i                     // inode usage (useful for “No space left” due to inodes)
//
// Disk space by directory — du (what is taking space?)
//   du -sh *                  // sizes of items in current dir
//   du -sh .                  // total size of current tree
//   du -xh --max-depth=1 | sort -h      // summary tree (exclude other filesystems)
//
// Uptime & load — uptime
//   uptime
//   // Output: time, users, load averages (1, 5, 15 min)
//   // Rule of thumb: compare load to CPU cores (nproc).
//   // e.g., load 8.0 on 4-core CPU ≈ saturated.
//
// Bonus one-liners:
//   # Top 10 memory hogs
//   ps -eo pid,comm,pmem,pcpu --sort=-pmem | head
//
//   # Largest directories in /var (top 10)
//   du -xh /var --max-depth=2 2>/dev/null | sort -h | tail -n 10
//
//   # Watch disk free on root every 2s
//   watch -n 2 'df -h /'
//
//
// D. Practical triage workflow
// ------------------------------------------------------------
// 1) Is the box overloaded?
//    uptime        // check load averages vs core count (nproc)
//    top / htop    // who’s burning CPU / RAM?
//
// 2) Is disk full?
//    df -h         // which filesystem is at 100%?
//    du -xh --max-depth=1 | sort -h   // find heavy directories
//
// 3) Kill a runaway process safely:
//    pkill myapp                // send TERM
//    sleep 2 && pgrep myapp && pkill -9 myapp   // force if still alive
//
// 4) Prefer service-aware controls when applicable:
//    systemctl status myapp
//    sudo systemctl stop|start|restart myapp
//
//
// E. Gotchas & tips
// ------------------------------------------------------------
// • `du` sees file sizes within the directory tree; `df` sees filesystem usage.
//   Deleted-but-open large files still consume space until process closes them.
//   (Check with: lsof | grep deleted)
// • `top` %CPU can exceed 100% on multi-core systems (e.g., 400% on 4 cores).
// • For long outputs, pipe to a pager: | less
// • Use `sudo` for system paths to avoid permission-denied skew in du/df.
//
// End of Section 6.
// Want a “live-lab” checklist you can run on your VM to practice all of this?
// ============================================================



//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////



// ============================================================
// 7) Networking Basics — Notes (JS Comment Style)
// ============================================================
//
// A. Check IP addresses & routes
// ------------------------------------------------------------
// ip (modern, preferred):
//   ip a                    // show all interfaces + IPv4/IPv6
//   ip -br a                // brief, one-line per interface
//   ip addr show dev eth0   // only eth0
//   ip -4 a                 // IPv4 only
//   ip -6 a                 // IPv6 only
//
// Default route / gateway:
//   ip route                // routing table (look for "default via ...")
//   ip -br route            // brief routing
//
// DNS resolution quick checks:
//   getent hosts example.com     // uses system NSS (respects /etc/nsswitch.conf)
//   dig example.com +short       // if bind-utils/dnsutils installed
//   nslookup example.com         // older alternative
//
// Hostname & local IPs:
//   hostname                    // system hostname
//   hostname -I                 // all assigned IPs (space-separated)
//
// Ifconfig (legacy, net-tools):
//   ifconfig                    // may need: sudo apt/dnf install net-tools
//
// Public IP (from CLI):
//   curl -s https://ifconfig.me
//   curl -s https://ipinfo.io/ip
//
// B. Test connectivity (ICMP, TCP, path)
// ------------------------------------------------------------
// ping — ICMP echo (Ctrl+C to stop):
//   ping -c 4 8.8.8.8          // 4 pings to Google DNS
//   ping -c 4 example.com      // test DNS + ICMP
//   ping6 -c 4 ipv6.google.com // IPv6
//
// traceroute / tracepath — show route hops:
//   traceroute example.com     // UDP-based by default on Linux
//   traceroute -I example.com  // use ICMP (often needs sudo)
//   tracepath example.com      // unprivileged alternative
//   mtr -rw example.com        // real-time traceroute+ping (install mtr)
//     // -r: report, -w: wide; interactive `mtr example.com` is great for live checks
//
// TCP connectivity (when ICMP is blocked):
//   nc -zv example.com 443     // test if TCP port 443 is reachable
//   timeout 5 bash -c '</dev/tcp/example.com/443'  // shell TCP test (bash feature)
//   curl -I https://example.com // fetch only headers (also tests TLS handshake)
//
// C. Download files (wget, curl)
// ------------------------------------------------------------
// wget — simple downloader:
//   wget https://host/file.tar.gz           // save as original name
//   wget -O app.tar.gz https://host/file    // save to custom name
//   wget -c https://host/big.iso            // continue/resume partial download
//   wget -r -np -N https://host/dir/        // recursive (be considerate)
//   wget --limit-rate=1M URL                // throttle
//
// curl — versatile client (HTTP(S), FTP, etc):
//   curl -O https://host/file.tar.gz        // save as remote name
//   curl -o out.bin https://host/file       // save to specific file
//   curl -L https://short.url               // follow redirects
//   curl -I https://example.com             // HEAD request (headers only)
//   curl -C - -O https://host/big.iso       // resume download
//
// curl for APIs (JSON):
//   curl -s -H "Accept: application/json" https://api.example.com/items
//   curl -s -X POST https://api.example.com/login \
//     -H "Content-Type: application/json" \
//     -d '{"user":"ajay","pass":"secret"}'
//
// Timing/debug:
//   curl -s -o /dev/null -w "connect=%{time_connect} total=%{time_total}\n" https://example.com
//   curl -v https://example.com            // verbose (TLS, headers)
//
// D. Open ports & listening services (server-side)
// ------------------------------------------------------------
// ss — modern socket statistics (replacement for netstat):
//   ss -tuln                          // TCP/UDP listening sockets (numeric)
//   ss -lntp                          // TCP listening + process (need sudo for names)
//   ss -tup                           // all TCP + proc info
//   ss -s                             // summary stats
//   // Flags: -t TCP, -u UDP, -l listening, -n numeric, -p process, -4/-6 IPv4/IPv6
//
// netstat (legacy, net-tools):
//   netstat -tulpen                    // listening + program names (needs sudo)
//   netstat -plant                     // all TCP with PIDs/programs
//
// What’s bound to a specific port?
//   sudo lsof -i :80                   // who owns TCP/UDP port 80
//   sudo fuser -vn tcp 80              // show process using port 80
//
// Quick scan from the machine itself:
//   nc -zv localhost 22 80 443         // test if local services are listening
//
// Firewall views:
//   sudo ufw status verbose            // Debian/Ubuntu
//   sudo firewall-cmd --list-all       // RHEL/CentOS/Fedora (firewalld)
//   sudo iptables -L -n -v             // raw tables (legacy)
//   sudo nft list ruleset              // nftables (modern)
//
// E. Handy combos & workflows
// ------------------------------------------------------------
// 1) Diagnose “site is slow”:
//    ping -c 3 site.tld
//    mtr -rw site.tld                    // packet loss / jitter per hop
//    curl -s -o /dev/null -w "%{time_connect} %{time_starttransfer} %{time_total}\n" https://site.tld
//
// 2) “Port already in use” on 3000:
//    ss -lntp | grep ':3000'             // find PID
//    sudo kill -TERM <PID>               // stop politely (or systemctl stop <svc>)
//
// 3) Check disk of a remote URL then download:
//    curl -I https://host/file.bin       // verify status/size/content-type
//    curl -O https://host/file.bin       // download
//
// 4) Verify DNS vs reachability:
//    getent hosts api.myapp.local
//    nc -zv api.myapp.local 443
//
// F. Notes, tips, and gotchas
// ------------------------------------------------------------
// • ICMP may be blocked by firewalls; use TCP checks (nc/curl) instead of ping.
// • Use `-n` with ss/netstat to avoid slow reverse DNS lookups.
// • Prefer `ss` over `netstat` on modern systems; install `iproute2` suite if missing.
// • IPv6 issues? Try forcing IPv4 with curl/wget `-4` or ss `-4`.
// • Respect robots.txt and rate limits when using wget recursion.
// • For persistent connectivity tests: `watch -n 1 'ping -c1 8.8.8.8 | tail -n2'`
//
// End of Section 7.
// Want an exercise sheet (e.g., “find the process on port 5432”, “measure TTFB”)? 
// ============================================================



//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////



// ============================================================
// 8) Shell Scripting (Automation) — Notes (JS Comment Style)
// ============================================================
//
// A. Writing Basic Bash Scripts
// ------------------------------------------------------------
// 1) Create a script:
//    echo '#!/usr/bin/env bash' > script.sh
//    echo 'echo "Hello, $USER"' >> script.sh
//    chmod +x script.sh
//    ./script.sh                // or: bash script.sh
//
// 2) Shebang & safety switches:
//    #!/usr/bin/env bash
//    set -Eeuo pipefail
//    IFS=$'\n\t'
//    // -e: exit on error, -u: undefined var -> error, -o pipefail: capture pipe errors
//    // -E: preserve ERR traps in functions
//
// 3) Arguments, exit codes, and help:
//    "$0" = script name, "$1" "$2" … = args, "$@" = all args, "$#" = arg count
//    exit 0   // success; non-zero means failure
//
// 4) Functions & structured layout:
//    usage() { echo "Usage: $0 [-v] input_file"; }
//    log()   { printf '[%(%F %T)T] %s\n' -1 "$*"; }     // timestamped log
//    die()   { echo "ERROR: $*" >&2; exit 1; }
//
// 5) Parsing flags (getopts):
//    verbose=false
//    while getopts ":vi:" opt; do
//      case "$opt" in
//        v) verbose=true ;;
//        i) input="$OPTARG" ;;
//        \?) die "Unknown option: -$OPTARG" ;;
//        :) die "Option -$OPTARG requires an argument" ;;
//      esac
//    done
//    shift $((OPTIND-1))
//
// 6) Paths & portability tips:
//    // Robust script dir (absolute path of this script):
//    SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
//    // Always quote variables: "$var"; prefer $(cmd) over legacy backticks.
//    // Beware Windows line endings: run `dos2unix script.sh` if needed.
//
// 7) Redirection & logging:
//    cmd >out.log 2>err.log       // split stdout/stderr
//    cmd &> all.log               // both to one file (bash)
//    cmd | tee -a combined.log    // also print to terminal
//
// 8) Traps & cleanup (handle Ctrl+C, errors, exit):
//    cleanup() { rm -f /tmp/app.lock; }
//    trap cleanup EXIT
//    trap 'echo "Interrupted"; exit 130' INT
//
// 9) Here-docs & process substitution:
//    cat <<'EOF' > config.ini
//    [app]
//    env=prod
//    EOF
//    // Process substitution example:
//    diff <(sort a.txt) <(sort b.txt)
//
// ------------------------------------------------------------
// B. Variables, Loops, and Conditionals
// ------------------------------------------------------------
// Variables:
//   name="Ajay"              // no spaces around =
//   echo "Hello, $name"      // always quote expansions
//   readonly PI=3.14
//
// Arrays & maps (bash ≥4):
//   arr=(alpha beta gamma)
//   echo "${arr[1]}"         // beta
//   for x in "${arr[@]}"; do echo "$x"; done
//   declare -A m; m[env]=prod; m[region]=ap-south-1
//   echo "${m[env]} ${!m[@]} ${m[@]}"
//
// Arithmetic:
//   n=5; m=7; echo $((n+m))  // 12
//
// Conditionals:
//   if [[ -f "$file" ]]; then echo "regular file"; fi
//   if [[ -d "$dir" ]];  then echo "directory";   fi
//   if [[ -s "$file" ]]; then echo "non-empty";   fi
//   if [[ "$a" == "$b" ]]; then echo "equal";     fi
//   if (( n > 10 )); then echo "big"; fi          // arithmetic
//
// Case:
//   case "$env" in
//     dev)  api="https://dev.example.com" ;;
//     prod) api="https://api.example.com" ;;
//     *)    die "Unknown env: $env"       ;;
//   esac
//
// Loops:
//   for f in *.log; do echo "File: $f"; done
//   while IFS= read -r line; do echo "L: $line"; done < input.txt
//   // Safe find + while (handles spaces/newlines):
//   find . -type f -name "*.tmp" -print0 | while IFS= read -r -d '' f; do rm -f "$f"; done
//
// Subshells & command substitution:
//   TODAY="$(date +%F)"
//   SIZE="$(du -sh . | awk '{print $1}')"
//
// ------------------------------------------------------------
// C. Automating Tasks with cron
// ------------------------------------------------------------
// 1) Basics:
//   crontab -e              // edit current user's crontab
//   crontab -l              // list
//   sudo crontab -u user -e // edit for another user
//
// 2) Syntax (five fields + command):
//   ┌ minute (0-59)
//   │ ┌ hour (0-23)
//   │ │ ┌ day of month (1-31)
//   │ │ │ ┌ month (1-12 or names)
//   │ │ │ │ ┌ day of week (0-7 or names; 0/7=Sun)
//   │ │ │ │ │
//   * * * * *  /absolute/path/to/command arg1 arg2
//
// 3) Specials:
//   @reboot     /path/startup.sh
//   @hourly     /path/job.sh
//   @daily      /path/backup.sh
//   @weekly     /path/rotate.sh
//   @monthly    /path/report.sh
//
// 4) Examples:
//   // Run backup every day at 02:30
//   30 2 * * *  /usr/local/bin/backup.sh >>/var/log/backup.log 2>&1
//
//   // Clear tmp at 6:00 and 18:00
//   0 6,18 * * *  find /tmp -type f -mtime +2 -delete
//
//   // Run every 5 minutes
//   */5 * * * *  /usr/local/bin/healthcheck.sh
//
// 5) Environment in cron:
//   // Cron runs with a minimal PATH. Set it explicitly:
//   PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
//   SHELL=/bin/bash
//   MAILTO=                 // empty to disable mail on output
//   // Always use absolute paths to scripts, files, and interpreters.
//
// 6) Where to place jobs:
//   // Per-user table: crontab -e
//   // System-wide:    /etc/crontab, /etc/cron.d/*, /etc/cron.daily/* (root only)
//   // On laptops/servers with systemd, consider systemd timers (more features).
//
// 7) Debugging cron jobs:
//   // Log output to a file:   >>/var/log/myjob.log 2>&1
//   // Test the exact command in a normal shell first.
//   // Check system logs (e.g., /var/log/syslog or journalctl -u cron / crond).
//
// ------------------------------------------------------------
// D. Mini Templates (copy/paste)
// ------------------------------------------------------------
// 1) Script skeleton:
//
//   #!/usr/bin/env bash
//   set -Eeuo pipefail
//   IFS=$'\n\t'
//
//   SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
//   log() { printf '[%(%F %T)T] %s\n' -1 "$*"; }
//   die() { echo "ERROR: $*" >&2; exit 1; }
//   trap 'log "cleanup";' EXIT
//
//   usage() { echo "Usage: $0 [-v] -i <input>"; }
//
//   verbose=false; input=""
//   while getopts ":vi:" opt; do
//     case "$opt" in
//       v) verbose=true;;
//       i) input="$OPTARG";;
//       \?) die "Unknown option: -$OPTARG";;
//       :)  die "Option -$OPTARG requires an argument";;
//     esac
//   done
//   shift $((OPTIND-1))
//
//   [[ -n "$input" ]] || { usage; exit 2; }
//
//   $verbose && log "Starting with input=$input"
//   # … do work …
//   log "Done."
//
// 2) Cron-wrapper pattern:
//
//   #!/usr/bin/env bash
//   set -Eeuo pipefail
//   export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
//   LOG=/var/log/myjob.log
//   {
//     echo "=== Run at $(date +%F\ %T) ==="
//     /usr/local/bin/do-the-thing --mode=prod
//     echo
//   } >>"$LOG" 2>&1
//
// ------------------------------------------------------------
// E. Best Practices & Gotchas
// ------------------------------------------------------------
// • Quote everything that can contain spaces: "$path", "$@"; use `--` to stop option parsing.
// • Prefer `[[ … ]]` for tests; use `(( … ))` for arithmetic.
// • Use `mapfile -t arr < <(cmd)` to safely read lines into an array.
// • For large loops over files, prefer `find … -print0` + `while read -r -d ''`.
// • Never rely on implicit PATH in cron; always set PATH and use absolute paths.
// • Keep scripts idempotent (safe to re-run), and return meaningful exit codes.
// • Version-control your scripts and cron entries; document dependencies at the top.
//
// End of Section 8.
// Want a set of hands-on automation tasks (log rotation, backup, watchdog) with solutions?
// ============================================================


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


// ============================================================
// 9) Advanced Topics — Notes (JS Comment Style)
// ============================================================
//
// A. Environment Variables (export, .bashrc)
// ------------------------------------------------------------
// Show env:
//   printenv                 // all environment variables
//   echo "$PATH"             // single variable
//
// Set for current shell only:
//   FOO="bar"                // shell variable
//   export FOO               // make it an *environment* variable (inherited by children)
//
// One-shot for a single command:
//   DB_URL="postgres://…" node app.js   // only for this process
//
// Unset:
//   unset FOO
//
// Persistent across sessions (Bash):
//   # ~/.bashrc        → runs for interactive non-login shells (terminals)
//   # ~/.profile       → login shells (Debian/Ubuntu); macOS often uses ~/.bash_profile
//   # Add lines such as:
///  export EDITOR="vim"
///  export PATH="$HOME/.local/bin:$PATH"
//
// Apply changes immediately:
//   source ~/.bashrc    // or: . ~/.bashrc
//
// Safer PATH edits:
//   case ":$PATH:" in *":$HOME/bin:"*) ;; *) export PATH="$HOME/bin:$PATH";; esac
//
// Inspect variable attributes:
//   declare -x          // exported variables
//
// Tip: For project-specific env files, consider `direnv` or a `.env` + a loader.
//
//
// B. File Compression & Archiving (tar, gzip, zip)
// ------------------------------------------------------------
// TAR (archive multiple files; combine with compression):
//   # Create archives:
//   tar -cf code.tar src/                      // plain tar
//   tar -czf code.tar.gz src/                  // gzip
//   tar -cjf code.tar.bz2 src/                 // bzip2 (smaller, slower)
//   tar -cJf code.tar.xz src/                  // xz (smallest, slowest)
//   tar -caf code.tar.zst src/                 // zstd (fast + good, if supported)
//
//   # Extract (auto-detect with -xf):
//   tar -xf code.tar.gz
//   tar -xf code.tar.xz -C /tmp/extract_here
//
//   # List contents / verify:
//   tar -tf code.tar.gz
//   tar -tvf code.tar.gz | less
//
//   # Exclude patterns / preserve perms:
//   tar --exclude='node_modules' -czpf backup.tgz project/
//
// gzip / gunzip (single-file compression):
//   gzip big.log               // creates big.log.gz, removes original
//   gzip -k big.log            // keep original
//   gunzip big.log.gz
//   zcat big.log.gz | head     // view without extracting
//   pigz file                  // parallel gzip (multi-core) if installed
//
// zip / unzip (cross-platform friendly):
//   zip -r site.zip site/                  // recurse
//   zip -r9 site.zip site/                 // level 9 compression
//   unzip site.zip -d /tmp/site
//   unzip -l site.zip                      // list
//
// Tips:
// • tar preserves Unix perms/ownership; zip does not by default.
// • Use `-p` (preserve perms) with tar and extract as root for system backups.
// • Prefer `zstd` for speed/ratio if your distro supports it: `tar -I zstd -cf a.tar.zst dir`.
//
//
// C. Disk Partitioning & Filesystems (fdisk, lsblk)
// ------------------------------------------------------------
// Non-destructive inspection:
//   lsblk -f                     // tree of disks/parts with FS type + labels + UUIDs
//   blkid                        // metadata (UUID, TYPE)
//   df -h                        // mounted filesystems usage
//
// Create/modify partitions (MBR/GPT):
//   sudo fdisk /dev/sda          // interactive (classic; supports GPT too)
//   sudo cfdisk /dev/sda         // ncurses UI
//   sudo parted -l               // show layout (good for >2TB / GPT)
//   sudo parted /dev/sda         // interactive, supports alignment/GPT
//
// Make a filesystem (DANGEROUS — erases partition):
//   sudo mkfs.ext4 /dev/sda1
//   sudo mkfs.xfs  /dev/sdb1
//   sudo mkswap    /dev/sdc2    && sudo swapon /dev/sdc2
//
// Mounting:
//   sudo mkdir -p /mnt/data
//   sudo mount /dev/sdb1 /mnt/data
//   sudo umount /mnt/data
//
// Persistent mounts (/etc/fstab):
//   # Example line (use UUID to be stable across reboots):
//   UUID=xxxx-xxxx  /mnt/data  ext4  defaults,noatime  0  2
//   # After editing, test without reboot:
//   sudo mount -a
//
// Labels & UUIDs:
//   sudo e2label /dev/sdb1 DATA          // set ext4 label
//   sudo xfs_admin -L DATA /dev/sdb1     // set xfs label
//
// Growing a filesystem (ext4 example after enlarging partition / disk):
//   # 1) Grow partition (cloud: growpart /dev/sda 1)
//   sudo growpart /dev/sda 1
//   # 2) Resize filesystem online (mounted ext4):
//   sudo resize2fs /dev/sda1
//
// Precautions:
// • Triple-check device names (/dev/sdX, /dev/nvmeXnYpZ) before mkfs/partitioning.
// • Back up important data; operations are destructive.
// • For complex setups (snapshots, RAID), look into LVM (pvcreate/vgcreate/lvcreate).
//
//
// D. Services Management (systemctl, service)
// ------------------------------------------------------------
// systemd systems (most modern distros):
//   sudo systemctl status nginx
//   sudo systemctl start nginx
//   sudo systemctl stop nginx
//   sudo systemctl restart nginx
//   sudo systemctl reload nginx           // SIGHUP/reload if unit supports it
//   systemctl is-active nginx             // active/inactive
//   systemctl is-enabled nginx            // enabled/disabled on boot
//   sudo systemctl enable nginx           // start on boot
//   sudo systemctl disable nginx
//
// Logs (journal):
//   journalctl -u nginx                   // unit logs
//   journalctl -u nginx -f                // follow
//   journalctl -u nginx --since "1 hour ago"
//   journalctl -b                         // logs since last boot
//
// List / inspect units:
//   systemctl list-units --type=service
//   systemctl list-unit-files | grep enabled
//   systemctl cat nginx                   // show unit file
//   sudo systemctl daemon-reload          // after editing unit files
//
// Create a simple service (example):
//   // /etc/systemd/system/myapp.service
//   [Unit]
//   Description=My Node App
//   After=network.target
//
//   [Service]
//   ExecStart=/usr/bin/node /opt/myapp/server.js
//   WorkingDirectory=/opt/myapp
//   Restart=on-failure
//   User=myuser
//   Environment=NODE_ENV=production
//
//   [Install]
//   WantedBy=multi-user.target
//
//   // Enable & start:
//   sudo systemctl daemon-reload
//   sudo systemctl enable --now myapp
//
// Legacy SysV systems (or compatibility shim):
//   sudo service nginx status
//   sudo service nginx start|stop|restart
//
// Targets (runlevels replacement):
//   systemctl get-default                 // e.g., graphical.target, multi-user.target
//   sudo systemctl set-default multi-user.target
//
// Tips:
// • Prefer `systemctl reload` over `restart` for config changes when supported.
// • Use `EnvironmentFile=/etc/sysconfig/myapp` (or /etc/default/myapp on Debian) to keep env vars.
// • For scheduled jobs with dependencies/logging, consider systemd timers over cron.
//
// ------------------------------------------------------------
// E. Quick Cheat Sheet
// ------------------------------------------------------------
// Env:
//   export FOO=bar && echo "$FOO"
//   echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc && source ~/.bashrc
//
// Archive:
//   tar -czf backup.tgz /etc /var/www
//   tar -xf backup.tgz -C /tmp/restore
//
// Disk:
//   lsblk -f
//   sudo fdisk /dev/sdb
//   sudo mkfs.ext4 /dev/sdb1 && sudo mount /dev/sdb1 /mnt/data
//
// Services:
//   sudo systemctl enable --now app
//   systemctl status app && journalctl -u app -f
//
// End of Section 9.
// Want practice labs (create a service, grow a disk, make & restore a tar backup)?
// ============================================================


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


// ============================================================
// 10) Security & Server Administration — Notes (JS Comment Style)
// ============================================================
//
// A. Firewall Basics (ufw, iptables, nftables)
// ------------------------------------------------------------
// UFW (Ubuntu/Debian-friendly wrapper around netfilter):
//   sudo ufw status verbose
//   sudo ufw default deny incoming
//   sudo ufw default allow outgoing
//   // Open SSH safely (rate-limit brute force):
//   sudo ufw allow OpenSSH           // or: sudo ufw allow 22/tcp
//   sudo ufw limit 22/tcp            // adds rate-limiting rule
//   // Restrict SSH to your IP only:
//   sudo ufw allow from 203.0.113.5 to any port 22 proto tcp
//   // Web services:
//   sudo ufw allow 80/tcp
//   sudo ufw allow 443/tcp
//   // Manage rules:
//   sudo ufw status numbered
//   sudo ufw delete <num>
//   sudo ufw disable && sudo ufw enable
//   // Enable IPv6 (if needed): set IPV6=yes in /etc/default/ufw then `sudo ufw reload`.
//
// iptables (legacy raw interface; many distros now prefer nftables):
//   sudo iptables -L -n -v             // list rules (filter table)
//   sudo iptables -S                    // list as commands
//   // Basic safe policy (allow established; open 22,80,443; drop rest):
//   sudo iptables -P INPUT DROP
//   sudo iptables -P FORWARD DROP
//   sudo iptables -P OUTPUT ACCEPT
//   sudo iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
//   sudo iptables -A INPUT -i lo -j ACCEPT
//   sudo iptables -A INPUT -p tcp --dport 22  -j ACCEPT
//   sudo iptables -A INPUT -p tcp --dport 80  -j ACCEPT
//   sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT
//   // Persist rules:
//   // Debian/Ubuntu: sudo apt install iptables-persistent && sudo netfilter-persistent save
//   // RHEL-like: save via service scripts or use `iptables-save > rules.v4` at boot.
//
// nftables (modern replacement for iptables):
//   sudo nft list ruleset
//   // Minimal example (one-shot):
//   sudo nft add table inet filter
//   sudo nft add chain inet filter input '{ type filter hook input priority 0; policy drop; }'
//   sudo nft add rule  inet filter input ct state established,related accept
//   sudo nft add rule  inet filter input iif lo accept
//   sudo nft add rule  inet filter input tcp dport {22,80,443} accept
//   sudo nft add rule  inet filter input counter drop
//   // Persist via /etc/nftables.conf then: sudo systemctl enable --now nftables
//
// Quick checks:
//   ss -lntp                 // who is listening
//   sudo lsof -i :22         // what owns the port
//   nc -zv localhost 22 80   // local connect test
//
// ------------------------------------------------------------
// B. SSH Hardening
// ------------------------------------------------------------
// 1) Use key-based auth (disable passwords):
//   ssh-keygen -t ed25519 -C "your-laptop"           // generate key
//   ssh-copy-id user@server                          // install public key
//   // Test login works *before* disabling passwords.
//
// 2) Harden sshd_config (usually at /etc/ssh/sshd_config):
//   // Add/edit these lines, then test and reload (see below):
//   Protocol 2
//   PermitRootLogin no
//   PasswordAuthentication no          // set to 'no' after key auth confirmed
//   PubkeyAuthentication yes
//   KbdInteractiveAuthentication no    // aka ChallengeResponseAuthentication no
//   MaxAuthTries 3
//   LoginGraceTime 20
//   AllowUsers admin devuser           // or: AllowGroups sshusers
//   X11Forwarding no
//   AllowAgentForwarding no
//   AllowTcpForwarding no
//   ClientAliveInterval 300
//   ClientAliveCountMax 2
//   LogLevel VERBOSE
//   // Optional: change port (security-by-obscurity; still use firewall):
//   // Port 2222
//
//   // Validate & apply safely:
//   sudo sshd -t                      // syntax check
//   sudo systemctl reload sshd        // or: sudo systemctl reload ssh
//   // Tip: keep an existing SSH session open while testing to avoid lockout.
//
// 3) Anti-bruteforce with fail2ban:
//   sudo apt/dnf install fail2ban
//   sudo systemctl enable --now fail2ban
//   // /etc/fail2ban/jail.local (minimal):
//   [sshd]
//   enabled = true
//   bantime = 1h
//   maxretry = 5
//   findtime = 10m
//   // Check status:
//   sudo fail2ban-client status sshd
//
// 4) (Optional) 2FA for SSH:
//   // Debian/Ubuntu: sudo apt install libpam-google-authenticator
//   // Run `google-authenticator` per user; then enable in PAM + sshd_config.
//   // Ensure you still have key-based auth and a recovery path.
//
// 5) Keys hygiene:
//   chmod 700 ~/.ssh
//   chmod 600 ~/.ssh/authorized_keys
//   ssh -o IdentitiesOnly=yes -i ~/.ssh/id_ed25519 user@server
//
// ------------------------------------------------------------
// C. Log Management (/var/log, journalctl)
// ------------------------------------------------------------
// Where logs live:
//   /var/log/syslog      // Debian/Ubuntu main system log
//   /var/log/auth.log    // auth/SSH logs (Debian/Ubuntu)
//   /var/log/messages    // general log (RHEL-like)
//   /var/log/secure      // auth/SSH on RHEL-like
//   /var/log/nginx/*.log // web server logs (example)
//
// journalctl (systemd journal):
//   journalctl -u nginx                 // logs for a unit
//   journalctl -u nginx -f              // follow live
//   journalctl --since "1 hour ago"
//   journalctl -p warning               // priority ≥ warning
//   journalctl -k                       // kernel messages
//   journalctl -b                       // since last boot
//   sudo journalctl --disk-usage
//   sudo journalctl --vacuum-time=14d   // trim old journal entries
//   // Persist across reboots (if not already):
//   // In /etc/systemd/journald.conf set: Storage=persistent  → sudo systemctl restart systemd-journald
//
// logrotate (rotate/compress old logs):
//   // Global: /etc/logrotate.conf, per-app: /etc/logrotate.d/<app>
//   // Example snippet for /var/log/myapp/*.log:
//   /var/log/myapp/*.log {
//     weekly
//     rotate 8
//     size 50M
//     compress
//     delaycompress
//     missingok
//     copytruncate           // use if app cannot be signaled to reopen logs
//     postrotate
//       systemctl kill -s HUP myapp || true
//     endscript
//   }
//   // Test config: sudo logrotate -d /etc/logrotate.conf
//
// rsyslog (forward to central log server):
//   // In /etc/rsyslog.d/90-remote.conf:
//   *.* @@logs.example.com:514    // @@ = TCP, @ = UDP
//   // Then: sudo systemctl restart rsyslog
//
// Quick triage commands:
//   sudo tail -F /var/log/auth.log | grep -i "failed"
//   sudo grep -R "Out of memory" /var/log -n
//   sudo ausearch -k mykey && sudo aureport  // if auditd is used
//
// ------------------------------------------------------------
// D. Practical Hardening Checklist (copy/paste friendly)
// ------------------------------------------------------------
// # Firewall (UFW):
// sudo ufw default deny incoming && sudo ufw default allow outgoing
// sudo ufw allow 22/tcp && sudo ufw limit 22/tcp
// sudo ufw allow 80,443/tcp
// sudo ufw enable
//
// # SSH:
// ssh-keygen -t ed25519 -C "laptop"
// ssh-copy-id user@server
// sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak
// sudo sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin no/; s/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
// sudo sshd -t && sudo systemctl reload sshd
//
// # Logs & rotation:
// sudo journalctl --vacuum-time=14d
// sudo logrotate -d /etc/logrotate.conf    // dry-run check
//
// # Updates & users (bonus):
// sudo apt update && sudo apt upgrade -y   // or: sudo dnf upgrade -y
// sudo usermod -aG sudo youruser           // grant admin group (Debian/Ubuntu)
// sudo passwd -l root                      // lock root password (key-only root if needed)
//
// ------------------------------------------------------------
// E. Safety Tips & Gotchas
// ------------------------------------------------------------
// • Always keep a secondary SSH session open when changing sshd or firewall rules.
// • Backup working configs (sshd_config, nftables.conf, etc.) before edits.
// • Prefer least privilege: restrict SSH by AllowUsers/AllowGroups and firewall source IPs.
// • Monitor auth attempts regularly (fail2ban + journalctl).
// • Keep OS and packages updated; patch often.
// • Consider systemd timers + scripts for periodic log cleanup and `apt/dnf` updates.
//
// End of Section 10.
// Want a one-page “harden-new-server.sh” bootstrap script that applies all of this?
// ============================================================


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////




// ============================================================
// 11) Linux for DevOps — Notes (JS Comment Style)
// ============================================================
//
// A. Managing Docker
// ------------------------------------------------------------
// Install (Debian/Ubuntu):
//   sudo apt update && sudo apt install -y ca-certificates curl gnupg
//   sudo install -m 0755 -d /etc/apt/keyrings
//   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
//   echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
//   https://download.docker.com/linux/ubuntu $(. /etc/os-release; echo $UBUNTU_CODENAME) stable" | \
//   sudo tee /etc/apt/sources.list.d/docker.list >/dev/null
//   sudo apt update && sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
//
// Post-install:
//   sudo usermod -aG docker $USER && newgrp docker
//
// Images / Containers:
//   docker pull nginx:alpine
//   docker images                          // list images
//   docker run -d --name web -p 8080:80 nginx:alpine
//   docker ps -a                           // list containers
//   docker logs -f web
//   docker exec -it web sh                 // shell inside container
//   docker stop web && docker rm web
//
// Build & Compose:
//   # Dockerfile (example)
//   FROM node:18-alpine
//   WORKDIR /app
//   COPY package*.json ./
//   RUN npm ci --only=production
//   COPY . .
//   EXPOSE 3000
//   CMD ["node", "server.js"]
//
//   # Build & tag
//   docker build -t myapp:1.0 .
//   docker tag myapp:1.0 registry.example.com/myproj/myapp:1.0
//   docker push registry.example.com/myproj/myapp:1.0
//
//   # docker compose (v2) example: docker-compose.yml
//   version: "3.9"
//   services:
//     api:
//       image: myapp:1.0
//       ports: ["3000:3000"]
//       env_file: .env
//       depends_on: [db]
//     db:
//       image: postgres:16-alpine
//       environment:
//         POSTGRES_PASSWORD: changeme
//       volumes: ["pgdata:/var/lib/postgresql/data"]
//   volumes: { pgdata: {} }
//
// Health, resources, security:
//   docker inspect web | jq '.[0].State.Health'   // needs HEALTHCHECK in image
//   docker run --read-only --cpus=1 --memory=512m --pids-limit=200 image
//   // Prefer non-root user in images; scan with: trivy image myapp:1.0
//
// ------------------------------------------------------------
// B. Kubernetes (k8s) Essentials
// ------------------------------------------------------------
// Install client:
//   curl -LO "https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl"
//   chmod +x kubectl && sudo mv kubectl /usr/local/bin/
//
// Local clusters (choose one):
//   # kind (Kubernetes in Docker):
//   kind create cluster --name dev
//   # minikube:
//   minikube start
//
// Core objects quickstart:
//   # deployment.yaml
//   apiVersion: apps/v1
//   kind: Deployment
//   metadata: { name: myapp }
//   spec:
//     replicas: 2
//     selector: { matchLabels: { app: myapp } }
//     template:
//       metadata: { labels: { app: myapp } }
//       spec:
//         containers:
//         - name: api
//           image: registry.example.com/myproj/myapp:1.0
//           ports: [{ containerPort: 3000 }]
//           resources: { requests: { cpu: "100m", memory: "128Mi" }, limits: { cpu: "500m", memory: "256Mi" } }
//           readinessProbe: { httpGet: { path: /health, port: 3000 }, initialDelaySeconds: 5, periodSeconds: 10 }
//           livenessProbe:  { httpGet: { path: /health, port: 3000 }, initialDelaySeconds: 15, periodSeconds: 20 }
//
//   # service.yaml
//   apiVersion: v1
//   kind: Service
//   metadata: { name: myapp-svc }
//   spec:
//     selector: { app: myapp }
//     ports: [{ name: http, port: 80, targetPort: 3000 }]
//     type: ClusterIP
//
//   # ingress.yaml (with ingress-nginx controller installed)
//   apiVersion: networking.k8s.io/v1
//   kind: Ingress
//   metadata:
//     name: myapp-ing
//     annotations: { nginx.ingress.kubernetes.io/rewrite-target: /$1 }
//   spec:
//     ingressClassName: nginx
//     rules:
//     - host: myapp.local
//       http:
//         paths:
//         - path: /(.*)
//           pathType: Prefix
//           backend: { service: { name: myapp-svc, port: { number: 80 } } }
//
// Apply & verify:
//   kubectl apply -f deployment.yaml -f service.yaml -f ingress.yaml
//   kubectl get deploy,po,svc,ing
//   kubectl describe deploy/myapp
//   kubectl logs deploy/myapp -c api -f
//   kubectl port-forward svc/myapp-svc 8080:80
//
// Rollouts & troubleshooting:
//   kubectl rollout status deploy/myapp
//   kubectl set image deploy/myapp api=registry.../myapp:1.1
//   kubectl rollout history deploy/myapp
//   kubectl rollout undo deploy/myapp --to-revision=1
//   kubectl top pods/nodes                         // needs Metrics Server
//
// Config & Secrets:
//   kubectl create configmap app-config --from-literal=MODE=prod
//   kubectl create secret generic app-secrets --from-literal=DB_PASS=changeme
//   # mount or envFrom in Pod spec; avoid committing secrets, consider External Secrets.
//
// Packaging:
//   # Helm
//   helm create chart-myapp
//   helm upgrade --install myapp ./chart-myapp -f values.yaml
//   # Kustomize (built into kubectl):
//   kubectl apply -k overlays/prod
//
// ------------------------------------------------------------
// C. Continuous Integration (CI) Tools
// ------------------------------------------------------------
// Jenkins (self-hosted):
//   docker run -d --name jenkins -p 8080:8080 -p 50000:50000 jenkins/jenkins:lts
//   // Pipeline (Jenkinsfile) example:
//   pipeline {
//     agent any
//     stages {
//       stage('Install') { steps { sh 'npm ci' } }
//       stage('Test')    { steps { sh 'npm test -- --ci' } }
//       stage('Build')   { steps { sh 'docker build -t myapp:$BUILD_NUMBER .' } }
//       stage('Push')    { steps { sh 'docker push myapp:$BUILD_NUMBER' } }
//       stage('Deploy')  { steps { sh 'kubectl set image deploy/myapp api=myapp:$BUILD_NUMBER' } }
//     }
//   }
//
// GitHub Actions (hosted):
//   # .github/workflows/ci.yml
//   name: CI
//   on: [push, pull_request]
//   jobs:
//     build:
//       runs-on: ubuntu-latest
//       steps:
//         - uses: actions/checkout@v4
//         - uses: actions/setup-node@v4
//           with: { node-version: 20 }
//         - run: npm ci
//         - run: npm test -- --ci
//         - run: docker build -t myapp:${{ github.sha }} .
//         - run: echo "${{ secrets.REGISTRY_PASS }}" | docker login -u "${{ secrets.REGISTRY_USER }}" --password-stdin registry.example.com
//         - run: docker push registry.example.com/myproj/myapp:${{ github.sha }}
//
// GitLab CI:
//   # .gitlab-ci.yml
//   stages: [test, build, deploy]
//   test:
//     image: node:20-alpine
//     script: [ "npm ci", "npm test -- --ci" ]
//   build:
//     image: docker:27
//     services: [ docker:27-dind ]
//     script:
//       - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .
//       - echo "$CI_REGISTRY_PASSWORD" | docker login -u "$CI_REGISTRY_USER" --password-stdin $CI_REGISTRY
//       - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
//   deploy:
//     image: bitnami/kubectl:latest
//     script: [ "kubectl set image deploy/myapp api=$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA" ]
//
// CI best practices:
//   • Cache deps (npm ci + cache, Docker layer caching).
//   • Shift-left security: run `npm audit`, `trivy fs .`, `trivy image`.
//   • Use ephemeral runners/agents or isolate with least privileges.
//   • Keep secrets in CI vaults (GitHub Encrypted Secrets / GitLab Variables).
//
// ------------------------------------------------------------
// D. Monitoring with Prometheus & Grafana
// ------------------------------------------------------------
// Prometheus scrape setup (docker-compose example):
//   # prometheus.yml
//   global: { scrape_interval: 15s }
//   scrape_configs:
//   - job_name: 'self'
//     static_configs: [{ targets: ['prometheus:9090'] }]
//   - job_name: 'node'
//     static_configs: [{ targets: ['node-exporter:9100'] }]
//   - job_name: 'myapp'
//     metrics_path: /metrics
//     static_configs: [{ targets: ['myapp:3000'] }]
//
//   # docker-compose.yml (snippet)
//   services:
//     prometheus:
//       image: prom/prometheus
//       volumes: ["./prometheus.yml:/etc/prometheus/prometheus.yml:ro"]
//       ports: ["9090:9090"]
//     node-exporter:
//       image: prom/node-exporter
//       ports: ["9100:9100"]
//     grafana:
//       image: grafana/grafana
//       ports: ["3001:3000"]
//
// K8s monitoring (high level):
//   • Install kube-state-metrics + node-exporter.
//   • Use Prometheus Operator (kube-prometheus-stack Helm chart) to simplify CRDs.
//   • Expose app metrics at /metrics (Prometheus exposition format).
//
// PromQL quickies:
//   rate(http_requests_total[5m])                 // per-sec rate
//   sum by (status) (rate(http_requests_total[1m]))
//   histogram_quantile(0.95, sum by (le)(rate(http_request_duration_seconds_bucket[5m])))
//
// Alerting (Alertmanager minimal):
//   # alertmanager.yml
//   route: { receiver: 'mail' }
//   receivers:
//   - name: 'mail'
//     email_configs: [{ to: 'ops@example.com', from: 'alert@example.com', smarthost: 'smtp:587', auth_username: 'u', auth_password: 'p' }]
//
// Grafana tips:
//   • Add Prometheus as a data source (URL http://prometheus:9090).
//   • Import dashboards: Node Exporter Full, Kubernetes/APIServer, NGINX.
//   • Provision via YAML for repeatability.
//
// ------------------------------------------------------------
// E. Load Balancing & Web Servers (Nginx, Apache)
// ------------------------------------------------------------
// Nginx as reverse proxy (TLS + upstream):
//   # /etc/nginx/sites-available/myapp.conf
//   upstream app {
//     server 127.0.0.1:3000;      // or multiple servers for LB
//     # server 10.0.0.2:3000;
//     # server 10.0.0.3:3000;
//   }
//   server {
//     listen 80;
//     server_name myapp.example.com;
//     return 301 https://$host$request_uri;
//   }
//   server {
//     listen 443 ssl http2;
//     server_name myapp.example.com;
//     ssl_certificate     /etc/letsencrypt/live/myapp/fullchain.pem;
//     ssl_certificate_key /etc/letsencrypt/live/myapp/privkey.pem;
//     location / {
//       proxy_pass http://app;
//       proxy_set_header Host $host;
//       proxy_set_header X-Real-IP $remote_addr;
//       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
//       proxy_set_header X-Forwarded-Proto $scheme;
//       proxy_read_timeout 60s;
//       proxy_connect_timeout 5s;
//     }
//     location /health { return 200 "ok"; add_header Content-Type text/plain; }
//   }
//   # Enable & test:
//   sudo ln -s /etc/nginx/sites-available/myapp.conf /etc/nginx/sites-enabled/
//   sudo nginx -t && sudo systemctl reload nginx
//
// Nginx LB algorithms:
//   upstream app { server a:3000; server b:3000; }            // round-robin
//   upstream app { least_conn; server a:3000; server b:3000; }// least connections
//   upstream app { ip_hash; server a:3000; server b:3000; }   // sticky by client IP
//
// Apache (httpd) reverse proxy:
//   sudo a2enmod proxy proxy_http ssl headers
//   # /etc/apache2/sites-available/myapp.conf
//   <VirtualHost *:443>
//     ServerName myapp.example.com
//     SSLEngine on
//     SSLCertificateFile      /etc/letsencrypt/live/myapp/fullchain.pem
//     SSLCertificateKeyFile   /etc/letsencrypt/live/myapp/privkey.pem
//     ProxyPreserveHost On
//     ProxyPass        "/" "http://127.0.0.1:3000/"
//     ProxyPassReverse "/" "http://127.0.0.1:3000/"
//     Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
//   </VirtualHost>
//   sudo a2ensite myapp && sudo apache2ctl configtest && sudo systemctl reload apache2
//
// TLS automation (Let's Encrypt):
//   sudo snap install --classic certbot
//   sudo ln -s /snap/bin/certbot /usr/bin/certbot
//   sudo certbot --nginx -d myapp.example.com
//
// Observability for LB:
//   # Nginx stub_status:
//   location /nginx_status { stub_status; allow 127.0.0.1; deny all; }
//
// ------------------------------------------------------------
// F. SRE/Prod Tips & Quick Checks
// ------------------------------------------------------------
// • Readiness != Liveness: use both in k8s (avoid killing slow-starting apps).
// • Resource requests/limits: prevent noisy neighbors and OOMKills.
// • Blue/Green or Canary via Deployment strategies / Ingress annotations.
// • Keep infra-as-code: Helm/Kustomize/Terraform; version control everything.
// • Centralize logs/metrics/traces (ELK/Prom/Grafana/Tempo/Jaeger).
// • Backups + restore drills (DB snapshots + S3 lifecycle).
// • Security: rootless containers, read-only FS, drop CAP_NET_RAW, scan images, sign (cosign).
// • Cost: right-size nodes, autoscale (HPA/VPA), use zstd for fast backups.
// • Incident quick kit:
//   - kubectl get events --sort-by=.lastTimestamp | tail -n 50
//   - kubectl describe pod <pod>; kubectl logs <pod> -p
//   - journalctl -u docker -f / containerd -f
//   - ss -lntp | grep ':80\|:443\|:3000'
//
// ------------------------------------------------------------
// G. One-Page Deploy Flow (Dev → Prod)
// ------------------------------------------------------------
// 1) Commit → CI: test, lint, build image, scan, push to registry.
// 2) CD: helm upgrade --install myapp ... (values per env).
// 3) Verify: kubectl rollout status, probes healthy, logs clean.
// 4) Observe: Prometheus SLOs, alerts green, Grafana dashboards OK.
// 5) Traffic shift: canary 10% → 50% → 100% (if needed).
// 6) Post-deploy checks: error budgets, 95/99p latency, logs noise.
// 7) Rollback path ready: helm rollback / kubectl rollout undo.
//
// End of Section 11.
// Want a ready-to-run demo stack (docker-compose) with Nginx + app + Prometheus + Grafana?
// ============================================================



//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// types of hypervisors:
// 1. Type 1 (bare-metal): runs directly on hardware (e.g., VMware ESXi, Microsoft Hyper-V).
// 2. Type 2 (hosted): runs on top of an existing OS (e.g., VirtualBox, VMware Workstation).

// # root user
// The root user is the superuser in Unix/Linux systems with full control over the system.
// It can perform any action, including modifying system files, changing permissions, and managing users.
// Use with caution; avoid using root for daily tasks to minimize security risks.


// # sudo
// The `sudo` command allows a permitted user to execute a command as the superuser or another user.
// It stands for "superuser do" and is used to perform administrative tasks without logging in as root.
// Example: `sudo apt update` runs the `apt update` command with root privileges.
// Configure `/etc/sudoers` to manage permissions and security policies for `sudo` usage.

// command options arguments
// - Options modify the behavior of a command (e.g., `-l` for listing, `-v` for verbose).
// - Arguments are the inputs to the command (e.g., file names, user names).
// Example: `ls -l /home/user` where `-l` is an option and `/home/user` is an argument





//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////