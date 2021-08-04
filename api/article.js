import { request } from '@/plugins/request'

export const getArticles = params => {

  return request({
    method: "GET",
    url: "articles",
    params
  })

  // return _load(params)
}

export const getFeedArticles = params => {
  return request({
    method: "GET",
    url: "articles/feed",
    params
  })
  // return _load(params, true)
}

export const getArticle = (slug) => {
  return request({
    method: "GET",
    url: `articles/${slug}`
  })
}

export const getComments = (slug) => {
  return request({
    method: "GET",
    url: `articles/${slug}/comments`
  })
}

export const addFavorite = ({ slug }) => {
  return request({
    method: "POST",
    url: `articles/${slug}/favorite`,
  })
}

export const delFavorite = ({ slug }) => {
  return request({
    method: "DELETE",
    url: `articles/${slug}/favorite`,
  })
}

function _load(params, isFeed) {
  const articles = require('../adb/article.json');
  let articlesCount = 500
  if (isFeed) {
    articlesCount = 50
  } else if (params.tag) {
    articlesCount = 200
  }
  const rst = {
    articles: [],
    articlesCount
  }
  for (const article of articles.articles) {
    const newAr = Object.assign({}, article)
    newAr.title += '_P' + params.offset
    if (params.tag) {
      newAr.title += '_T' + params.tag
    }
    if (isFeed) {
      newAr.title += '_YourFeed'
    }
    rst.articles.push(newAr)
  }
  return {
    data: rst
  }
}