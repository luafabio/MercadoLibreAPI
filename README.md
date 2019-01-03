# MercadoLibreAPI
API desarrollada como parte del proceso de seleccion de mercadolibre.

Documentacion en carpeta Docs/

Dominio de la APP (AWS)
http://18.223.151.97:3000/

Pasos de instalacion:

sudo apt-get install curl
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y build-essential
sudo apt install make 
apt install redis-tools

echo "Instalamos 'redis' (master y slave en los puertos 6380 y 6379 respectivamente)..."

cd /tmp
mkdir redis
cd redis/
wget http://download.redis.io/releases/redis-stable.tar.gz
tar xzf redis-stable.tar.gz
cd redis-stable
make
make install

docker pull redis

docker run --name redisMaster -d -p 6379:6379 redis
docker run --name redisSlave -d -p 6380:6379 redis


echo "Instalamos 'mysql'..."

apt-get install mysql-server

