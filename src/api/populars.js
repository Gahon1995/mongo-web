import request from '@/utils/request'

export function getPopulars(query) {
  return request({
    url: '/populars',
    method: 'get',
    params: query
  })
}

export function getPublicPopulars(query) {
  return request({
    url: '/populars/today',
    method: 'get',
    params: query
  })
}

export function updatePopulars(data) {
  return request({
    url: '/populars',
    method: 'post',
    data
  })
}

export function deletePopular(pid) {
  return request({
    url: '/populars/' + pid,
    method: 'delete'
  })
}

export function getPopular(pid) {
  return request({
    url: '/populars/' + pid,
    method: 'get'
  })
}
