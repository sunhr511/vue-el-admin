import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    shoppingid: '@increment',
    accountid: '@integer(300, 5000)',
    address: '@province' + '@city' + '@county',
    createtime: +Mock.Random.date('T'),
    goodname: '@ctitle(8, 15)',
    projectid: '@integer(1, 2)',
    firstprice: '@integer(500, 2000)',
    orderstatus: 2,
    receiver: '@cname',
    retel: /^1[385][1-9]\d{8}/
  }))
}

export default {
  selectPCShoppintOrder: config => {
    const params = JSON.parse(config.body)
    const { shoppingId = '', pageNo = 1, pageSize = 20, orderStatus = 2, projectId = 0 } = params
    projectId
    let pageList = []
    let total = 0
    if (shoppingId) {
      pageList = List.filter((item, index) => item.orderstatus === orderStatus && parseInt(shoppingId) === item.shoppingid)
    } else {
      pageList = List.filter((item, index) => item.orderstatus === orderStatus)
    }
    total = pageList.length
    pageList = pageList.filter((item, index) => index < pageSize * pageNo && index >= pageSize * (pageNo - 1))
    return {
      list: pageList,
      pageNo,
      pageSize,
      pages: total / pageSize,
      status: 10000,
      success: true,
      total
    }
  }
}
