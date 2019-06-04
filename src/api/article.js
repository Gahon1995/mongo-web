import request from '@/utils/request'

export function getArticles(query) {
  return request({
    url: '/articles',
    method: 'get',
    params: query
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

export function getArticleRecord(aid, query) {
  return request({
    url: '/records/' + aid,
    method: 'get',
    params: query
  })
}
