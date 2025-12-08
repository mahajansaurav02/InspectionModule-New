import { useState } from 'react'

const getStoredData = () => {
  const initialChallanHeads = JSON.parse(localStorage.getItem('challanHeads'))
  const initialUserNameData = localStorage.getItem('servarthId')
  const initialDistrictCode = localStorage.getItem('districtCode')
  const initialDistrictData = localStorage.getItem('districtName')
  const initialTalukaCode = localStorage.getItem('talukaCode')
  const initialTalukaName = localStorage.getItem('talukaName')
  const initialMarathiName = localStorage.getItem('marathiName')
  const initialDesig = localStorage.getItem('desig')
  const initailechDbName = localStorage.getItem('echDbName')
  const initailechSchemaName = localStorage.getItem('echSchemaName')
  const initailmhrDbName = localStorage.getItem('mhrDbName')
  const initailmhrSchemaName = localStorage.getItem('mhrSchemaName')
  const initailechHost = localStorage.getItem('echHost')
  const initailechSlave = localStorage.getItem('echSlave')
  const initailmhrHost = localStorage.getItem('mhrHost')
  const initialUserVillages = JSON.parse(localStorage.getItem('villageData'))
  const initialUserRevenueYear = JSON.parse(localStorage.getItem('revenueYear'))
  const initialRoles = JSON.parse(localStorage.getItem('roles'))
  const initialNiranks = JSON.parse(localStorage.getItem('niranks'))
  const initialUserVillages1 = JSON.parse(localStorage.getItem('villageData1'))
  const initialUserRevenueYear1 = JSON.parse(localStorage.getItem('revenueYear1'))

  return {
    initialChallanHeads,
    initialUserNameData,
    initialDistrictCode,
    initialDistrictData,
    initialTalukaCode,
    initialTalukaName,
    initialMarathiName,
    initialDesig,
    initailechDbName,
    initailechSchemaName,
    initailmhrDbName,
    initailmhrSchemaName,
    initailechHost,
    initailechSlave,
    initailmhrHost,
    initialUserVillages,
    initialUserRevenueYear,
    initialRoles,
    initialNiranks,
    initialUserVillages1,
    initialUserRevenueYear1,
  }
}

export default () => {
  const {
    initialChallanHeads,
    initialUserNameData,
    initialDistrictCode,
    initialDistrictData,
    initialTalukaCode,
    initialTalukaName,
    initialMarathiName,
    initialDesig,
    initailechDbName,
    initailechSchemaName,
    initailmhrDbName,
    initailmhrSchemaName,
    initailechHost,
    initailechSlave,
    initailmhrHost,
    initialUserVillages,
    initialUserRevenueYear,
    initialRoles,
    initialNiranks,
    initialUserVillages1,
    initialUserRevenueYear1,
  } = getStoredData()
  const [challanHeads, setChallanHeads] = useState(initialChallanHeads)
  const [servarthId, setServarthId] = useState(initialUserNameData)
  const [districtCode, setDistrictCode] = useState(initialDistrictCode)
  const [districtName, setDistrictName] = useState(initialDistrictData)
  const [talukaCode, setTalukaCode] = useState(initialTalukaCode)
  const [talukaName, setTalukaName] = useState(initialTalukaName)
  const [marathiName, setMarathiName] = useState(initialMarathiName)
  const [desig, setDesig] = useState(initialDesig)
  const [echDbName, setechDbName] = useState(initailechDbName)
  const [echSchemaName, setechSchemaName] = useState(initailechSchemaName)
  const [mhrDbName, setmhrDbName] = useState(initailmhrDbName)
  const [mhrSchemaName, setmhrSchemaName] = useState(initailmhrSchemaName)
  const [echHost, setechHost] = useState(initailechHost)
  const [echSlave, setechSlave] = useState(initailechSlave)
  const [mhrHost, setmhrHost] = useState(initailmhrHost)
  const [villageData, setVillageData] = useState(initialUserVillages)
  const [revenueYear, setRevenueYear] = useState(initialUserRevenueYear)
  const [roles, setRoles] = useState(initialRoles)
  const [niranks, setNiranks] = useState(initialNiranks)
  const [villageData1, setVillageData1] = useState(initialUserVillages1)
  const [revenueYear1, setRevenueYear1] = useState(initialUserRevenueYear1)

  const details = (
    challanHeadsPostLogin,
    userNamePostLogin,
    districtCodePostLogin,
    districtNamePostLogin,
    talukaCodePostLogin,
    talukaNamePostLogin,
    marathiNamePostLogin,
    desigPostLogin,
    echDbNamePostLogin,
    echSchemaNamePostLogin,
    mhrDbNamePostLogin,
    mhrSchemaNamePostLogin,
    echHostPostLogin,
    echSlavePostLogin,
    mhrHostPostLogin,
    villageNamePostLogin,
    revenueYearPostLogin,
    userRolePostLogin,
    niranksPostLogin,
    villageNamePostLogin1,
    revenueYearPostLogin1,
  ) => {
    setChallanHeads(challanHeadsPostLogin)
    setServarthId(userNamePostLogin)
    setDistrictCode(districtCodePostLogin)
    setDistrictName(districtNamePostLogin)
    setTalukaCode(talukaCodePostLogin)
    setTalukaName(talukaNamePostLogin)
    setMarathiName(marathiNamePostLogin)
    setDesig(desigPostLogin)
    setechDbName(echDbNamePostLogin)
    setechSchemaName(echSchemaNamePostLogin)
    setmhrDbName(mhrDbNamePostLogin)
    setmhrSchemaName(mhrSchemaNamePostLogin)
    setechHost(echHostPostLogin)
    setechSlave(echSlavePostLogin)
    setmhrHost(mhrHostPostLogin)
    setVillageData(villageNamePostLogin)
    setRevenueYear(revenueYearPostLogin)
    setRoles(userRolePostLogin)
    setNiranks(niranksPostLogin)
    setVillageData1(villageNamePostLogin1)
    setRevenueYear1(revenueYearPostLogin1)

    localStorage.setItem('challanHeads', JSON.stringify(challanHeadsPostLogin))
    localStorage.setItem('servarthId', userNamePostLogin)
    localStorage.setItem('districtCode', districtCodePostLogin)
    localStorage.setItem('districtName', districtNamePostLogin)
    localStorage.setItem('talukaCode', talukaCodePostLogin)
    localStorage.setItem('talukaName', talukaNamePostLogin)
    localStorage.setItem('marathiName', marathiNamePostLogin)
    localStorage.setItem('desg', desigPostLogin)
    localStorage.setItem('echDbName', echDbNamePostLogin)
    localStorage.setItem('echSchemaName', echSchemaNamePostLogin)
    localStorage.setItem('mhrDbName', mhrDbNamePostLogin)
    localStorage.setItem('mhrSchemaName', mhrSchemaNamePostLogin)
    localStorage.setItem('echHost', echHostPostLogin)
    localStorage.setItem('echSlave', echSlavePostLogin)
    localStorage.setItem('mhrHost', mhrHostPostLogin)
    localStorage.setItem('villageData', JSON.stringify(villageNamePostLogin))
    localStorage.setItem('revenueYear', JSON.stringify(revenueYearPostLogin))
    localStorage.setItem('roles', JSON.stringify(userRolePostLogin))
    localStorage.setItem('niranks', JSON.stringify(niranksPostLogin))
    localStorage.setItem('villageData1', JSON.stringify(villageNamePostLogin1))
    localStorage.setItem('revenueYear1', JSON.stringify(revenueYearPostLogin1))
  }
  return {
    details,
    challanHeads,
    servarthId,
    districtCode,
    districtName,
    talukaCode,
    talukaName,
    marathiName,
    desig,
    echDbName,
    echSchemaName,
    mhrDbName,
    mhrSchemaName,
    echHost,
    echSlave,
    mhrHost,
    villageData,
    revenueYear,
    roles,
    niranks,
    villageData1,
    revenueYear1,
  }
}
