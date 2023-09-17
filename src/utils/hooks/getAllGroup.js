import { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance'

const useGetAllGroup = () => {
   const [groups, setGroups] = useState([])
   const [selectedGroupID, setSelectedGroupID] = useState(null)
   const fetchData = async () => {
      try {
         const response = await axiosInstance.get('/api/groups')
         setGroups(response.data)
         return response.data.studentResponses
      } catch (error) {
         return error
      }
   }
   useEffect(() => {
      fetchData()
   }, [])
   const groupOptions = groups.map((group) => ({
      value: group.id,
      label: group.groupName,
   }))
   return {
      groupOptions,
      selectedGroupID,
      setSelectedGroupID,
   }
}

export default useGetAllGroup
