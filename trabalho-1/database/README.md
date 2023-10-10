# Database

## Realizar backup

```bash
docker exec -it elc137_t1_database sh

mongodump --uri="mongodb://root:root@localhost:27017/elc137t1db?authSource=admin&readPreference=primary" --collection="sales" --out="./data/db/backups"

# transferir backups (Administrator: Windows PowerShell)
robocopy ..\.docker\elc137-t1-database\backups .\backups /e /j /copyall /dcopy:date /is /it /im

# transferir backups (Linux)
cp -r ../.docker/elc137-t1-database/backups ./backups

# excluir backups temporários (Administrator: Windows PowerShell)
Remove-Item -Recurse -Confirm:$false ..\.docker\elc137-t1-database\backups

# excluir backups temporários (Linux)
rm -rf ../.docker/elc137-t1-database/backups
```

## Restaurar backup

```bash
docker exec -it elc137_t1_database sh

mongorestore --nsInclude 'elc137t1db.*' --username root --password root --drop ./data/db/backups/
```
