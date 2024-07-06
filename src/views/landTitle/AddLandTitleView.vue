<script setup>
import UserLayout from '../layout/UserLayout.vue';
import { reactive } from 'vue';
import { useLandTitleStore } from '@/stores/landTitle.js';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2'

const landTitleStore=useLandTitleStore()
const router=useRouter()

const landTitleInfo=reactive(
    {
      
    "type": "លិខិតផ្ទេរសិទ្ធ",
    "confirmBy": "ចៅសង្កាត់",
    "firstOwner": "kkk",
    "secondOwner": "BB",
    "area": 22.33,
    "address": "បឹងសាឡាង",
    "accountId": 703,
    "accountName": "ខ"
}
)


const addLandTitle=async ()=>{

  try{
        console.log("try to add")
      await landTitleStore.addLandTitle(landTitleInfo)
      Swal.fire({
  position: "top-center",
  icon: "success",
  title: "Land title has been saved",
  showConfirmButton: false,
  timer: 1500
});
router.back()
  
  }catch(error){
    console.log('error ',error)
  }

}

</script>

<template>

<UserLayout>
        <div class="bg-white w-3/5 p-10 rounded-lg mx-auto mt-10">
            <div class="grid gap-6 mb-6 md:grid-cols-1">
                <div>
                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First
                        Owner</label>
                    <input v-model="landTitleInfo.firstOwner" type="text" id="first_name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="John" required />
                </div>
                <div>
                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Second
                        Owner</label>
                    <input v-model="landTitleInfo.secondOwner" type="text" id="first_name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="John" required />
                </div>
                <div>
                    <label for="last_name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
                    <input v-model="landTitleInfo.type" type="text" id="last_name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Doe" required />
                </div>
                <div>
                    <label for="company"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Arrea</label>
                    <input v-model="landTitleInfo.area" type="text" id="company"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Flowbite" required />
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                    <input v-model="landTitleInfo.address" type="textarea" maxlength="255"
                        class=" h-60 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required />
                </div>
                <div class=" w-52">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        <span class="label-text">Account ID</span>
                        <input v-model="landTitleInfo.accountId" type="Text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </label>
                </div>
            </div>
            <button  @click="addLandTitle()" class="btn btn-info">Save</button>
        </div>
    </UserLayout>
    
</template>


