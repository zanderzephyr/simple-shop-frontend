import {
  TableColumnDescription,
  TableColumnDescriptionBuilder,
} from '@ui/table/interface/table-column-description';
import { TableCellContext } from '@ui/table/interface/table-cell-context';
import { Function, Consumer, zodConsumer } from '@core/utils/functional-interfaces';
import { User } from '@api/user/model/user';
import { StringEditorComponent } from '@ui/editor/string-editor/string-editor';
import { StringRendererComponent } from '@ui/renderer/string-renderer/string-renderer';
import {
  UserManagementTableAction,
  zodUserManagementTableAction,
} from './user-management-table-action';
import { UserManagementTableActionEditorComponent } from './user-management-table-action-editor/user-management-table-action-editor';
import { UserManagementTableActionRendererComponent } from './user-management-table-action-renderer/user-management-table-action-renderer';
import { z } from 'zod';

let modelIndex: number = 0;

export const USERNAME: TableColumnDescription<string> = new TableColumnDescriptionBuilder<string>() //
  .setModelIndex(modelIndex++) //
  .setTitle('Username') //
  .setTypeSchema(z.string()) //
  .setRendererType(StringRendererComponent) //
  .setEditorType(StringEditorComponent) //
  .build();

export const USER_TYPE: TableColumnDescription<string> = new TableColumnDescriptionBuilder<string>() //
  .setModelIndex(modelIndex++) //
  .setTitle('User Type') //
  .setTypeSchema(z.string()) //
  .setRendererType(StringRendererComponent) //
  .setEditorType(StringEditorComponent) //
  .build();

export const FIRST_NAME: TableColumnDescription<string> =
  new TableColumnDescriptionBuilder<string>() //
    .setModelIndex(modelIndex++) //
    .setTitle('First Name') //
    .setTypeSchema(z.string()) //
    .setRendererType(StringRendererComponent) //
    .setEditorType(StringEditorComponent) //
    .build();

export const LAST_NAME: TableColumnDescription<string> = new TableColumnDescriptionBuilder<string>() //
  .setModelIndex(modelIndex++) //
  .setTitle('Last Name') //
  .setTypeSchema(z.string()) //
  .setRendererType(StringRendererComponent) //
  .setEditorType(StringEditorComponent) //
  .build();

export const ACTIONS: TableColumnDescription<
  Map<UserManagementTableAction, Consumer<TableCellContext>>
> = new TableColumnDescriptionBuilder<Map<UserManagementTableAction, Consumer<TableCellContext>>>() //
  .setModelIndex(modelIndex++) //
  .setTitle('Actions') //
  .setTypeSchema(z.map(zodUserManagementTableAction(), zodConsumer())) //
  .setRendererType(UserManagementTableActionRendererComponent) //
  .setEditorType(UserManagementTableActionEditorComponent) //
  .build();

export const userManagementColumnDescriptions: readonly TableColumnDescription<unknown>[] =
  createColumnDescriptions();

function createColumnDescriptions(): readonly TableColumnDescription<unknown>[] {
  const columnDescriptions: TableColumnDescription<unknown>[] = [];

  columnDescriptions.push(USERNAME);
  columnDescriptions.push(USER_TYPE);
  columnDescriptions.push(FIRST_NAME);
  columnDescriptions.push(LAST_NAME);
  columnDescriptions.push(ACTIONS);
  return Object.freeze(columnDescriptions);
}

const columnDescriptionToUserValueExtractor: Map<
  TableColumnDescription<unknown>,
  Function<User, unknown>
> = createColumnDescriptionToUserValueExtractorMap();

function createColumnDescriptionToUserValueExtractorMap(): Map<
  TableColumnDescription<unknown>,
  Function<User, unknown>
> {
  const map: Map<TableColumnDescription<unknown>, Function<User, unknown>> = new Map<
    TableColumnDescription<unknown>,
    Function<User, unknown>
  >();

  map.set(USERNAME, (user) => user.getUsername());
  map.set(USER_TYPE, (user) => user.getUserType().name);
  map.set(FIRST_NAME, (user) => user.getFirstName());
  map.set(LAST_NAME, (user) => user.getLastName());

  return map;
}

export function extractUserValue(
  user: User,
  columnDescription: TableColumnDescription<unknown>,
): unknown | undefined {
  const userValueExtractor: Function<User, unknown> | undefined =
    columnDescriptionToUserValueExtractor.get(columnDescription);
  return userValueExtractor ? userValueExtractor(user) : undefined;
}
