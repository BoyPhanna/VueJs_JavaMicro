
import { defineStore } from 'pinia'
import axios from 'axios'
const BASE_RUL = 'http://localhost:8080/account'
export const useAccountStore = defineStore('account', {
  state: () => ({
    list: [],
    accounts: [],
    accountFilter:[],
    account: {},
    searchId: "",
    chose:0,
    schedule:{},
    history:{},
    historyPayments:[],
    canvas:null,
    loanOverdues:{},
    barOption:{},
  

  }),
  actions: {
     saveChose(){
      localStorage.setItem('chose', JSON.stringify(this.chose));
    },
     loadChose(){
      const savedState = localStorage.getItem('chose');
            if (savedState) {
                this.chose = JSON.parse(savedState);
            }
    },
    async findAccountById(id) {
      try {
        const response = await axios.get(`${BASE_RUL}/${id}`)
        this.account = response.data
        console.log(this.account)

      }
      catch (error) {
        console.log('error ', error)
      }
    },

    async loadAccounts() {
      try {
        const response = await axios.get(`${BASE_RUL}`)
        this.accounts = response.data
        console.log("Debug:  ")
        console.log(this.accounts)

      }
      catch (error) {
        console.log('error ', error)
      }
    },
    async loadSchedule(id) {
      try {
        const response = await axios.get(`${BASE_RUL}/${id}/scheduleclient`)
        this.schedule = response.data
        console.log("Debug:  ")
        console.log(this.schedule)

      }
      catch (error) {
        console.log('error ', error)
      }
    },
   
    async loadHistory(id) {
      try {
        const response = await axios.get(`${BASE_RUL}/history/${id}`)
        this.history = response.data
        console.log("Debug:  ")
        console.log(this.history)

      }
      catch (error) {
        console.log('error ', error)
      }
    },
   
    async loadHistoryPayments(id) {
      try {
        const response = await axios.get(`${BASE_RUL}/pay/${id}`)
        this.historyPayments = response.data
        console.log("Debug:  ")
        console.log(this.historyPayments)

      }
      catch (error) {
        console.log('error ', error)
      }
    },
    async loadLoanOverDues() {
      try {
        const response = await axios.get(`${BASE_RUL}/overdue`)
        this.loanOverdues = response.data
        console.log("Debug:  ")
        console.log(this.loanOverdues)

        this.barOption={
          options: {
            chart: {
              id: 'vuechart-example'
            },
            xaxis: {
              categories: this.loanOverdues.years
            }
          },
          series: [{
            name: 'account ',
            data: this.loanOverdues.loanDisburses
          }]
        }

      }
      catch (error) {
        console.log('error ', error)
      }
    },
    async addAccount(accountInfo) {

      const bodyData={
        "amount":accountInfo.amount,
        "term":accountInfo.term,
        "rate":accountInfo.rate,
        "coId":accountInfo.coId,
        "aaId":accountInfo.aaId,
        "bmId":accountInfo.bmId,
        "firstMemberId":accountInfo.firstMemberId,
        "secondMemberId":accountInfo.secondMemberId
       }
      try {
        console.log("wow ....")
        await axios.post(`${BASE_RUL}`,bodyData)  
      }
      catch (error) {
        console.log('error ', error)
      }
    },
    async pay(payInfo) {
     
      const bodyData={
        "accountId":payInfo.accountId,
        "amount":payInfo.amount,
        
       }
      try {
        console.log("wow ....")
        await axios.post(`${BASE_RUL}/pay`,bodyData)  
      }
      catch (error) {
        console.log('error ', error)
      }
    },
    async runSystem() {
     
      
      try {
        console.log("wow ....")
        await axios.post(`${BASE_RUL}/runsystem`)  
      }
      catch (error) {
        console.log('error ', error)
      }
    },
   
   
  }

})
