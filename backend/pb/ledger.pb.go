// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.27.1
// 	protoc        v3.19.4
// source: ledger.proto

package pb

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type LedgerRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	EventId        uint64 `protobuf:"varint,1,opt,name=event_id,json=eventId,proto3" json:"event_id,omitempty"`
	ExchangeRateId uint64 `protobuf:"varint,2,opt,name=exchange_rate_id,json=exchangeRateId,proto3" json:"exchange_rate_id,omitempty"`
	Quantity       uint64 `protobuf:"varint,3,opt,name=quantity,proto3" json:"quantity,omitempty"`
}

func (x *LedgerRequest) Reset() {
	*x = LedgerRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_ledger_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *LedgerRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*LedgerRequest) ProtoMessage() {}

func (x *LedgerRequest) ProtoReflect() protoreflect.Message {
	mi := &file_ledger_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use LedgerRequest.ProtoReflect.Descriptor instead.
func (*LedgerRequest) Descriptor() ([]byte, []int) {
	return file_ledger_proto_rawDescGZIP(), []int{0}
}

func (x *LedgerRequest) GetEventId() uint64 {
	if x != nil {
		return x.EventId
	}
	return 0
}

func (x *LedgerRequest) GetExchangeRateId() uint64 {
	if x != nil {
		return x.ExchangeRateId
	}
	return 0
}

func (x *LedgerRequest) GetQuantity() uint64 {
	if x != nil {
		return x.Quantity
	}
	return 0
}

var File_ledger_proto protoreflect.FileDescriptor

var file_ledger_proto_rawDesc = []byte{
	0x0a, 0x0c, 0x6c, 0x65, 0x64, 0x67, 0x65, 0x72, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x05,
	0x6c, 0x6f, 0x67, 0x69, 0x6e, 0x22, 0x70, 0x0a, 0x0d, 0x4c, 0x65, 0x64, 0x67, 0x65, 0x72, 0x52,
	0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x19, 0x0a, 0x08, 0x65, 0x76, 0x65, 0x6e, 0x74, 0x5f,
	0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x04, 0x52, 0x07, 0x65, 0x76, 0x65, 0x6e, 0x74, 0x49,
	0x64, 0x12, 0x28, 0x0a, 0x10, 0x65, 0x78, 0x63, 0x68, 0x61, 0x6e, 0x67, 0x65, 0x5f, 0x72, 0x61,
	0x74, 0x65, 0x5f, 0x69, 0x64, 0x18, 0x02, 0x20, 0x01, 0x28, 0x04, 0x52, 0x0e, 0x65, 0x78, 0x63,
	0x68, 0x61, 0x6e, 0x67, 0x65, 0x52, 0x61, 0x74, 0x65, 0x49, 0x64, 0x12, 0x1a, 0x0a, 0x08, 0x71,
	0x75, 0x61, 0x6e, 0x74, 0x69, 0x74, 0x79, 0x18, 0x03, 0x20, 0x01, 0x28, 0x04, 0x52, 0x08, 0x71,
	0x75, 0x61, 0x6e, 0x74, 0x69, 0x74, 0x79, 0x42, 0x27, 0x5a, 0x25, 0x67, 0x69, 0x74, 0x68, 0x75,
	0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x42, 0x72, 0x6f, 0x73, 0x53, 0x71, 0x75, 0x61, 0x64, 0x2f,
	0x67, 0x6f, 0x2d, 0x63, 0x6f, 0x6c, 0x6c, 0x65, 0x63, 0x74, 0x2f, 0x70, 0x62, 0x3b, 0x70, 0x62,
	0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_ledger_proto_rawDescOnce sync.Once
	file_ledger_proto_rawDescData = file_ledger_proto_rawDesc
)

func file_ledger_proto_rawDescGZIP() []byte {
	file_ledger_proto_rawDescOnce.Do(func() {
		file_ledger_proto_rawDescData = protoimpl.X.CompressGZIP(file_ledger_proto_rawDescData)
	})
	return file_ledger_proto_rawDescData
}

var file_ledger_proto_msgTypes = make([]protoimpl.MessageInfo, 1)
var file_ledger_proto_goTypes = []interface{}{
	(*LedgerRequest)(nil), // 0: login.LedgerRequest
}
var file_ledger_proto_depIdxs = []int32{
	0, // [0:0] is the sub-list for method output_type
	0, // [0:0] is the sub-list for method input_type
	0, // [0:0] is the sub-list for extension type_name
	0, // [0:0] is the sub-list for extension extendee
	0, // [0:0] is the sub-list for field type_name
}

func init() { file_ledger_proto_init() }
func file_ledger_proto_init() {
	if File_ledger_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_ledger_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*LedgerRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_ledger_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   1,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_ledger_proto_goTypes,
		DependencyIndexes: file_ledger_proto_depIdxs,
		MessageInfos:      file_ledger_proto_msgTypes,
	}.Build()
	File_ledger_proto = out.File
	file_ledger_proto_rawDesc = nil
	file_ledger_proto_goTypes = nil
	file_ledger_proto_depIdxs = nil
}