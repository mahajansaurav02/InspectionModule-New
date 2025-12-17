const token = localStorage.getItem('token')
const echHost = localStorage.getItem('echHost')
const mhrHost = localStorage.getItem('mhrHost')
const echDbName = localStorage.getItem('echDbName')
const echSchemaName = localStorage.getItem('echSchemaName')
const mhrDbName = localStorage.getItem('mhrDbName')
const mhrSchemaName = localStorage.getItem('mhrSchemaName')
const servarthId = localStorage.getItem('servarthId')
const langType = localStorage.getItem('umi_locale') === 'ma-IN' ? 'mr-IN' : 'en-US'



const reqHeaders = {
  'Accept-Language': langType,
  Authorization: `Bearer ${token}`,
  echHost: echHost,
  mhrHost: mhrHost,
  echDbName: echDbName,
  echSchemaName: echSchemaName,
  mhrDbName: mhrDbName,
  mhrSchemaName: mhrSchemaName,
  servarthId: servarthId,
}

export default reqHeaders
