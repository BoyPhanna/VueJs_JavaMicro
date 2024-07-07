<script setup>
import UserLayout from "../layout/UserLayout.vue";
import {useRouter } from 'vue-router'
import {useAccountStore} from '@/stores/account.js'
import { onMounted,reactive } from 'vue'

const accountStore = useAccountStore()
const router = useRouter()
const printTable = () => {
  const printContents = document.querySelector('.tablePrint').outerHTML;
  const originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
  window.location.reload();
};

const barOption =reactive({
  options: {
    chart: {
      id: 'vuechart-example'
    },
    xaxis: {
      categories: []
    }
  },
  series: [{
    name: 'account ',
    data: [10,20,30,40,50,100]
  }]
}) 

const donutOption = reactive({
    options:{
 
    labels: ['Nomal', '0-29 days', '30-89 days', '90-360 day','write off'],
  },
  series: [99,11,2,1,1]
}) 
onMounted(async () => {

  try {
    await accountStore.loadLoanOverDues();
    barOption.options.xaxis.categories=accountStore.loanOverdues.years
    barOption.series.data=accountStore.loanOverdues.loanDisburses
    console.log(`log merl : ${accountStore.loanOverdues.years}`)
    barOption.series=[{
      name:"account",
      data: accountStore.loanOverdues.loanDisburses
    }
  ]
  donutOption.series=accountStore.loanOverdues.qlyLoans
  
  }
  catch (error) {
    console.log('error ', error)
  }


})

</script>

<template>
  <UserLayout>
    <h1 class="text-4xl mb-4">Loan over due</h1>
    <div class="flex justify-end pr-10">

      <img @click="printTable()"  alt="Vue logo" class=" w-11 h-11 mr-[2px]" src="@/assets/icon/print.svg" />

    </div>

    <div class="tablePrint">

          <div class="bg-white w-full p-10 rounded-lg mx-auto mt-10 ">
        <div class="flex mb-4 ">
      <div class="stats w-full shadow">
        <div class="stat">
          <div class="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M144 0c-17.7 0-32 14.3-32 32V64H37.6C16.8 64 0 80.8 0 101.6V224v41.7V288 406.3c0 23 18.7 41.7 41.7 41.7H112v32c0 17.7 14.3 32 32 32s32-14.3 32-32V448h32c61.9 0 112-50.1 112-112c0-40.1-21.1-75.3-52.7-95.1C280.3 222.6 288 200.2 288 176c0-61.9-50.1-112-112-112V32c0-17.7-14.3-32-32-32zM112 128v96H64V128h48zm64 96V128c26.5 0 48 21.5 48 48s-21.5 48-48 48zm-64 64v96H64V288h48zm64 96V288h32c26.5 0 48 21.5 48 48s-21.5 48-48 48H176z"/></svg>
          </div>
          <div class="stat-title">OS</div>
          <div class="stat-value">{{ accountStore.loanOverdues.os }}</div>
        </div>
        <div class="stat">
          <div class="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M448 80v48c0 44.2-100.3 80-224 80S0 172.2 0 128V80C0 35.8 100.3 0 224 0S448 35.8 448 80zM393.2 214.7c20.8-7.4 39.9-16.9 54.8-28.6V288c0 44.2-100.3 80-224 80S0 332.2 0 288V186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6V432c0 44.2-100.3 80-224 80S0 476.2 0 432V346.1z"/></svg>
          </div>
          <div class="stat-title">Loans</div>
          <div class="stat-value">{{ accountStore.loanOverdues.loans }}</div>
        </div>
        <div class="stat">
          <div class="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
          </div>
          <div class="stat-title">Nomal loans</div>
          <div class="stat-value">{{ accountStore.loanOverdues.normal}}</div>
        </div>
      </div>
    </div>
    <div class="flex flex-col md:flex-row gap-2">
      <div class="flex-1">
        <div class="card w-2/3 p-6 bg-white shadow-xl">
          <h1>សំទុះការចេញកម្ចី</h1>
          <apexchart type="bar" :options="accountStore.barOption.options" :series="accountStore.barOption.series"></apexchart>
        </div>
      </div>
      <div class="flex-1">
        <div class="card w-2/3 p-6 bg-white shadow-xl">
          <h1>គុណភាពកម្ចី</h1>
          <apexchart type="donut" :options="donutOption.options"  :series="donutOption.series"></apexchart>
        </div>
      </div>
    </div>
    </div>
   

    
    <div class="overflow-x-auto p-11">
      <table class="table table-xl  table-zebra">
        <thead>
          <tr>
              <th>No</th>
              <th>Name</th>
              <th>Account ID</th>
            <th>Account Name</th>
            <th>Date Disburse</th>
            <th>Disburse Amount</th>
            <th>OS</th>
            <th>Principal</th>
            <th>Interes</th>
            <th>Total</th>
            <th>Overdue from Date</th>
            <th>Day overdue</th>
            <th>Phone</th>
            <th>Address</th>
       
         

          </tr>
        </thead>
        <tbody>
          <tr v-for="(account, index) in accountStore.loanOverdues.scheduleOverDues" :key="account.id">
            <th>{{ index + 1 }}</th>
            <td>{{ account.coName}}</td>
            <th>{{ account.accountId }}</th>
            <td>{{ account.accountName}}</td>
            <td>{{ account.disburseDate }}</td>
            <td>{{ account.disburseAmount }}</td>
            <td>{{ account.os }}</td>
            <td>{{ account.principalDue }}</td>
            <td>{{ account.interestDue }}</td>
            <td>{{ account.totalDue}}</td>
            <td>{{ account.dateDue }}</td>
            <td>{{ account.dayOverDue }}</td>
            <td>{{ account.phone }}</td>
            <td>{{ account.address}}</td>
         
          


          </tr>

        </tbody>

      </table>
    </div>
    </div>

  </UserLayout>
</template>