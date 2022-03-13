import * as jspb from 'google-protobuf'



export class AchievementResponse extends jspb.Message {
  getDataList(): Array<Achievement>;
  setDataList(value: Array<Achievement>): AchievementResponse;
  clearDataList(): AchievementResponse;
  addData(value?: Achievement, index?: number): Achievement;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AchievementResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AchievementResponse): AchievementResponse.AsObject;
  static serializeBinaryToWriter(message: AchievementResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AchievementResponse;
  static deserializeBinaryFromReader(message: AchievementResponse, reader: jspb.BinaryReader): AchievementResponse;
}

export namespace AchievementResponse {
  export type AsObject = {
    dataList: Array<Achievement.AsObject>,
  }
}

export class Achievement extends jspb.Message {
  getName(): string;
  setName(value: string): Achievement;

  getImageUrl(): string;
  setImageUrl(value: string): Achievement;

  getDescription(): string;
  setDescription(value: string): Achievement;

  getPoints(): number;
  setPoints(value: number): Achievement;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Achievement.AsObject;
  static toObject(includeInstance: boolean, msg: Achievement): Achievement.AsObject;
  static serializeBinaryToWriter(message: Achievement, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Achievement;
  static deserializeBinaryFromReader(message: Achievement, reader: jspb.BinaryReader): Achievement;
}

export namespace Achievement {
  export type AsObject = {
    name: string,
    imageUrl: string,
    description: string,
    points: number,
  }
}

