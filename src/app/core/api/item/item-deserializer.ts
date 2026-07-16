import { Item, ItemBuilder, MediaType, ItemDto } from './model/item';
import { UnsupportedOperationError } from '@core/utils/common-errors';
import { convertStringToEnum } from '@core/utils/data-type-utils';

export class ItemDeserializer {
  constructor() {
    throw new UnsupportedOperationError();
  }

  public static deserialize(json: string): Item {
    const itemDto: ItemDto = JSON.parse(json);

    return new ItemBuilder()
      .setId(BigInt(itemDto.id))
      .setTitle(itemDto.title)
      .setMediaType(convertStringToEnum(itemDto.mediaType, MediaType)!)
      .setStock(itemDto.stock)
      .setPrice(itemDto.price)
      .setImageUrl(itemDto.imageUrl)
      .setVersion(BigInt(itemDto.version))
      .build();
  }
}
