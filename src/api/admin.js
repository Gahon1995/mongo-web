import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getUsers(query) {
  return request({
    url: '/users',
    method: 'get',
    params: query
  })
}

export function deleteUser(id) {
  return request({
    url: '/users/' + id,
    method: 'delete'
  })
}
