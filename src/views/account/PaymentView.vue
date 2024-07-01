<script setup>
import UserLayout from '../layout/UserLayout.vue';
import { reactive,ref,onMounted } from 'vue';
import { useAccountStore } from '@/stores/account.js';
import { useRoute } from 'vue-router';
const accountStore=useAccountStore()
const route=useRoute()
const test=ref('')
const payInfo=reactive(
    {
        
    "accountId":852,
    "amount":200

}
)

onMounted(()=>{
    
})
const addAccount=async ()=>{

  try{
        console.log("try to add")
      await accountStore.pay(payInfo)
   
  
  }catch(error){
    console.log('error ',error)
  }

}

</script>

<template>
    

    <UserLayout>
        <div class="bg-white w-3/5 p-10 rounded-lg mx-auto mt-10">

            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label for="first_name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Account ID</label>
                    <input v-model="payInfo.accountId" type="number" id="first_name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="John" required />
                </div>
                <div>
                    <label for="first_name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
                    <input v-model="payInfo.amount" type="number" id="first_name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="John" required />
                </div>
               
               
                
                
              
               
             
               
            </div>
           


     


            <button @click="addAccount()"  class="btn btn-info">Save</button>
             </div>
    </UserLayout>

</template>