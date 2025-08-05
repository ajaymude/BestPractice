// ==============================================================================
// Networking & Protocols – Detailed Syllabus WITH EXPLANATIONS
// ------------------------------------------------------------------------------
// HOW TO USE THESE NOTES:
// • Treat each numbered block as a mini-module.
// • Read top-down; practice labs at the end of every module.
// • ⭐ marks a term or concept you should definitely be able to *define* aloud.
// ==============================================================================


// 1️⃣  FOUNDATIONS OF COMPUTER NETWORKING
//   • ⭐ What is a network? → A collection of two or more devices (hosts) linked
//     together so they can exchange data and share resources. Key goals:
//       – Connectivity (reach any host)  – Resource sharing (printers, files)
//       – Scalability (add devices/users without redesign)
//   • ⭐ Network types:              PURPOSE / TYPICAL RANGE
//       PAN  – Personal (Bluetooth headset)   | < 10 m
//       LAN  – Office / home Ethernet Wi-Fi   | < 1 km
//       WLAN – LAN but wireless (802.11)      | < 100 m per AP
//       CAN  – Campus (university)            | a few km
//       MAN  – Metro (city-wide Wi-Fi, rings) | 5-50 km
//       WAN  – Country/continent (ISP core)   | 100+ km
//       GAN  – Global (public Internet)       | worldwide
//       SAN  – Storage-centric FibreChannel   | datacenter fabric
//   • Devices:  SWITCH (L2, MAC-based) │ HUB (L1 repeater, obsolete)
//                ROUTER (L3, forwards IP) │ BRIDGE (legacy L2, 2 ports)
//   • Metrics:
//       Bandwidth → max *capacity* in bits/s
//       Latency   → delay; prop + serialization + queuing
//       Throughput→ actual achieved rate given protocol overhead
//       Jitter    → variation in packet delay (hurts voice/video)
//   • Addressing paradigms:
//       Unicast  = one-to-one  │ Broadcast = one-to-all (same subnet)
//       Multicast= one-to-many │ Anycast   = one-to-nearest (CDN, DNS)


// 2️⃣  REFERENCE MODELS
//   • ⭐ OSI 7-Layer ← conceptual model to standardize functions.
//       L1 Physical → bits on wire        L5 Session → checkpoints
//       L2 Data-Link → frames, MAC        L6 Presentation → syntax/SSL
//       L3 Network   → packets, IP        L7 Application → HTTP, SMTP
//       L4 Transport → segments, ports
//   • TCP/IP 4-Layer merges:  (Link)-(Internet)-(Transport)-(App).
//     Real hardware / OS stacks are based on this.
//   • Encapsulation workflow:
//       App data → add L7 hdr → add L4 (TCP) hdr → add L3 (IP) hdr
//       → add L2 (Ethernet) hdr+FCS → transmit bits at L1.
//     Decapsulation happens in reverse at receiver.


// 3️⃣  PHYSICAL LAYER (L1)
//   • Copper cabling categories:
//       Cat5e (1000 Mb @100 m)  Cat6 (10 Gb @55 m)  Cat6a (10 Gb @100 m)
//   • Fiber:
//       SMF = single-mode, 1310/1550 nm lasers, long reach (km–100 km)
//       MMF = multi-mode, LEDs/VCSEL, cheaper, up to 400 m
//       Connectors: LC, SC, MPO.
//   • Signalling terms:
//       Voltage level or light power encodes binary; *encoding* schemes
//       like NRZ or Manchester embed clock to aid sync.
//   • Ethernet PHY standards examples:
//       10BASE-T (10 Mb, coax->twisted pair) | 1000BASE-LX (Gig fiber)
//       10GBASE-SR (10 Gb MMF, “short reach”) | PoE (deliver power @48 V)
//   • Cable testing:
//       Use TDR to verify pinout & length; crimp RJ45 using 568B standard.


// 4️⃣  DATA-LINK LAYER (L2)
//   • ⭐ MAC address: 48-bit, first 24 bits = OUI vendor prefix.
//   • Ethernet frame fields: Preamble | Dest MAC | Src MAC | EtherType |
//     Payload (46-1500 B) | FCS.  MTU default 1500 B.
//   • Switching logic: switch builds CAM (MAC-to-port) table by learning
//     src-MAC of incoming frames; floods unknown unicast & broadcast.
//   • VLAN (802.1Q) tag adds 4 B with VLAN ID (0-4095); trunks carry many
//     VLANs across a single link.
//   • STP (Spanning Tree) blocks redundant links to prevent L2 loops;
//     RSTP (802.1w) converges faster; MSTP groups VLANs into regions.
//   • Address Resolution Protocol (ARP) maps IPv4 → MAC.  Gratuitous ARP
//     advertises change; RARP legacy maps MAC→IP for diskless boots.
//   • Link Aggregation (LACP 802.3ad) bonds multiple physical links into
//     one logical port-channel (higher bandwidth + redundancy).


// 5️⃣  NETWORK LAYER (L3)
//   • IPv4 addressing:
//       Class A (1.0.0.0/8)... but *classless* CIDR is used today.
//       Private: 10/8, 172.16/12, 192.168/16.  Subnetting via CIDR mask.
//   • Subnetting calc: /26 → 64 addresses, 62 usable hosts.  VLSM allows
//     varied-sized subnets; supernetting aggregates summaries (/15 etc).
//   • IPv6 syntax: 2001:db8::/32.  Types = Unicast, Multicast, Anycast,
//     Link-local fe80::.  SLAAC auto-config, ND replaces ARP.
//   • ICMP uses Type/Code; ping = Echo (8/0).  Traceroute sees Time-exceeded.
//   • Dynamic routing protocols:
//       RIP (distance-vector, hop count) – legacy
//       OSPF (link-state, SPF algorithm) – uses areas, LSDB
//       IS-IS (link-state, CLNS heritage) – common in telcos
//       EIGRP (Cisco proprietary hybrid) – DUAL algorithm
//       BGP – path-vector, policy control of Internet routes.
//   • Multicast groups 224.0.0.0/4, clients join via IGMP; routers forward
//     via PIM dense/sparse mode.
//   • NAT translates private→public; PAT overloads many ports on one IP.
//   • DHCP DORA: Discover → Offer → Request → Ack.  DNS records: A, AAAA,
//     CNAME, MX, TXT, SRV, PTR.


// 6️⃣  TRANSPORT LAYER (L4)
//   • Ports: 0-1023 = well-known (HTTP 80, HTTPS 443); 1024-49 151 = registered;
//     49 152-65 535 = ephemeral.
//   • ⭐ TCP handshake: SYN → SYN/ACK → ACK.  Teardown: FIN/ACK 4-way.
//     Flags: SYN, ACK, FIN, RST, PSH, URG, ECE, CWR.
//     Congestion ctrl: Tahoe, Reno (fast-retransmit), BIC, CUBIC (Linux).
//   • UDP header only 8 B (SrcPort, DstPort, Length, Checksum) – no reliability.
//   • SCTP supports multistream & multihoming; used by telecom SIGTRAN.
//   • QUIC runs over UDP, encrypts transport headers, enables 0-RTT resume.


// 7️⃣  APPLICATION LAYER
//   • HTTP evolution:
//       HTTP/1.1 – text, one request per TCP pipeline w/ keep-alive.
//       HTTP/2  – binary frames, multiplexes streams, HPACK header compression.
//       HTTP/3  – runs atop QUIC, eliminates head-of-line blocking.
//       HTTPS = HTTP + TLS → Confidentiality + Integrity + Auth.
//   • Email flow: MUA → SMTP → MTA.  POP3 pulls, IMAP syncs.  MIME encodes
//     attachments.  SPF & DKIM & DMARC fight spoofing.
//   • FTP (port 21 control, 20 data) active/passive, FTPS adds TLS,
//     SFTP = SSH file subsystem, TFTP = UDP simple boot images.
//   • SSH uses Diffie-Hellman key exchange; Telnet sends plaintext (legacy).
//   • LDAP (directory tree of DNs), Kerberos (ticket-granting), RADIUS/TACACS+
//     for AAA (authentication, authorization, accounting).
//   • RTP carries media; RTCP gives QoS stats.  SIP sets up VoIP sessions;
//     WebRTC = peer-to-peer media in browsers (STUN/TURN traversal).
//   • MQTT (publish-subscribe), CoAP (REST for IoT), AMQP (brokered queues),
//     XMPP (chat), gRPC (HTTP/2 binary RPC).


// 8️⃣  ROUTING & SWITCHING DEEP DIVE
//   • Layer-3 switch = ASIC that routes at wire-speed within campus LAN.
//   • Gateway redundancy: HSRP (Cisco), VRRP (open), GLBP (load-balancing).
//   • Policy-based routing forces packets to take non-default path
//     based on ACLs, DSCP, etc.
//   • MPLS: inserts 32-bit label between L2 and L3; routers (LSRs) forward
//     by label, enabling traffic-engineering, VPNs, fast-reroute.


// 9️⃣  NETWORK DESIGN & TOPOLOGIES
//   • Physical topologies define cabling; logical defines data flow.
//   • Hierarchical campus: Access (edge switches) → Distribution (L3 agg)
//     → Core (fast backbone).  Enhances scalability & troubleshooting.
//   • Summarization reduces routing table size (e.g., advertise /16 instead
//     of many /24s).
//   • High-availability: N+1 redundant hardware, dual power, link bundles,
//     VRRP pairs, clustering firewalls.


// 🔟  WIRELESS & MOBILE
//   • Wi-Fi standards: 802.11n (MIMO, 2.4/5 GHz) → 11ac (wave2 MU-MIMO)
//     → 11ax Wi-Fi 6/6E (OFDMA, 6 GHz) → 11be Wi-Fi 7 (320 MHz channels).
//   • Security levels: WEP (broken) < WPA < WPA2 (AES) < WPA3 (SAE, 192-bit).
//   • 802.11r fast-transition lets clients roam APs with <50 ms dropout.
//   • LTE EPC nodes: eNodeB → S-GW → P-GW; 5G adds gNB, UPF; slices isolate
//     traffic for IoT, URLLC, eMBB services.
//   • Bluetooth (FHSS 2.4 GHz), Zigbee (low-power mesh), LoRaWAN (long range
//     868/915 MHz), Thread (IPv6 mesh).  Use-cases: sensors, wearables.


// 1️⃣1️⃣  NETWORK SECURITY
//   • DoS = flood resource; DDoS = distributed.  MITM intercepts traffic.
//     Spoofing fakes IP/MAC; sniffing captures packets; replay reuses auth.
//   • Crypto: symmetric (AES) faster, asymmetric (RSA, ECC) for key exchange;
//     Hashes (SHA-256) ensure integrity; signatures = hash encrypted by
//     sender’s private key.
//   • VPN modes: IPSec ESP tunnel vs transport; SSL VPN uses TLS.
//   • Firewalls progress: stateless filters → stateful inspection → NGFW
//     (app-layer, IPS, threat intel) → UTM (bundle of security features).
//   • IDS = detect; IPS = detect + block.  SIEM correlates logs.  Zero-Trust
//     treats every session as hostile; micro-segmentation with host-based ACLs.


// 1️⃣2️⃣  MONITORING & TROUBLESHOOTING
//   • SNMP v2c (community string) vs v3 (auth+privacy).  NETCONF/RESTCONF for
//     config, but NetFlow/IPFIX export flow records; sFlow samples packets.
//   • Syslog severities 0-7 (Emerg-Debug).  Central collectors simplify audits.
//   • Tool tips:
//       ping → reachability  | traceroute → hop path
//       MTR → real-time latency & loss | iperf → throughput
//       nslookup/dig → DNS query | tcpdump/Wireshark → deep packet
//       nmap → host/port scan | netstat/ss → socket state
//   • QoS workflow: classify (ACL/DSCP), mark, police (drop/remark),
//     shape (buffer excess), queue (CBWFQ), prioritize (LLQ).


// 1️⃣3️⃣  DATA-CENTER & CLOUD
//   • Leaf-Spine: every leaf switch uplinks to every spine – low, predictable
//     latency and ECMP load-balance.
//   • Overlays put logical L2/L3 atop IP underlay; VXLAN uses UDP 4789 & 24-bit
//     VNIs, EVPN carries MAC/IP mapping over BGP control-plane.
//   • SDN separates control plane (controller) from data plane (switch ASIC).
//     OpenFlow programs flow tables; ACI/Contrail provide policy abstractions.
//   • SD-WAN picks best tunnel (MPLS, Internet, LTE) per app SLA, centrally
//     managed via orchestrator.
//   • Load-balancer tiers: L4 (TCP/UDP mux) vs L7 (HTTP parsing, cookies).
//     Envoy sidecar powers service meshes (Istio) for mTLS, traffic shifting.
//   • Container networking: CNI plugins attach pod veth to bridge/overlay;
//     Calico uses BGP, Flannel ICN, Cilium eBPF datapath.


// 1️⃣4️⃣  VOICE & REAL-TIME
//   • Codec trade-off: G.711 (64 kbps, no compression) vs Opus (6-510 kbps,
//     adaptable, used by WebRTC).
//   • SIP INVITE → 200 OK → ACK sets up session; SDP carries media params.
//   • DSCP EF (46) for voice, AF41-43 for video.  Strict-priority queues keep
//     jitter < 30 ms.
//   • Platforms: Cisco CUCM, Microsoft Teams, Zoom, WebEx unify voice/video/chat.


// 1️⃣5️⃣  EMERGING & FUTURE
//   • 6G aims ≥1 Tb/s, sub-THz, AI-native RAN, integrated sensing.
//   • LEO constellations bring <40 ms RTT global broadband.
//   • SASE merges SD-WAN + cloud security (CASB, SWG, ZTNA) as edge PoPs.
//   • Network automation stacks:
//       – Ansible (YAML playbooks, SSH/NETCONF)  – Nornir (Python inventory)
//       – Netmiko (paramiko wrappers)            – gNMI/YANG gRPC streaming.
//   • Intent-Based Networking: operator states *what* (intent), controller
//     computes *how* and verifies via telemetry.
//   • AIOps: ML models detect anomalies, predict failures, auto-tune QoS.


// 1️⃣6️⃣  HANDS-ON LABS – DO THESE! 🚀
//   1. Wireshark: Capture `tcp.handshake` filter, label SYN/SYN-ACK/ACK.
//   2. Subnet drill: design /29 LAN, list .0 network, .7 broadcast, .1-.6 hosts.
//   3. STP: Build two switches + redundant link in Packet Tracer, observe
//      Root Port, blocked port; disable STP to watch broadcast storm!
//   4. GNS3: Configure OSPF area 0 and area 10; shut link, note reconvergence.
//   5. NGINX LB: upstream backend { server app1; server app2; } and test curl.
//   6. `openssl s_client -connect example.com:443` → decode TLS handshake steps.
//   7. Mininet: sudo mn --topo single,3 --controller remote; write a POX app
//      to drop FTP traffic, observe with iperf.

// ------------------------------------------------------------------------------
// ⭐ MASTER TIP: Reading RFCs may seem dry, but skim the "Terminology", "Operation"
//   and "Security Considerations" sections to grasp essentials quickly.
// ==============================================================================
