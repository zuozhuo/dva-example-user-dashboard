import * as request from '../utils/request';
import {PAGE_SIZE} from '../constants';

export function fetch({page, test}) {
  return request.GET(`/api/users?fix_q=111111`, {_page: page, _limit: PAGE_SIZE, test: test});
}

export function remove(id) {
  return request.DELETE(`/api/users/${id}`);
}

export function patch(id, values) {
  return request.request(`/api/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}

export function create(values) {
  return request.POST('/api/users', values);
}
