import { localDateTimeToString } from '@core/utils/data-type-utils';
import { dateTimeFormatter, Item, ItemDto } from './model/item';
import { UnsupportedOperationError } from '@core/utils/common-errors';

export class ItemSerializer {
  constructor() {
    throw new UnsupportedOperationError();
  }

  public static serialize(item: Item): string {
    // Create a DTO object without private fields and properly formatted.
    const itemDto: ItemDto = {
      id: item.getId()?.toString(),
      title: item.getTitle(),
      mediaType: item.getMediaType().id,
      stock: item.getStock(),
      price: item.getPrice(),
      imageUrl: item.getImageUrl(),
      lastChange: item.getLastChange()
        ? localDateTimeToString(item.getLastChange()!, dateTimeFormatter)
        : undefined,
      lastChangedBy: item.getLastChangedBy()?.toString(),
      version: item.getVersion()?.toString(),
    };

    // TODO The replacer argument has a "this:any" parameter. Research how this works. It looks very mysterious / magical.
    return JSON.stringify(itemDto);
  }
}
