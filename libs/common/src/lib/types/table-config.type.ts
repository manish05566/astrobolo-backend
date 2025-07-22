export enum TableColumnType {
  DATE = 'DATE',
  DATE_FROM_NOW = 'DATE_FROM_NOW',
  AVATAR = 'AVATAR',
  AVATAR_LIST = 'AVATAR_LIST',
  MEDIA = 'MEDIA',
  STATUS = 'STATUS',
}

export enum TableActionType {
  DETAILS = 'DETAILS',
  EDIT = 'EDIT',
  DELETE = 'DELETE',
  ACTIVATE = 'ACTIVATE',
  SUSPEND = 'SUSPEND',
}

export type TableFilterOption = {
  label: string;
  value: string;
};

export type TableFilter = {
  param: string;
  options: Array<TableFilterOption>;
};
export type TableAction = {
  type: TableActionType;
  label: string;
  icon: string;
  isBulk?: boolean;
  visibleWhen?: any;
};

export type TableColumn = {
  label: string;
  field: string;
  type?: string;
  class?: string;
  width?: number;
  sort?: boolean | string;
  sortField?: string;
  truncate?: boolean;
  value?: (row: any) => string;
  action?: any;
};

export type TableFetchOption = {
  path: string;
  method: 'GET' | 'POST';
};

export type TableConfig = {
  name: string;
  isLoading: boolean;
  fetch: TableFetchOption;
  columns: Array<TableColumn>;
  filters: Array<TableFilter>;
  actions: Array<TableAction>;
  icon?: string;
  enableBulkSelection?: boolean;
};
