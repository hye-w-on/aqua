import { PaginationRequest } from './Pagination';

export interface BbsPostCondition extends PaginationRequest {
  title?: string;
  catagory?: string;
  contents?: string;
}

export interface BbsPost {
  postNo: string;
  title: string;
  catagory: string;
  contents: string;
}
