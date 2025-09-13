
# 📘 BASICS & SETUP
# 01 - What is Python and why use it?
# 02 - Installing Python: Windows, macOS, Linux (official installers, package managers)
# 03 - Python versions: CPython vs PyPy vs Anaconda, understanding version compatibility
# 04 - Setting up a development environment: PATH configuration, pip, venv
# 05 - Using the Python REPL (read-eval-print loop), basic commands
# 06 - Writing and running .py scripts: python my_script.py, shebang (#!/usr/bin/env python3)
# 07 - Interactive environments: IPython, Jupyter Notebook, JupyterLab
# 08 - Package management: pip, pipenv, poetry, conda (creating and activating virtual environments)
# 09 - Understanding PEP 8 style guide: naming conventions, indentation, line length, imports
# 10 - Introduction to IDEs and editors: VSCode, PyCharm, Sublime Text, configuring linters/formatters


##################################################################
##################################################################

# ===============================================
# 01 - What is Python and why use it?
# ===============================================

# 🔹 Python is a high-level, interpreted, general-purpose programming language
# created by Guido van Rossum and released in 1991.

# 🔹 It emphasizes code readability with its use of indentation rather than brackets.

# ✅ KEY FEATURES OF PYTHON:
# --------------------------
# 1. Easy to Read & Write: Syntax is clean and concise.
# 2. Interpreted Language: Executes code line-by-line (no need to compile).
# 3. Dynamically Typed: No need to declare variable types explicitly.
# 4. High-level Language: Easy to understand and closer to human languages.
# 5. Portable: Write once, run anywhere (cross-platform support).
# 6. Extensive Standard Library: Built-in modules for OS, math, file I/O, etc.
# 7. Large Ecosystem: Many third-party packages available (via pip/PyPI).
# 8. Open Source: Free to use and distribute, with active community support.
# 9. Object-Oriented & Functional: Supports both programming paradigms.
# 10. Used for Prototyping: Quick to test and build applications.

# 📦 COMMON USE CASES:
# --------------------
# - Web Development (e.g., Flask, Django)
# - Data Science and Visualization (e.g., pandas, matplotlib)
# - Machine Learning and AI (e.g., scikit-learn, TensorFlow)
# - Automation and Scripting (e.g., selenium, os)
# - Desktop GUI (e.g., tkinter, PyQt)
# - Game Development (e.g., pygame)
# - Cybersecurity and Penetration Testing (e.g., scapy, pwntools)
# - Embedded Systems (e.g., MicroPython)
# - Mobile Development (e.g., Kivy, BeeWare)

# 🧠 WHY LEARN PYTHON?
# ---------------------
# - Beginner-friendly and widely taught as a first programming language
# - Rapid application development and prototyping
# - High demand in the job market
# - Excellent community support and learning resources
# - Versatile enough for multiple domains and technologies


##################################################################
##################################################################

# ======================================================
# 02 - Installing Python: Windows, macOS, Linux
# ======================================================

# 🔹 Python is available for all major operating systems:
#    - Windows
#    - macOS
#    - Linux

# ✅ WINDOWS INSTALLATION:
# 1. Visit the official site: https://www.python.org/downloads/
# 2. Download the latest version for Windows.
# 3. Run the installer:
#    - IMPORTANT: Check the box "Add Python to PATH"
#    - Choose "Install Now" or "Customize Installation"
# 4. After installation, verify it:
#    👉 Open Command Prompt and run:
#       python --version
#       pip --version

# ✅ macOS INSTALLATION:
# Option 1: Official installer
# - Download `.pkg` from https://www.python.org/downloads/
# - Run the installer and follow steps
# - Verify in terminal:
#     python3 --version
#     pip3 --version

# Option 2: Using Homebrew (Recommended)
# - Run in Terminal:
#     brew install python
# - Verify:
#     python3 --version
#     pip3 --version

# ✅ LINUX INSTALLATION (Ubuntu/Debian):
# Python is usually pre-installed.
# To update or install manually:
# - Update packages:
#     sudo apt update
# - Install:
#     sudo apt install python3 python3-pip
# - Verify:
#     python3 --version
#     pip3 --version

# 🧠 NOTES:
# - Use `python` or `python3` depending on system configuration.
# - Use `pip` or `pip3` to install Python packages.
# - For managing multiple Python versions: use `pyenv`, `conda`, or virtual environments.
# - Python 2 is obsolete. Always install Python 3 (latest stable).

# 🔸 Example: Check installed version
import sys
print(sys.version)  # Prints the currently installed Python version


##################################################################
##################################################################


# ============================================================
# 03 - Python Versions: CPython vs PyPy vs Anaconda
# ============================================================

# 🔹 Python comes in multiple implementations, all conforming to the same language spec,
#    but with different performance, use cases, and compatibility.

# ✅ CPython (Default and Official)
# -------------------------------
# - Written in C.
# - It is the reference implementation of Python.
# - Most widely used and supported.
# - Compatible with almost all Python libraries and packages.
# - Recommended for general use, especially if you're a beginner.

# ✅ PyPy (Fast Python with JIT Compilation)
# -----------------------------------------
# - Written in RPython (a subset of Python).
# - Uses Just-In-Time (JIT) compilation to speed up Python code.
# - Often 4–10x faster than CPython for long-running programs.
# - Not all CPython packages are compatible (especially C extensions like NumPy).
# - Best for CPU-bound tasks where speed is critical.

# ✅ Anaconda (For Data Science & Scientific Computing)
# -----------------------------------------------------
# - A Python distribution that comes with Python + many data science packages pre-installed.
# - Includes Jupyter Notebook, pandas, NumPy, matplotlib, scikit-learn, etc.
# - Comes with `conda`, its own environment and package manager.
# - Great for data analysis, ML, and academic use.
# - Larger in size (~400MB+), but avoids manual installs.

# ✅ Version Compatibility Tips
# ----------------------------
# - Always use the latest **stable** version of Python (e.g., 3.12+).
# - Avoid using deprecated Python 2.x (EOL in Jan 2020).
# - Check third-party library documentation for supported Python versions.
# - Use virtual environments to isolate different project versions.

# 🧠 Good Practices:
# - Use `python --version` to check.
# - Use `venv` or `conda` for per-project environments.
# - Use `pyenv` or `conda` to switch between Python versions safely.

# 🔸 Example: Get implementation and version info
import platform
print(platform.python_implementation())  # e.g., CPython
print(platform.python_version())         # e.g., 3.12.1

##################################################################
##################################################################

# =======================================================================
# 04 - Setting up a Development Environment: PATH Configuration, pip, venv
# =======================================================================

# 🔹 A good Python development environment helps you run code, install packages,
# and manage dependencies cleanly for each project.

# ✅ 1. PATH Configuration
# -------------------------
# - PATH is an environment variable that tells your system where to find executables.
# - During Python installation, check "Add Python to PATH" to make `python` and `pip` available globally.
# - To verify:
#     👉 Windows: echo %PATH%
#     👉 macOS/Linux: echo $PATH
# - To check Python and pip are in path:
#     python --version
#     pip --version

# ✅ 2. pip – Python Package Installer
# ------------------------------------
# - pip is used to install external libraries from PyPI.
# - Basic commands:
#     pip install package_name
#     pip uninstall package_name
#     pip list                  # List installed packages
#     pip freeze > requirements.txt    # Export dependencies
#     pip install -r requirements.txt  # Install from file

# ✅ 3. venv – Creating Virtual Environments
# ------------------------------------------
# - venv allows isolated Python environments per project.
# - Prevents dependency conflicts between projects.

# 🔸 Steps to create and use venv:
# 1. Create a virtual environment:
#     python -m venv env_name

# 2. Activate the environment:
#     👉 Windows: env_name\\Scripts\\activate
#     👉 macOS/Linux: source env_name/bin/activate

# 3. Deactivate:
#     deactivate

# 4. Now use `pip` inside the environment to install packages for that project only.

# 🧠 TIPS:
# - Always use a virtual environment for every project.
# - Never install libraries globally unless necessary.
# - You can have different Python versions managed using `pyenv` or `conda` if needed.

# 🔸 Example: Create and use a virtual environment
import os
print("Current working directory:", os.getcwd())

##################################################################
##################################################################


# =========================================================
# 05 - Using the Python REPL (Read-Eval-Print Loop)
# =========================================================

# 🔹 REPL stands for:
#     🔸 Read – Reads the user input (expression)
#     🔸 Eval – Evaluates the expression
#     🔸 Print – Prints the result
#     🔸 Loop – Repeats the process

# ✅ WHAT IS THE PYTHON REPL?
# ----------------------------
# - It’s an interactive shell to run Python code one line at a time.
# - Useful for testing, debugging, exploring built-in functions or syntax quickly.

# ✅ HOW TO START REPL:
# ---------------------
# - Open terminal or command prompt
# - Type:
#     python        # or python3 if required
# - You’ll see the prompt:
#     >>>

# ✅ BASIC COMMANDS YOU CAN TRY:
# ------------------------------
# - Math: 2 + 2
# - Print text: print("Hello")
# - Variable assignment: name = "Ajay"
# - Function definition:
#     def add(a, b): return a + b
# - Use built-in functions: len(), type(), help()

# ✅ EXITING THE REPL:
# --------------------
# - Use:
#     exit()
#     quit()
#     Or press Ctrl + Z (Windows) or Ctrl + D (macOS/Linux) and hit Enter

# 🧠 USE CASES OF REPL:
# ---------------------
# - Quick testing of expressions
# - Learning and exploring Python interactively
# - Trying out new libraries or syntax

# ✅ Enhanced REPLs:
# ------------------
# - IPython: An advanced REPL with autocomplete, syntax highlighting, etc.
# - bpython: Lightweight alternative with visual history and suggestions

# 🔸 Example: Run and evaluate expressions in REPL (demo code)
print("2 + 3 =", 2 + 3)
name = "Python"
print("Hello", name)

##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################
##################################################################