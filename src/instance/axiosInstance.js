import { useCallback } from 'react'
// import axios from 'axios'
// import reqHeaders from './headers'
// import { Toast, errorToast, infoToast, successToast } from '../views/ui/Toast'
// const token = localStorage.getItem('token')
import api from './axiosConfig' // Import the new centralized interceptor instance

const useAxios = () => {
  const sendRequest = useCallback(
    async (url, type = 'GET', reqData, callback, errorCallback) => {
      // Headers and tokens are now managed automatically by the axiosConfig interceptors
      if (type === 'POST') {
        await api
          .post(url, reqData)
          .then((response) => {
            // if (type === 'POST') {
            //   await axios
            //     .post(url, reqData, {
            //       headers: reqHeaders,
            //     })
            //     .then((response) => {
            callback(response)
            successToast('Data Fetched Successfully')
          })
          .catch((error) => {
            console.log(error)
            errorToast(error)
            if (errorCallback) {
              errorCallback(error.response)
            }
          })
      } else if (type === 'PUT') {
        await axios
          .put(url, reqData, {
            headers: reqHeaders,
          })
          .then((response) => {
            callback(response)
            successToast('Data Fetched Successfully')
          })
          .catch((error) => {
            console.log(error)
            errorToast(error)
          })
      } else if (type === 'PATCH') {
        await axios
          .patch(url, reqData, {
            headers: reqHeaders,
          })
          .then((response) => {
            callback(response)
            successToast('Data Fetched Successfully')
          })
          .catch((error) => {
            console.log(error)
            errorToast(error)
          })
      } else if (type === 'GET') {
        await api
          .get(url)
          .then((response) => {
            // } else if (type === 'GET') {
            //   await axios
            //     .get(url, {
            //       headers: reqHeaders,
            //     })
            //     .then((response) => {
            if (response.data.status === 'FAILURE') {
              successToast(
                response.data.message ? response.data.message : 'Data Fetched Successfully',
              )
              console.log(response)
            }
            callback(response)
          })
          .catch((error) => {
            console.log('error', error)
            errorToast(error?.response?.data?.message)
            if (errorCallback) {
              errorCallback(error?.response)
            }
          })
      } else if (type === 'DELETE') {
        await axios
          .delete(url, {
            headers: reqHeaders,
          })
          .then((response) => {
            callback(response)
            successToast('Data Fetched Successfully')
          })
          .catch((error) => {
            console.log(error)
            errorToast(error)
            if (errorCallback) {
              errorCallback(error.response)
            }
          })
      }
    },
    [],
    // [token],
  )

  return {
    sendRequest,
  }
}

export default useAxios
