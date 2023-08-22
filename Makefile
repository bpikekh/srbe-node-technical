start-dev-reboot: 
	docker-compose down -v \
	&& docker-compose up --build

start-dev: 
	docker-compose up --build

run-sync:
	curl --location --request POST 'http://localhost:3001/sync-procedure-mappings'

get-mappings:
	curl --location --request GET 'http://localhost:3001/procedure-mappings'

procedure_identifier ?=
get-encounters:
	curl --location --request GET  'http://localhost:3001/encounters?procedure_identifier=$(procedure_identifier)'
