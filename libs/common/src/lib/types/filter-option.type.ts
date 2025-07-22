export type SearchConfig = {
  placeholder: string;
  param: string;
};

export type PaginationConfig = {
  limit: number;
  count: number;
  page: number;
};

export type FilterItemOption = {
  label: string;
  key: string;
  icon: string;
  isDefault?: boolean;
};

export type FilterItem = {
  label: string;
  icon: string;
  selected: string;
  param: string;
  options: Array<FilterItemOption>;
};

export type FilterConfig = {
  path?: string;
  search?: SearchConfig;
  pagination?: PaginationConfig;
  filters?: Array<FilterItem>;
};
