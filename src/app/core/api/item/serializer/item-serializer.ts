import { UnsupportedOperationError } from '@core/utils/common-errors';
import { localDateTimeToString } from '@core/utils/data-type-utils';
import { LocalDateTime } from '@js-joda/core';
import { dateTimeFormatter, ItemDto } from '../dto/item-dto';
import { Item } from '../model/item';

export class ItemSerializer {
	constructor() {
		throw new UnsupportedOperationError();
	}

	public static serialize(item: Item): string {
		const lastChange: LocalDateTime | undefined = item.getLastChange();

		const itemDto: ItemDto = {
			id: item.getId()?.toString(),
			title: item.getTitle(),
			mediaType: item.getMediaType().id,
			stock: item.getStock(),
			price: item.getPrice(),
			description: item.getDescription(),
			lastChange: lastChange ? localDateTimeToString(lastChange, dateTimeFormatter) : undefined,
			lastChangedBy: item.getLastChangedBy()?.toString(),
			version: item.getVersion()?.toString()
		};

		// TODO The replacer argument has a "this:any" parameter. Research how this works. It looks very mysterious /
		// magical.
		return JSON.stringify(itemDto);
	}
}
