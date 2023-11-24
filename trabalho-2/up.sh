#!/bin/bash

docker compose down

docker volume prune -f

docker stop $(docker ps -a -q)

docker rm -f $(docker ps -a -q)

sudo rm -rf ./.docker

docker compose up -d

sleep 30

hosts_file_path="/etc/hosts"
temp_dir="/tmp"
temp_hosts_file_path="$temp_dir/hosts_temp"

if [ ! -d "$temp_dir" ]; then
  mkdir -p "$temp_dir"
fi

if ! grep -q "127.0.10.1\s*elc137-t2-database-1" "$hosts_file_path"; then
  cat "$hosts_file_path" > "$temp_hosts_file_path"
  echo "127.0.10.1 elc137-t2-database-1" >> "$hosts_file_path"
  cat "$temp_hosts_file_path" > "$hosts_file_path"
  rm "$temp_hosts_file_path"
fi

if ! grep -q "127.0.10.2\s*elc137-t2-database-2" "$hosts_file_path"; then
  cat "$hosts_file_path" > "$temp_hosts_file_path"
  echo "127.0.10.2 elc137-t2-database-2" >> "$hosts_file_path"
  cat "$temp_hosts_file_path" > "$hosts_file_path"
  rm "$temp_hosts_file_path"
fi

if ! grep -q "127.0.10.3\s*elc137-t2-database-3" "$hosts_file_path"; then
  cat "$hosts_file_path" > "$temp_hosts_file_path"
  echo "127.0.10.3 elc137-t2-database-3" >> "$hosts_file_path"
  cat "$temp_hosts_file_path" > "$hosts_file_path"
  rm "$temp_hosts_file_path"
fi

docker exec -it elc137_t2_database_1 mongosh --eval "rs.initiate({_id:'elc137-t2-database-replica-set',version:1,members:[{_id:1,host:'elc137-t2-database-1:27017',priority:3},{_id:2,host:'elc137-t2-database-2:27017',priority:2},{_id:3,host:'elc137-t2-database-3:27017',priority:1}]},{force:true});rs.status();"
