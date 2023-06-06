#!/bin/bash

json=$(cat "./sshfs.json")

mount() {
  for item in $(echo "$json" | jq -c '.items[]'); do
    host=$(echo "$item" | jq -r ".host")
    userName=$(echo "$item" | jq -r ".userName")
    remoteDirectory=$(echo "$item" | jq -r ".remoteDirectory")
    mountPoint=$(echo "$item" | jq -r ".mountPoint")
    IdentityFile=$(echo "$item" | jq -r ".IdentityFile")

    sshfs "$userName"@"$host":"$remoteDirectory" "$mountPoint" -o IdentityFile="$IdentityFile" -o idmap=user -o uid=$(id -u) -o gid=$(id -g)
    echo "successfully mounted $mountPoint"
  done
}

unmount() {
  for item in $(echo "$json" | jq -c '.items[]'); do
    mountPoint=$(echo "$item" | jq -r ".mountPoint")
    diskutil unmount "$mountPoint"
  done
}

if [ "$1" == "mount" ]; then
  mount
elif [ "$1" == "unmount" ]; then
  unmount
fi

