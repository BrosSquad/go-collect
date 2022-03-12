SERVER_PROTOFILES := $(shell find ./proto -iname "*.proto")

.PHONY: protoc-go
protoc-go:
	@echo $(SERVER_PROTOFILES)
	@mkdir -p backend/pb
	@protoc -Iproto \
		--go_out=paths=source_relative:backend/pb \
		--go-grpc_out=paths=source_relative:backend/pb \
		$(SERVER_PROTOFILES)

# TODO: Change Path
.PHONY: protoc-js-web
protoc-js-web:
	@mkdir -p js/
	@protoc -Iproto \
		--js_out=import_style=commonjs:js \
		--grpc-web_out=import_style=typescript,mode=grpcweb:js \
		$(SERVER_PROTOFILES)
