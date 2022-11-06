## Necesario ejecutar docker
## VARIABLES ESTANDAR
NODE_ENV=develop

echo "================== Build =================="
sam build -c -p

echo "================== Start API =================="
sam local start-api --parameter-overrides Environment=$NODE_ENV --profile sc-nonprod --region us-east-1 -n ./scripts/localenvs.json