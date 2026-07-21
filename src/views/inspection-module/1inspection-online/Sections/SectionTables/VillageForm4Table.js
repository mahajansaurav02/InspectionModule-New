import React, { useEffect, useState } from 'react'
import styles from './villageform1a.module.css'
import URLS from 'src/URLS'
import axios from 'axios'
import reqHeaders from 'src/instance/headers'
import { Toast, errorToast, successToast } from 'src/views/ui/Toast'

const districtCode = localStorage.getItem('districtCode')
const talukaCode = localStorage.getItem('talukaCode')
const codeVillage = JSON.parse(localStorage.getItem('villageData'))[0].cCode
const districtName = localStorage.getItem('districtName')
const talukaName = localStorage.getItem('talukaName')
const villageName = JSON.parse(localStorage.getItem('villageData'))[0].villageName
const revenueYear = localStorage.getItem('selectedRevenueYear')

const VillageForm4Table = () => {
  const [tableData, setTableData] = useState()

  const getTableData1B = async () => {
    axios
      .get(
        `${URLS.BaseURL}/reports/getForm4Report?revenueYear=${revenueYear}&districtCode=${districtCode}&talukaCode=${talukaCode}&cCode=${codeVillage}`,
        {
          headers: reqHeaders,
        },
      )
      .then((res) => {
        setTableData(
          res.data.form17Data.map((r) => ({
            srNo: r.id,
            caseNo: r.caseNo,
            personLiable: r.personLiable,
            khataNo: r.khataNo,

            localCess: r.localCess,
            localCessAmount: r.localCessAmount,
            bfreeOfLocalCess: r.bfreeOfLocalCess,
            amountOfZp: r.amountOfZp,
            amountOfGp: r.amountOfGp,
            natureOfCase: r.natureOfCase,
            remarks: r.remarks,
            noteOfEntryInTalukaFormIV: r.noteOfEntryInTalukaFormIV,
            otherLocalCess: r.otherLocalCess,
            otherLocalCessAmount: r.otherLocalCessAmount,
          })),
        ) // successToast('Data Successfully fetched')
      })
      .catch((err) => {
        // console.error(err)
        errorToast(err.status == 'FAILURE' ? err.message : 'Data Not Found')
      })
  }

  useEffect(() => {
    getTableData1B()
  }, [])

  return (
    <>
      <Toast position="top-center" autoClose={2500} />
      <table id="table-to-xls" className={styles.report_table}>
        <thead>
          <tr>
            <th colSpan="12">
              <h5 style={{ color: 'red' }}>
                <b>गाव नमुना चार -- संकिर्ण जमीन महसुलाची नोंदवही</b>
              </h5>
            </th>
          </tr>

          <tr>
            <th colSpan="12">
              <h5 style={{ color: 'red' }}>
                <b>( सिवाई आमदनी -- सिवाई जमाबंदी )</b>
              </h5>
            </th>
          </tr>
          <tr>
            <th colSpan="12">
              <h6 style={{ color: 'red' }}>
                <b>
                  गाव- {villageName} &nbsp; तालुका- {talukaName} &nbsp; जिल्हा- {districtName}
                </b>
              </h6>
            </th>
          </tr>
          <tr>
            <th>
              <b>अ.क्र</b>
            </th>
            <th>
              <b> प्रकरण क्रमांक</b>
            </th>
            <th>
              <b> पात्र व्यक्ती</b>
            </th>
            <th>
              <b>खाते.क्र/मक्ता खाता.क्र</b>
            </th>
            <th>
              <b>स्‍थानिक उपकरांसह</b>
            </th>
            <th>
              <b>रक्कम</b>
            </th>
            <th>
              <b>जि.प (₹)</b>
            </th>
            <th>
              <b>ग्रा.पं (₹)</b>
            </th>
            <th>
              <b>स्‍थानिक उपकरमुक्त</b>
            </th>
            <th>
              <b>रक्कम</b>
            </th>
            <th>
              <b>प्रकरणाचे स्वरूप</b>
            </th>
            <th>
              <b>तालुका नमुना सतरा मध्ये नोंद घेतल्याची टीप</b>
            </th>
          </tr>

          <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
            <th>7</th>
            <th>8</th>
            <th>9</th>
            <th>10</th>
            <th>11</th>
            <th>12</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(tableData) &&
            tableData.map((r, i) => (
              <>
                <tr>
                  <td>{i + 1}</td>
                  <td>{r.caseNo}</td>
                  <td>{r.personLiable}</td>
                  <td>{r.khataNo}</td>
                  <td>{r.localCess}</td>
                  <td>{r.localCessAmount}</td>
                  <td>{r.amountOfZp}</td>
                  <td>{r.amountOfGp}</td>
                  <td>{r.otherLocalCess}</td>
                  <td>{r.otherLocalCessAmount}</td>
                  <td>{r.natureOfCase}</td>
                  <td>{r.remarks}</td>
                </tr>
              </>
            ))}
        </tbody>
      </table>
    </>
  )
}

export default VillageForm4Table
