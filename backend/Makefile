PLATFORM ?= linux/arm64,linux/amd64
ENV ?= development
RACE ?= 0
DOCKER ?= 0
GOPATH ?= ${HOME}/go
APP_NAME ?= go-collect
VERSION ?= dev

DATABASE_URL="postgres://postgres:postgres@localhost:5432/go_collect?sslmode=disable&application_name=GoCollect&TimeZone=UTC"

.PHONY: run
run:
	@CXX=g++ CC=gcc go run ./main.go

.PHONY: build
build:
ifeq ($(ENV),production)
	@CGO_ENABLED=0 CXX=g++ CC=gcc go build -ldflags="-s -w -X 'main.Version=${VERSION}'" -o ./bin/$(APP_NAME) ./main.go
else ifeq ($(ENV),development)
	@CXX=g++ CC=gcc go build -o ./bin/$(APP_NAME) -gcflags "all=-N -l" ./main.go
else
	@echo "Target ${ENV} is not supported"
endif
	@cp ./config.example.yml bin/config.yml
	@cp ./go-collect.service bin/go-collect.service
	@cp ./docker-compose.yml bin/docker-compose.yml

.PHONY: zip
zip:
	@zip -r $(APP_NAME).zip bin/


.PHONY: test
test:
ifeq ($(RACE), 1)
	@CC=gcc CXX=g++ go test ./... -race -covermode=atomic -coverprofile=coverage.txt -timeout 5m
else
	@CC=gcc CXX=g++ go test ./... -covermode=atomic -coverprofile=coverage.txt -timeout 1m
endif


.PHONY: buildx
buildx:
	@docker buildx build --target production --build-arg APP_NAME=$(APP_NAME) --build-arg VERSION="$(VERSION)" --platform "$(PLATFORM)" -t "brossquad/$(APP_NAME):$(VERSION)" --file ./Dockerfile .

.PHONY: tidy
tidy:
	@rm -f go.sum
	@go mod tidy

.PHONY: clean
clean:
	@rm -rf ./bin

.PHONY: lint
lint:
	@golangci-lint run

.PHONY: fmt
fmt:
	@gofumpt -l -w .

# .PHONY: zip
# zip:
# 	@zip -r go-collect.zip bin/

.PHONY: install-migrate-cli
install-migrate-cli:
ifneq ($(findstring migrate,$(shell ls $(GOPATH)/bin)),migrate)
	@CC=gcc CXX=g++ cd $(HOME) && go install \
		-tags 'postgres sqlite3 mysql github file' \
		github.com/golang-migrate/migrate/v4/cmd/migrate@latest
endif

M_STEP ?= ""

.PHONY: migrate-down
migrate-down: install-migrate-cli
	@migrate -source file://$(shell pwd)/migrations -database $(DATABASE_URL) down $(M_STEP)

.PHONY: migrate
migrate: install-migrate-cli
	@migrate -source file://$(shell pwd)/migrations -database $(DATABASE_URL) up


M_NAME ?= ""

.PHONY: migration-create
migration-create: install-migrate-cli
	@migrate -database $(DATABASE_URL) create -dir ./migrations -seq -ext plsql $(M_NAME)

M_VERSION ?= ""

.PHONY: migration-force
migration-force: install-migrate-cli
	@migrate -database $(DATABASE_URL) -source file://$(shell pwd)/migrations force $(M_VERSION)
