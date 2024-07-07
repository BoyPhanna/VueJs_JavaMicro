
import { defineStore } from 'pinia'
import axios from 'axios'
const BASE_RUL = 'http://localhost:8080/client'
export const useClientStore = defineStore('client',{
    state:()=>({
      list:[],
      clients:[],
      client:{},
      searchId:"",
      clientFilter:[],
    
    }),
    actions:{
        async findClientbyId(id){
          try{
            const response = await axios.get(`${BASE_RUL}/${id}`)
            this.client=response.data
            console.log(this.client)
            
          }
          catch(error){
            console.log('error ',error)
          }
        },
      
        async loadClients(){
          try{
            const response = await axios.get(`${BASE_RUL}`)
            this.clients=response.data
            console.log("Debug:  ")
            console.log(this.clients)
            
          }
          catch(error){
            console.log('error ',error)
          }
        },
        async deleteClient(id){
          try{
            await axios.delete(`${BASE_RUL}/${id}`)
            await this.loadClients()
            
          }
          catch(error){
            console.log('error ',error)
          }
        },
        async addClient(client){
            console.log("post ..")
            const bodyData={
                
                    "name":client.name,
                    "sex":client.sex,
                    "dob":client.dob,
                    "cid":client.cid,
                    "address":client.address,
                    "job":client.job,
                    "salary":client.salary,
                    "education":client.education,
                    "status":client.status,
                    "phone":client.phone,
               
                
             }
            console.log(bodyData)
            console.log(bodyData)
            try{
                
              await axios.post(`${BASE_RUL}`,bodyData)
            }catch(error){
              console.log('error ',error)
            }
          },
        async updateClient(id,client){
            console.log("put ..")
            const bodyData={
              "name":client.name,
              "sex":client.sex,
              "dob":client.dob,
              "cid":client.cid,
              "address":client.address,
              "job":client.job,  
              "salary":client.salary,
              "education":client.education,
             "status":client.status,
             "phone":client.phone,
             }
            console.log(bodyData)
            
            try{
                
              await axios.put(`${BASE_RUL}/${id}`,bodyData)
            }catch(error){
              console.log('error ',error)
            }
          },
          async removeDepartment(id){
         
            try{
                await axios.delete(`${BASE_RUL}/${id}`)
  
            }catch(error){
              console.log('error ',error)
            }
          },
        
    }
    
})
