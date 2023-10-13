# Database

```bash
docker exec -it elc137_t1_database_1 sh

mongodump --uri="mongodb://127.0.10.1:27017/elc137t1db" --collection="sales" --out="./data/db/backups"

# transferir backups (Administrador: Windows PowerShell)
robocopy ..\.docker\elc137-t1-database-1\backups .\backups /e /j /copyall /dcopy:date /is /it /im

# transferir backups (Linux)
cp -r ../.docker/elc137-t1-database-1/backups ./backups

# excluir backups temporários (Administrador: Windows PowerShell)
Remove-Item -Recurse -Confirm:$false ..\.docker\elc137-t1-database-1\backups

# excluir backups temporários (Linux)
rm -rf ../.docker/elc137-t1-database-1/backups
```

## Restaurar backup

```bash
docker exec -it elc137_t1_database_1 sh

mongorestore --nsInclude="elc137t1db.*" --drop ./data/db/backups/
```
