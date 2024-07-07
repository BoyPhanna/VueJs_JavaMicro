<script setup>
import UserLayout from "../layout/UserLayout.vue";
import {useRouter } from 'vue-router'
import {useAccountStore} from '@/stores/account.js'
import { onMounted,ref,watch } from 'vue'

const accountStore = useAccountStore()
const router = useRouter()
const search=ref('')
watch(search,()=>{
//   console.log(search.value)
  accountStore.accountFilter=accountStore.accounts.filter(account=>{
    let numberPattern = /^-?\d+(\.\d+)?$/;
    if(numberPattern.test(search.value)){
        // console.log("number")
        // console.log(`${client.id} = ${search.value} : ${client.id===Number(search.value)}`)
      return account.id.toString().includes(search.value)
    }
     
    return account.firsMemberName.includes(search.value) 
  })
})

const viewAccount=(id)=>{
  accountStore.chose=0
  accountStore.saveChose()
  router.push(`/account/${id}`)
}
onMounted(async () => {

  try {
    await accountStore.loadAccounts();
    accountStore.accountFilter=accountStore.accounts
  
  
  }
  catch (error) {
    console.log('error ', error)
  }


})
</script>
<template>

  <UserLayout>
    <div class="flex-none gap-2">
          <div class="form-control w-[300px] h-[40px] ">

            <input v-model="search" type="text" placeholder="Search"
              class="input input-bordered w-24 md:w-auto border-2 rounded-xl" />

          </div>
      </div>

    <div class="flex justify-end mr-10">
        <ul class="menu menu-vertical lg:menu-horizontal rounded-box">
  <li><RouterLink :to="{name:'account-create'}"  class="btn btn-info">New</RouterLink></li>
</ul>

    </div>


    <div class="overflow-x-auto">
      <table class="table table-xl  table-zebra">
        <thead>
          <tr>
              <th>No</th>
              <th>ID</th>
            <th>CO</th>
            <th>AA</th>
            <th>BM</th>
            <th>Amount</th>
            <th>Term</th>
            <th>Rate</th>
            <th>Debusdate</th>
            <th>OS</th>
            <th>Account name</th>
            <th>Address</th>
            <th>Deposit</th>
            <th>Close</th>
         

          </tr>
        </thead>
        <tbody>
          <tr v-for="(account, index) in accountStore.accountFilter" :key="account.id">
            <th>{{ index + 1 }}</th>
            <td>{{ account.id}}</td>
            <th>{{ account.coName }}</th>
            <td>{{ account.aaName}}</td>
            <td>{{ account.bmName }}</td>
            <td>{{ account.amount }}</td>
            <td>{{ account.term }}</td>
            <td>{{ account.rate }}</td>
            <td>{{ account.debusdate }}</td>
            <td>{{ account.os }}</td>
            <td>{{ account.firsMemberName }}</td>
            <td>{{ account.address }}</td>
            <td>{{ account.deposit }}</td>
            <td>{{ account.close}}</td>
         
            <td>
              <button @click="viewAccount(account.id)" class=" btn btn-accent mr-11">
                View
              </button>
            </td>


          </tr>

        </tbody>

      </table>
    </div>

  </UserLayout>

</template>