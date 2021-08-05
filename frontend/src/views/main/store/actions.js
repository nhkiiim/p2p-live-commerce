// API
import axios from 'axios'
import { setInterceptors } from '../../../common/interceptors'

function createInstance(){
  const instance = axios.create()
  return setInterceptors(instance)
}

// Token값과 특정 url을 붙여서 셋팅
function createInstanceWithAuth(url) {
  const instance = axios.create({
    baseURL: BASE_URL+`${url}`,
  })
  return setInterceptors(instance)
}

// const BASE_URL = 'http://i5d101.p.ssafy.io:8080/api/v1'
const BASE_URL = 'http://localhost:8080/api/v1'
// const BASE_URL = 'https://soft-lizard-45.loca.lt/api/v1/'
const instanceWithAuth = createInstance()
const posts = createInstanceWithAuth('posts')

export function requestLogin ({ state, commit }, payload) {
  //console.log('requestLogin', state, payload)
  const url = BASE_URL+'/auth/login'
  let body = payload

  //return axios.post(url, body)
  return instanceWithAuth.post(url, body)
}

export function requestSignup({state}, payload){
  const url = BASE_URL+'/user'
  let body = payload

  return instanceWithAuth.post(url, body)
}

export function requestCheckDupl({state}, payload){
  //console.log(payload)
  const url = BASE_URL+`/user/${payload.id}`
  return instanceWithAuth.get(url)
}

export function requestUserInfo({commit}, payload){
  const url = BASE_URL+'/user/me'
  return instanceWithAuth.get(url)
}

export function requestModifyUserInfo({state}, payload){
  const url = BASE_URL+`/user`
  return instanceWithAuth.patch(url, payload)
}

// 게시글 작성 요청 보내기
export function createPost({commit}, postData) {
  const url = BASE_URL+'/product'
  console.log(url)
  let body = postData
  // const url = BASE_URL+`/create-deal-form/${userId}/${}`
  return instanceWithAuth.post(url, body)
}

export function updatePost({commit}, payload){
  const url = BASE_URL+`/product/${payload.productId}`
  const body = {
    imageUrl: payload.imageUrl,
    productName: payload.productName,
    categories: payload.categories,
    basePrice: payload.basePrice,
    reserveTime: payload.reserveTime,
    description: payload.description,
  }
  return instanceWithAuth.patch(url, body)
}
// 게시글 삭제 요청 보내기
export function deletePost(postId) {
  return posts.delete(postId);
}

export function requestDropoutUser({state}, payload){
  const url = BASE_URL+`/user`
  return instanceWithAuth.delete(url)
}

export function requestDealDetail({state}, payload){
  const url = BASE_URL+`/product/${payload}`
  return instanceWithAuth.get(url)
}

export function requestDeleteDeal({state}, payload){
  const url = BASE_URL+`/product/${payload}`
  return instanceWithAuth.delete(url)
}

export function requestLikeDealList({state}, payload){
  const url = BASE_URL+`/wish/${payload}`
  return instanceWithAuth.get(url)
}

export function requestLikeDeal({state}, payload){
  const url = BASE_URL+'/wish'
  let body = {
    "productId": payload,
  }
  return instanceWithAuth.post(url, body)
}

export function requestDeleteLikeDeal({state}, payload){
  const url = BASE_URL+`/wish/${payload}`
  return instanceWithAuth.delete(url)
}

export function requestWishList({state}){
  const url = BASE_URL+'/wish'
  return instanceWithAuth.get(url)
}

export function requestSellList({state}){
  const url = BASE_URL+'/trade/sell'
  return instanceWithAuth.get(url)
}

export function requestBuyList({state}){
  const url = BASE_URL+'/trade/buy'
  return instanceWithAuth.get(url)
}

export function requestDealList({state}, payload){
  const url = BASE_URL+'/product/list'
  let body = payload
  return instanceWithAuth.post(url, body)
}

export function requestCheckWish({state}, payload){
  const url = BASE_URL+`/wish/${payload}`
  return instanceWithAuth.get(url)
}

export function requestWishCount({state}, payload){
  const url = BASE_URL+`/wish/count/${payload}`
  return instanceWithAuth.get(url)
}

export function requestPriceHigh({state}, payload){
  const url = BASE_URL+'/product/highprice'
  let body = payload
  return instanceWithAuth.post(url, body)
}

export function requestPriceLow({state}, payload){
  const url = BASE_URL+'/product/lowprice'
  let body = payload
  return instanceWithAuth.post(url, body)
}

export function requestReserveTime({state}, payload){
  const url = BASE_URL+'/product/reservetime'
  let body = payload
  return instanceWithAuth.post(url, body)
}

export function requestAllDeal({state}){
  const url = BASE_URL+'/product/all'
  return instanceWithAuth.post(url)
}
