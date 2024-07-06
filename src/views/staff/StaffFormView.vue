<script setup>
import UserLayout from '../layout/UserLayout.vue';
import { reactive,ref,onMounted } from 'vue';
import { useStaffStore } from '@/stores/staff.js';
import { useRoute,useRouter } from 'vue-router';
import Swal from 'sweetalert2'

const staffStore=useStaffStore()
const route=useRoute()
const router=useRouter()
const test=ref('')
const staffInfo=reactive(
    {
    "name":"ក​",
    "sex":"M",
    "dob":"2000-03-03",
    "cid":"02359844",
    "address":"ភ្នំពេញ",
    "status":false,
    "salary":200,
    "startWork":"2023-05-12",
    "stopWork":false,
    "departmentId":0
}
)

onMounted(()=>{
    staffInfo.departmentId=route.params.id
})
const addStaff=async ()=>{

  try{
        console.log("try to add")
      await staffStore.addStaff(staffInfo)
   
      router.back()
      Swal.fire({
  title: 'Success!',
  text: 'Add new staff Success',
  icon: 'success',
  confirmButtonText: 'Okay'
})

  }catch(error){
    console.log('error ',error)
  }

}
const showTest=async()=>{
    test.value=staffInfo.name
}
</script>

<template>
    

    <UserLayout>
        <div class="bg-white w-3/5 p-10 rounded-lg mx-auto mt-10">
            <div class="grid gap-6 mb-6 md:grid-cols-1">
                <div class="w-[100%] flex justify-between">
                    <div class="w-[48%]">
                        <label for="first_name"
                            class="block mb-2 text-[16px] font-semibold text-gray-900 dark:text-white">Name*</label>
                        <input v-model="staffInfo.name" type="text" id="first_name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="John" required />
                    </div>
                    <div class="w-[48%]">
                        <label for="first_name"
                            class="block mb-2 text-[16px] font-semibold text-gray-900 dark:text-white">Gender</label>
                        <input v-model="staffInfo.sex" type="text" id="first_name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="John" required />
                    </div>
                </div>
                <div class="w-[100%] flex justify-between">
                    <div class="w-[48%]">
                        <label for="last_name"
                            class="block mb-2 text-[16px] font-semibold text-gray-900 dark:text-white">Date of
                            Birth*</label>
                        <input v-model="staffInfo.dob" type="text" id="last_name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Doe" required />
                    </div>
                    <div class="w-[48%]">
                        <label for="company"
                            class="block mb-2 text-[16px] font-semibold text-gray-900 dark:text-white">CID*</label>
                        <input v-model="staffInfo.cid" type="text" id="company"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Flowbite" required />
                    </div>
                </div>
                <div>
                    <label class="block mb-2 text-[16px] font-semibold text-gray-900 dark:text-white">Address*</label>
                    <input v-model="staffInfo.address" type="textarea" maxlength="255"
                        class=" h-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required />
                </div>
                <div class=" w-52">
                    <label class="label cursor-pointer">
                        <span class="label-text text-[16px] font-semibold">Status</span>
                        <input v-model="staffInfo.status" type="checkbox" class="toggle toggle-accent"
                            checked="checked" />
                    </label>
                </div>
                <div class="w-[100%] flex justify-between">
                    <div class="w-[48%]">
                        <label
                            class="block mb-2 text-[16px] font-semibold text-gray-900 dark:text-white">Salary*</label>
                        <input v-model="staffInfo.salary" type="number" min="100"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required />
                    </div>
                    <div class="w-[48%]">
                        <label class="block mb-2 text-[16px] font-semibold text-gray-900 dark:text-white">Date start
                            work*</label>
                        <input v-model="staffInfo.startWork" type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required />
                    </div>
                </div>
            </div>
            <div class="mb-6">
                <label class="block mb-2 text-[16px] font-semibold text-gray-900 dark:text-white">Department ID*</label>
                <input v-model="staffInfo.departmentId" type="number"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required />
            </div>
            <div class="flex items-start mb-6">
                <div class="flex items-center h-5">
                    <input v-model="staffInfo.stopWork" id="remember" type="checkbox" value=""
                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                        required />
                </div>
                <label for="remember" class="ms-2 text-[16px] font-semibold text-gray-900 dark:text-gray-300">Stop work
                </label>
            </div>
            <div class="flex justify-end">
                <button @click="addStaff()" class="text-[16px] font-semibold bg-[#0000ffc6] p-[8px] pl-[15px] pr-[15px] rounded-xl text-white">Save</button>
            </div>
        </div>
    </UserLayout>

</template>