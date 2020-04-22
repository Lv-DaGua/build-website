import request from '@/utils/request'

export function releaseWeb(data){
  return request({
    url: 'build/release',
    method: 'post',
    data
  })
}

export function saveDraft(data) {
  return request({
    url: 'draft/saveDraft',
    method: 'post',
    data
  })
}

export function deleteDraft(params) {
  return request({
    url: 'draft/deleteMyDraft',
    method: 'get',
    params
  })
}

export function uploadImg(data) {
  return request({
    url: 'upload/img',
    method: 'post',
    data
  })
}


