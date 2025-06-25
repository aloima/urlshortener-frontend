interface URLEntry {
  id: number;
  value: string;
  clicks: number;
  createdAt: Date;
}

interface ListResponse {
  listableCount: number;
  totalCount: number;
  data: URLEntry[];
}
