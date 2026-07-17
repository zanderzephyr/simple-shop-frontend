export interface Deserializer<T> {
  deserialize(json: string): T;
}
