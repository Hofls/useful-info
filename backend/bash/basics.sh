#!/bin/bash

# Data types
count=5
weight=3.5
message="Hello world"
isReady=true

# Variable in string
userName="John"
echo "Hello $userName"

# Collections (arrays)
list=()
list+=("Hey")
[[ ${list[@]} =~ "Hey" ]] && echo "Hey is in the list"

# Associative arrays (similar to maps)
declare -A map
map[23]="John"
echo "${map[23]}"

# Null safety
name=""
if [[ -n "$name" ]]; then
    echo "$name" # Won't be printed
fi

# Functions
multiply() {
    number=$1
    echo $(($number * 3))
}

result=$(multiply 2)
echo Function output = $result

# Conditions
# (&&, ||, !); (==, !=);
if [[ 7 > 4 ]]; then
    echo "A"
else
    echo "B"
fi

# Cycles
users=("Alice" "Bob" "Carol")
for user in "${users[@]}"; do
    echo "$user"
done

for i in $(seq 1 5);
do
    echo $i
done

# Anonymous class / JSON object (using associative arrays)
declare -A status=( [id]=23 [message]="Wrong connection" )
status[debugMessage]='NUM - 81723'
echo "${status[message]}"
echo "${status[debugMessage]}"

# Run code in parallel
write() {
    local text=$1
    local delay=$2
    sleep "$delay"
    echo "$text"
}
write "World!" 0.5 &
write "Hello" 0.4 &
wait


