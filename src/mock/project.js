const projectList = [
  {
    field: 'jyp',
    id: 1,
    picture: '',
    projectname: 'test(百度)',
    prourl: 'http://www.baidu.com/',
    status: 1
  },
  {
    field: 'typ',
    id: 2,
    picture: '',
    projectname: 'test(4399)',
    prourl: 'http://www.4399.com/',
    status: 1
  }
]

export default {
  selectAllpj: () => {
    return {
      data: projectList,
      status: 10000,
      success: true
    }
  }
}
