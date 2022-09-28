DB_USER_NAME="XXXXXXXX"
DB_USER_PASSWORD="XXXXXXXX"
SRC_DIR="/app/src"
CONTAINER_NAME="sample-mysql"

# データベースを作成する
create-database:
	docker exec -it $(CONTAINER_NAME) sh -c "mysql -u$(DB_USER_NAME) -p$(DB_USER_PASSWORD) -e \"CREATE DATABASE IF NOT EXISTS DataPlatformApiRequestToRmqMapperSQL DEFAULT CHARACTER SET UTF8;\""
