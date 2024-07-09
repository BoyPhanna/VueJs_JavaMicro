<script setup>
import UserLayout from "../layout/UserLayout.vue";
import { useRoute } from 'vue-router'
import { useDepartmentStore } from '@/stores/department.js';
import { onMounted, ref, computed, reactive } from 'vue'

const departmentStore = useDepartmentStore()
const route = useRoute()
const departmentName = ref('')
onMounted(async () => {
  try {
    await departmentStore.loadStaffs(route.params.id)
    console.log(departmentStore.staffs)
    departmentName.value = departmentStore.staffs[0]['departmentName']
  }
  catch (error) {
    console.log('error ', error)
  }
})
</script>
<template>
  <UserLayout>
    <div class="flex flex-row justify-between mr-[48px] pl-[68px]">
      <div class="text-3xl font-bold mt-[10px] ">{{ departmentName }} Department</div>
      <RouterLink :to="{ name: 'staff-create', params: { id: route.params.id } }"
        class="p-[10px] pl-[20px] pr-[20px] bg-[#0000ffc8] font-semibold rounded-xl text-white mt-[15px]">
        Add new staff
      </RouterLink>
    </div>
    <div class="stats shadow">
    </div>
    <div class="overflow-x-auto pl-[60px] pr-[50px]">
      <table class="table table-xl  table-zebra">
        <thead>
          <tr class="text-[18px] bg-gray-200 rounded-xl">
            <th>No</th>
            <th>ID</th>
            <th>Name</th>
            <th>Sex</th>
            <th>Dob</th>
            <th>CID</th>
            <th>Address</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="departmentStore.staffs.length === 0">
            <td colspan="9" class="text-center text-xl text-gray-500">No staff available</td>
          </tr>
          <tr v-else v-for="(staff, index) in departmentStore.staffs" :key="staff.id">
            <th class="text-[16px] font-semibold">{{ index + 1 }}</th>
            <th class="text-[16px] font-semibold">{{ staff.id }}</th>
            <td class="text-[16px] font-semibold">{{ staff.name }}</td>
            <td class="text-[16px] font-semibold">{{ staff.sex }}</td>
            <td class="text-[16px] font-semibold">{{ staff.dob }}</td>
            <td class="text-[16px] font-semibold">{{ staff.cid }}</td>
            <td class="text-[16px] font-semibold">{{ staff.address }}</td>
            <td class="text-[16px] font-semibold">{{ staff.salary }}</td>
            <td>
              <RouterLink :to="{ name: 'staff-update', params: { id: staff.id } }"
                class="btn btn-accent mr-11 text-white bg-[#008000ab] hover:bg-[#00800063]">
                Edit
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </UserLayout>

</template>