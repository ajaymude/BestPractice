#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────────────────────
# Shell Scripting 101: a script illustrating all the basics in one place
# ──────────────────────────────────────────────────────────────────────────────

# 1. Variables & Positional Parameters
GREETING="Hello, Shell!"
NAME=${1:-"World"}      # Use first argument or default to “World”
echo "$GREETING, $NAME!"

# 2. Reading User Input
read -p "Enter your age: " AGE
echo "You are $AGE years old."

# 3. Conditional Statements
if (( AGE >= 18 )); then
  echo "You are an adult."
elif (( AGE >= 13 )); then
  echo "You are a teenager."
else
  echo "You are a child."
fi

# 4. for-Loop
for i in {1..5}; do
  echo "for-loop iteration: $i"
done

# 5. while-Loop
COUNT=1
while [ $COUNT -le 3 ]; do
  echo "while-loop count: $COUNT"
  ((COUNT++))
done

# 6. Functions
function greet() {
  local person=$1
  echo "Function greet(): Hi, $person!"
}
greet "Alice"

# 7. case Statement
read -p "Choose action (start|stop|status): " ACTION
case $ACTION in
  start)  echo "Starting service...";;
  stop)   echo "Stopping service...";;
  status) echo "Service status: OK";;
  *)      echo "Unknown action.";;
esac

# 8. Arrays
FRUITS=("Apple" "Banana" "Cherry")
echo "First fruit: ${FRUITS[0]}"
for fruit in "${FRUITS[@]}"; do
  echo "Array element: $fruit"
done

# 9. Arithmetic Operations
NUM1=10; NUM2=3
echo "Sum:      $((NUM1 + NUM2))"
echo "Product:  $((NUM1 * NUM2))"
echo "Quotient: $((NUM1 / NUM2)), Remainder: $((NUM1 % NUM2))"

# 10. File Test & I/O Redirection
FILE="example.txt"
echo "This is a sample line." > "$FILE"
if [ -f "$FILE" ]; then
  echo "$FILE exists and has $(wc -l < "$FILE") line(s)."
fi

# 11. Command Substitution & Piping
DATE=$(date '+%Y-%m-%d')
echo "Today's date: $DATE"
echo -e "lowercase to UPPERCASE" | tr '[:lower:]' '[:upper:]'

# 12. Checking Exit Codes
grep "root" /etc/passwd &> /dev/null
if [ $? -eq 0 ]; then
  echo "User 'root' found in /etc/passwd."
else
  echo "User 'root' NOT found."
fi
# ──────────────────────────────────────────────────────────────────────────────
# End of examples – explore, modify, and run piece by piece to see each in action!
# ──────────────────────────────────────────────────────────────────────────────
