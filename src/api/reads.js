import request from '@/utils/request'

export function getReads(query) {
  return request({
    url: '/reads',
    method: 'get',
    params: query
  })
}

export function deleteRead(rid) {
  return request({
    url: '/reads/' + rid,
    method: 'delete'
  })
}

export function getRead(rid) {
  return request({
    url: '/reads/' + rid,
    method: 'get'
  })
}

export function newRead(data) {
  return request({
    url: '/reads',
    method: 'post',
    data
  })
}
