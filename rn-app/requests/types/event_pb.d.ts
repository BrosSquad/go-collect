import * as jspb from 'google-protobuf'



export class ParticipantRequest extends jspb.Message {
  getUserId(): number;
  setUserId(value: number): ParticipantRequest;

  getEventId(): number;
  setEventId(value: number): ParticipantRequest;

  getStatus(): string;
  setStatus(value: string): ParticipantRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ParticipantRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ParticipantRequest): ParticipantRequest.AsObject;
  static serializeBinaryToWriter(message: ParticipantRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ParticipantRequest;
  static deserializeBinaryFromReader(message: ParticipantRequest, reader: jspb.BinaryReader): ParticipantRequest;
}

export namespace ParticipantRequest {
  export type AsObject = {
    userId: number,
    eventId: number,
    status: string,
  }
}

