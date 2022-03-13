import * as jspb from 'google-protobuf'



export class ExchangeRateResponse extends jspb.Message {
  getDataList(): Array<ExchangeRate>;
  setDataList(value: Array<ExchangeRate>): ExchangeRateResponse;
  clearDataList(): ExchangeRateResponse;
  addData(value?: ExchangeRate, index?: number): ExchangeRate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExchangeRateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ExchangeRateResponse): ExchangeRateResponse.AsObject;
  static serializeBinaryToWriter(message: ExchangeRateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExchangeRateResponse;
  static deserializeBinaryFromReader(message: ExchangeRateResponse, reader: jspb.BinaryReader): ExchangeRateResponse;
}

export namespace ExchangeRateResponse {
  export type AsObject = {
    dataList: Array<ExchangeRate.AsObject>,
  }
}

export class ExchangeRate extends jspb.Message {
  getName(): string;
  setName(value: string): ExchangeRate;

  getModifier(): number;
  setModifier(value: number): ExchangeRate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExchangeRate.AsObject;
  static toObject(includeInstance: boolean, msg: ExchangeRate): ExchangeRate.AsObject;
  static serializeBinaryToWriter(message: ExchangeRate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExchangeRate;
  static deserializeBinaryFromReader(message: ExchangeRate, reader: jspb.BinaryReader): ExchangeRate;
}

export namespace ExchangeRate {
  export type AsObject = {
    name: string,
    modifier: number,
  }
}

