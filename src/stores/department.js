
import { defineStore } from 'pinia'
import axios from 'axios'
const BASE_RUL = 'http://localhost:8080/department'
export const useDepartmentStore = defineStore('department',{
    state:()=>({
      list:[],
      departmentFilter:[],
      staffs:[],
      searchId:"",
      statuses:['Pending','Doing','Done']
    }),
    actions:{
        async loadDepartments(){
          try{
            const response = await axios.get(`${BASE_RUL}`)
            this.list=response.data
            console.log(this.list)
            
          }
          catch(error){
            console.log('error ',error)
          }
        },
        async loadStaffs(id){
          try{
            const response = await axios.get(`${BASE_RUL}/${id}/stuffs`)
            this.staffs=response.data
            console.log("Debug:  ")
            console.log(this.staffs)
            
          }
          catch(error){
            console.log('error ',error)
          }
        },
        async addDepartment(department){
            console.log("post ..")
            const bodyData={
             "name":department.name,
             "imageURL":department.imageURL
             }
            console.log(bodyData)
            console.log(bodyData)
            try{
                
              await axios.post(`${BASE_RUL}`,bodyData)
              await loadDepartments()
            }catch(error){
              console.log('error ',error)
            }
          },
        async updateDepartment(id,department){
            console.log("put ..")
            const bodyData={
             "name":department.name,
             "imageURL":department.imageURL
             }
            console.log(bodyData)
            console.log(bodyData)
            try{
                
              await axios.put(`${BASE_RUL}/${id}`,bodyData)
              await loadDepartments()
            }catch(error){
              console.log('error ',error)
            }
          },
          async removeDepartment(id){
         
            try{
                await axios.delete(`${BASE_RUL}/${id}`)
                await loadDepartments()
            }catch(error){
              console.log('error ',error)
            }
          },
        
    }
    
})
