import Router from '@/router'

import { 
  getContractList, 
  getProcurementList, 
  getCategorys, 
  backShowImg,
  findRecord
} from '@/api/contract'
import {
  SET_CONTRACT_LIST,
  SET_CONTRACT_PROJECTNAME,
  SET_CONTRACT_MODULE_LIST,
  SET_CONTRACT_SIZE,
  SET_CONTRACT_PROJECT_ISSHOW,
  SET_CONTRACT_SEARCH_CONTENT,
  SET_CONTRACT_DIALOG_VISIBLE,
  SET_CONTRACT_CURRENTPAGE,
  SET_CONTRACT_PLACEHOLDER,
  SET_CONTRACT_ASCRIPTION,
  SET_CONTRACT_SELECTLIST,
  SET_CONTRACT_PICTURE,
  SET_CONTRACT_MEDIA,
  SET_CONTRACT_PDF,
  SET_CONTRACT_TIP,
  SET_CONTRACT_RECORD,
  SET_CONTRACT_REST,
  SET_CONTRACT_RECORD_ID,
  SET_CONTRACT_DELETEFILE,
  SET_CONTRACT_LOADING,
  SET_CONTRACT_FINDDATA,
  SET_CONTRACT_TYPE,
  SET_CONTRACT_PRONO,
  SET_CONTRACT_QUERY,
  SET_CONTRACT_CONFIRM,
  SET_CONTRACT_CONFIRM_INFO,
  SET_CONTRACT_CONFIRM_INFO_INDEX,
  SET_CONTRACT_CONFIRM_INFO_SHOW,
  SET_CURRENT_CONTRACT,
  SET_CONTRACT_DETAIL
} from '../mutation-types'

const state = {
  contractList: [],
  projectName: null,
  contractModuleList: [],
  size: {},
  projectIsShow: true,
  searchContent: null,
  dialogVisible: false,
  currentPage: '1',
  placeholder: '请输入项目名称',
  ascription: '',
  selectList: [],
  pictureList: [],
  mediaList: [],
  pdfList: [],
  setTip: '1000001',
  recordList: [],
  recordPage: '1',
  recordTotal: '0',
  recordId: '',
  loading: false,
  findData: {},
  contractType: {},
  proNo: '',
  tableListQuery: {},
  dialogConfirm: false,
  confirmInfos: [],
  confirmInfoIndex: '',
  showNull: false
}

const getters = {
  pageSize: state => state.size['page_size'] || '1',
  total: state => state.size['total'] || '0',
  secondName: state => state.findData['second_name'] || null,
  proStartTime: state => state.findData['project_start_time'] || null,
  proEndTime: state => state.findData['project_end_time'] || null,
  signTime: state => state.findData['sign_time'] || null,
  getConfirmInfo: state => state.confirmInfos[state.confirmInfoIndex] || {}
}

const mutations = {
  [SET_CONTRACT_LIST] (state, list) {
    state.contractList = list
  },
  [SET_CONTRACT_PROJECTNAME] (state, name) {
    state.projectName = name
  },
  [SET_CONTRACT_MODULE_LIST] (state, list) {
    state.contractModuleList = list
  },
  [SET_CONTRACT_SIZE] (state, size) {
    state.size = size
  },
  [SET_CONTRACT_PROJECT_ISSHOW] (state, boolean) {
    state.projectIsShow = boolean
  },
  [SET_CONTRACT_SEARCH_CONTENT] (state, text) {
    state.searchContent = text
  },
  [SET_CONTRACT_DIALOG_VISIBLE] (state, boolean) {
    state.dialogVisible = boolean
  },
  [SET_CONTRACT_CURRENTPAGE] (state, current) {
    state.currentPage = current
  },
  [SET_CONTRACT_PLACEHOLDER] (state, tip) {
    state.placeholder = tip
  },
  [SET_CONTRACT_ASCRIPTION] (state, ascription) {
    state.ascription = ascription
  },
  [SET_CONTRACT_SELECTLIST] (state, list) {
    state.selectList = list
  },
  [SET_CONTRACT_PICTURE] (state, list) {
    if (!(list instanceof Array)) {
      state.pictureList.push(list)
    } else {
      state.pictureList = list
    }
  },
  [SET_CONTRACT_MEDIA] (state, list) {
    if (!(list instanceof Array)) {
      state.mediaList.push(list)
    } else {
      state.mediaList = list
    }
  },
  [SET_CONTRACT_PDF] (state, list) {
    if (!(list instanceof Array)) {
      state.pdfList.push(list)
    } else {
      state.pdfList = list
    }
  },
  [SET_CONTRACT_TIP] (state, tip) {
    state.setTip = tip
  },
  [SET_CONTRACT_RECORD] (state, list) {
    state.recordList = list.content
    state.recordPage = list.size
    state.recordTotal = list.total_elements || '0'
  },
  [SET_CONTRACT_REST] (state, arr) {
    state.pictureList = arr
    state.mediaList = arr
    state.pdfList = arr
  },
  [SET_CONTRACT_RECORD_ID] (state, id) {
    state.recordId = id
  },
  [SET_CONTRACT_DELETEFILE] (state, item) {
    let items = item.split('-')[0]
    if (item.indexOf('picture') > -1) {
      state.pictureList.splice(items, 1)
    } else if (item.indexOf('pdf') > -1) {
      state.pdfList.splice(items, 1)
    } else if (item.indexOf('media') > -1) {
      state.mediaList.splice(items, 1)
    } else if (item.indexOf('confirm') > -1) {
      state.confirmInfos.splice(items, 1)
    }
  },
  [SET_CONTRACT_LOADING] (state, boolean) {
    state.loading = boolean
  },
  [SET_CONTRACT_FINDDATA] (state, obj) {
    state.findData = obj
  },
  [SET_CONTRACT_TYPE] (state, obj) {
    state.contractType = obj
  },
  [SET_CONTRACT_PRONO] (state, no) {
    state.proNo = no
  },
  [SET_CONTRACT_QUERY] (state, query) {
    state.tableListQuery = query
  },
  [SET_CONTRACT_CONFIRM] (state, boolean) {
    state.dialogConfirm = boolean
  },
  [SET_CONTRACT_CONFIRM_INFO] (state, list) {
    if (!(list instanceof Array)) {
      state.confirmInfos.push(list)
    } else {
      state.confirmInfos = list
    }
  },
  [SET_CONTRACT_CONFIRM_INFO_INDEX] (state, index) {
    state.confirmInfoIndex = index
  },
  [SET_CONTRACT_CONFIRM_INFO_SHOW] (state, boolean) {
    state.showNull = boolean
  }
}

const actions = {
  /**
   * 项目合同列表
   */
  async getContractList({ commit }, payload = {}) {
    const project_name = payload.searchContent || state.searchContent
    const page = payload.currentPage || state.currentPage
    
    const res = await getContractList({project_name, page})
    if (res.code === 0) {
      const data = res.data
      if (data) {
        commit(SET_CONTRACT_LIST, data.list)
        commit(SET_CONTRACT_SIZE, data)
      } else {
        commit(SET_CONTRACT_LIST, [])
      }
    }
    return res
  },

  /**
   * 采购合同列表
   */
  async getProcurementList({ commit }, payload = {}) {
    const project_no = payload.searchContent || state.searchContent
    const page = payload.currentPage || state.currentPage
    const res = await getProcurementList({project_no, page})
    if (res.code === 0) {
      const data = res.data
      if (data) {
        commit(SET_CONTRACT_LIST, data.list)
        commit(SET_CONTRACT_SIZE, data)
      } else {
        commit(SET_CONTRACT_LIST, [])
      }
    }
    return res
  },

  /**
   * 项目立项资料类别
   */
  async getCategorys({ commit }, ascription) {
    const getAscription = ascription || state.ascription
    const res = await getCategorys(getAscription)
    let obj = {}
    if (res.code === 0) {
      const data = res.data
      if (data) {
        commit(SET_CONTRACT_SELECTLIST, data)
        data.map((item, index) => {
          let key = item.category_code
          let value = item.category_name
          obj[key] = value
        })
        commit(SET_CONTRACT_TYPE, obj)
      } else {
        commit(SET_CONTRACT_SELECTLIST, [])
      }
    }
  },

  /**
   * 项目立项资料 回显
   */
  async backShowImg({ commit }, payload = {}) {
    let projectNo = payload.projectNo || state.proNo
    let contractType = payload.contractType || state.ascription
    let contractCode = payload.contractCode || (state.tableListQuery.contract_code || '')
    const res = await backShowImg(projectNo, contractType, contractCode)
    if (res.code === 0) {
      const data = res.data
      if (Object.getOwnPropertyNames(data).length > 0) {
        commit(SET_CONTRACT_RECORD, data.page_resume)
        commit(SET_CONTRACT_RECORD_ID, data.id)
        commit(SET_CONTRACT_FINDDATA, data)
        commit(SET_CONTRACT_REST, [])

        if (data.confirm_infos !== undefined) {
          commit(SET_CONTRACT_CONFIRM_INFO, data.confirm_infos)
        }

        const item = data.attachs
        
        let pictureArr = []
        let mediaArr = []
        let pdfArr = []

        for (var i = 0; i < item.length; i++) {
          if (item[i]['file_path']) {
            var fileType = item[i]['file_path'].split('?')[0]
            if (fileType.indexOf('.pdf') > -1) {
              pdfArr.push({
                review_path: item[i].file_path,
                file_type: state.contractType[item[i].file_type],
                attach_id: item[i].id
              })
            }
            if (fileType.indexOf('.jpg') > -1 || fileType.indexOf('.png') > -1) {
              pictureArr.push({
                review_path: item[i].file_path,
                file_type: state.contractType[item[i].file_type],
                attach_id: item[i].id
              })
            }
            if (fileType.indexOf('.mp4') > -1) {
              mediaArr.push({
                review_path: item[i].file_path,
                file_type: state.contractType[item[i].file_type],
                attach_id: item[i].id
              })
            }
          } 
        }
        commit(SET_CONTRACT_PICTURE, pictureArr)
        commit(SET_CONTRACT_PDF, pdfArr)
        commit(SET_CONTRACT_MEDIA, mediaArr)
      } else {
        commit(SET_CONTRACT_RECORD, [])
        commit(SET_CONTRACT_PICTURE, [])
        commit(SET_CONTRACT_PDF, [])
        commit(SET_CONTRACT_MEDIA, [])
        commit(SET_CONTRACT_CONFIRM_INFO, [])
      }
    }
  },
  async findRecord({ commit }, payload = {}) {
    let sealId = payload.sealId || state.recordId
    let currentPage = payload.currentPage || state.currentPage
    const res = await findRecord(sealId, currentPage)
    const data = res.data
    if (res.code === 0) {
      commit(SET_CONTRACT_RECORD, data.page_resume)
    } else {
      commit(SET_CONTRACT_RECORD, [])
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
