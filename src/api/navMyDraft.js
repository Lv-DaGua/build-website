import request from '@/utils/request'

export function getMyDraft() {
  return request({
    url: 'draft/getMyDraft',
    method: 'get',
  })
}


export function deleteDraft(params) {
  return request({
    url: 'draft/deleteMyDraft',
    method: 'get',
    params
  })
}
