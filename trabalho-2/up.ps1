docker compose down

docker volume prune -f

Remove-Item -Recurse -Confirm:$false .\.docker

docker compose up -d

Start-Sleep -Seconds 30

$hostsFilePath = "$env:SystemRoot\System32\drivers\etc\hosts"
$tempDir = "C:\.temp"
$tempHostsFilePath = Join-Path -Path $tempDir -ChildPath "hosts_temp"

if (-not (Test-Path -Path $tempDir -PathType Container)) {
    New-Item -Path $tempDir -ItemType Directory
}

if (-not (Select-String -Path $hostsFilePath -Pattern "127.0.10.1\s+elc137-t1-database-1")) {
    Get-Content $hostsFilePath | Add-Content -Path $tempHostsFilePath
    Add-Content -Path $hostsFilePath -Value "127.0.10.1 elc137-t1-database-1"
    Copy-Item -Path $tempHostsFilePath -Destination $hostsFilePath -Force
    Remove-Item -Path $tempHostsFilePath
}

if (-not (Select-String -Path $hostsFilePath -Pattern "127.0.10.2\s+elc137-t1-database-2")) {
    Get-Content $hostsFilePath | Add-Content -Path $tempHostsFilePath
    Add-Content -Path $hostsFilePath -Value "127.0.10.2 elc137-t1-database-2"
    Copy-Item -Path $tempHostsFilePath -Destination $hostsFilePath -Force
    Remove-Item -Path $tempHostsFilePath
}

if (-not (Select-String -Path $hostsFilePath -Pattern "127.0.10.3\s+elc137-t1-database-3")) {
    Get-Content $hostsFilePath | Add-Content -Path $tempHostsFilePath
    Add-Content -Path $hostsFilePath -Value "127.0.10.3 elc137-t1-database-3"
    Copy-Item -Path $tempHostsFilePath -Destination $hostsFilePath -Force
    Remove-Item -Path $tempHostsFilePath
}

docker exec -it elc137_t1_database_1 mongosh --eval "rs.initiate({_id:'elc137-t1-database-replica-set',version:1,members:[{_id:1,host:'elc137-t1-database-1:27017',priority:3},{_id:2,host:'elc137-t1-database-2:27017',priority:2},{_id:3,host:'elc137-t1-database-3:27017',priority:1}]},{force:!0});rs.status();"
