const getReqHeaders = ({ token, user }) => {
  const langType =
    localStorage.getItem('umi_locale') === 'ma-IN' ? 'mr-IN' : 'en-US'

  return {
    'Accept-Language': langType,
    Authorization: token ? `Bearer ${token}` : '',
    echHost: user?.dbInfo?.echHost,
    mhrHost: user?.dbInfo?.mhrHost,
    echDbName: user?.dbInfo?.echDbName,
    echSchemaName: user?.dbInfo?.echSchemaName,
    mhrDbName: user?.dbInfo?.mhrDbName,
    mhrSchemaName: user?.dbInfo?.mhrSchemaName,
    servarthId: user?.servarthId,
  }
}

export default getReqHeaders
