import request from '@/utils/request'

export function Download(query) {
  return request({
    url: '/hadoop/download',
    method: 'get',
    params: query
  })
}

export function Upload(data) {
  return request({
    url: '/hadoop/upload',
    method: 'post',
    data
  })
}
