# MercadoLibreAPI
API desarrollada como parte del proceso de seleccion de mercadolibre.

Documentacion en carpeta Docs/

Pasos de instalacion:

sudo apt-get install curl
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y build-essential

echo "Instalamos 'redis' (master y slave en los puertos 6380 y 6379 respectivamente)..."

cd /tmp
mkdir redis
cd redis/
wget http://download.redis.io/releases/redis-stable.tar.gz
tar xzf redis-stable.tar.gz
cd redis-stable
make
make install

REDIS_PORT=6379 \
REDIS_CONFIG_FILE=/etc/redis/6379.conf \
REDIS_LOG_FILE=/var/log/redis_6379.log \
REDIS_DATA_DIR=/var/lib/redis/6379 \
REDIS_EXECUTABLE=`command -v redis-server` ./utils/install_server.sh

REDIS_PORT=6380 \
REDIS_CONFIG_FILE=/etc/redis/6380.conf \
REDIS_LOG_FILE=/var/log/redis_6380.log \
REDIS_DATA_DIR=/var/lib/redis/6380 \
REDIS_EXECUTABLE=`command -v redis-server` ./utils/install_server.sh

service redis_6379 restart
service redis_6380 restart

echo "Instalamos 'mysql'..."

apt-get install mysql-server

