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

const VillageForm17Table = () => {
  const [tableData, setTableData] = useState()
  const [totalArea, setTotalArea] = useState(0)
  const [netAffectedArea, setNetAffectedArea] = useState(0)
  const [netAssessment, setNetAssessment] = useState(0)

  const getTableData = async () => {
    axios
      .get(
        `${URLS.BaseURL}/form17/getForm17Report?revenueYear=${revenueYear}&districtCode=${districtCode}&talukaCode=${talukaCode}&cCode=${codeVillage}`,
        {
          headers: reqHeaders,
        },
      )
      .then((res) => {
        res.data.form17Data.map((r) => {
          setTotalArea((prevTotalArea) => prevTotalArea + parseFloat(r.totalArea))
          setNetAssessment(
            (prevTotalAssessment) => prevTotalAssessment + parseFloat(r.assessment) / 2,
          )
          setNetAffectedArea(
            (prevAffectedArea) => prevAffectedArea + parseFloat(r.areaAffected) / 2,
          )
        })
        setTableData(
          res.data.form17Data.map((row) => ({
            khataNo: row.khataNo === null ? row.makhtaKhataNo : row.khataNo,
            caseNo: row.caseNo,
            id: row.id,
            totalArea: row.totalArea,
            assessment: row.assessment,
            personLiable: row.personLiable,
            natureOfCase: row.natureOfCase,
            areaAffected: row.areaAffected,
            amountOfJm: row.amountOfJm,
            amountOfZp: row.amountOfZp,
            amountOfGp: row.amountOfGp,
            periodIfMoreThanOneYear: row.periodIfMoreThanOneYear,
            noteOfEntryInTalukaFormIV: row.noteOfEntryInTalukaFormIV,
          })),
        )
        successToast('Data Successfully fetched')
      })
      .catch((err) => {
        errorToast(err.status == 'FAILURE' ? err.message : err?.response?.data?.message)
      })
  }

  useEffect(() => {
    getTableData()
  }, [])

  return (
    <>
      <Toast position="top-center" autoClose={2500} />
      <table id="table-to-xls" className={styles.report_table}>
        <thead>
          <tr>
            <th colSpan="13">
              <h6 style={{ color: 'red' }}>
                <b>गाव नमुना सतरा</b>
              </h6>
            </th>
          </tr>
          <tr>
            <th colSpan="13">
              <h6 style={{ color: 'red' }}>
                <b>प्रकरणाचा अहवाल</b>
              </h6>
            </th>
          </tr>
          <tr>
            <th colSpan="13">
              <h6 style={{ color: 'red' }}>
                <b>प्रकरणाचे वर्णन (दोन किंवा तीन शब्दात)</b>
              </h6>
            </th>
          </tr>
          <tr>
            <th colSpan="13">
              <h6 style={{ color: 'red' }}>
                <b>शेतीद्वारे सरकारी जमिनीचे अतिक्रमण - विविध महसूल आकारणीचा अहवाल</b>
              </h6>
            </th>
          </tr>
          <tr>
            <th>
              <b>अ.क्र.</b>
            </th>
            <th>
              <b>खाता क्र.</b>
            </th>
            <th>
              <b>जबाबदार व्यक्ती</b>
            </th>
            <th>
              <b>केसचे स्वरूप</b>
            </th>
            <th>
              <b>एकूण क्षेत्रफळ</b>
            </th>
            <th>
              <b>प्रभावित क्षेत्र</b>
            </th>
            <th>
              <b>आकारणी</b>
            </th>
            <th>
              <b>एलआरची रक्कम स्वतंत्रपणे</b>
            </th>
            <th>
              <b>एलसीची रक्कम स्वतंत्रपणे</b>
            </th>
            <th>
              <b>ग्रा.प रक्कम स्वतंत्रपणे</b>
            </th>
            <th>
              <b>वर्षापेक्षा जास्त कालावधी</b>
            </th>
            <th>
              <b>तालुका प्रपत्र IV मध्ये नोंदीची नोंद</b>
            </th>
            <th>
              <b>गाव नमुना IV चा अनुक्रमांक</b>
            </th>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
            <td>8</td>
            <td>9</td>
            <td>10</td>
            <td>11</td>
            <td>12</td>
            <td>13</td>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(tableData) &&
            tableData.map((r, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{r.khataNo}</td>
                <td>{r.personLiable}</td>
                <td>{r.natureOfCase}</td>
                <td>{r.totalArea}</td>
                <td>{r.areaAffected}</td>
                <td>{r.assessment}</td>
                <td>{r.amountOfJm}</td>
                <td>{r.amountOfZp}</td>
                <td>{r.amountOfGp}</td>
                <td>{r.periodIfMoreThanOneYear}</td>
                <td>{r.noteOfEntryInTalukaFormIV}</td>
                <td></td>
              </tr>
            ))}

          <tr>
            <td colSpan={4}>
              <b>एकूण</b>
            </td>
            <td>
              <b>{totalArea}</b>
            </td>
            <td>
              <b>{netAffectedArea.toFixed(2)}</b>
            </td>
            <td>
              <b>{netAssessment}</b>
            </td>
            <td colSpan={7}></td>
          </tr>
        </tbody>
        {/*   <tr style={{ height: '20px' }}>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr> */}
      </table>
    </>
  )
}

export default VillageForm17Table
