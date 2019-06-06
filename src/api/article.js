import request from '@/utils/request'

export function getArticles(query) {
  return request({
    url: '/articles',
    method: 'get',
    params: query
  })
}

export function newArticle(data) {
  return request({
    url: '/articles',
    method: 'post',
    data
  })
}

export function deleteArticle(id) {
  return request({
    url: '/articles/' + id,
    method: 'delete'
  })
}

export function getArticle(aid, query) {
  return request({
    url: '/articles/' + aid,
    method: 'get',
    params: query
  })
}

export function updateArticle(aid, data) {
  return request({
    url: '/articles/' + aid,
    method: 'post',
    data
  })
}

export function getArticleRecord(aid, query) {
  return request({
    url: '/records/' + aid,
    method: 'get',
    params: query
  })
}
