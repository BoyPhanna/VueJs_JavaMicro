<script setup>
import UserLayout from "../layout/UserLayout.vue";
import { onMounted, ref, reactive, watch } from 'vue'
import { useDepartmentStore } from '@/stores/department.js';

const departmentStore = useDepartmentStore()
const isLoading = ref(false)
const isUpdate = ref(false)
const department = reactive({
  id: 0,
  name: "",
  imageURL: ""
})
const search = ref('')
watch(search, () => {
  //   console.log(search.value)
  departmentStore.departmentFilter = departmentStore.list.filter(department => {
    let numberPattern = /^-?\d+(\.\d+)?$/;
    if (numberPattern.test(search.value)) {
      // console.log("number")
      // console.log(`${client.id} = ${search.value} : ${client.id===Number(search.value)}`)
      return department.id.toString().includes(search.value)
    }

    return department.name.includes(search.value)
  })
})

onMounted(async () => {
  isLoading.value = true
  try {
    await departmentStore.loadDepartments()
    departmentStore.departmentFilter = departmentStore.list
  }
  catch (error) {
    console.log('error ', error)
  }
  isLoading.value = false
})

const addDepartment = async () => {
  isLoading.value = true
  try {
    console.log("try to add")
    await departmentStore.addDepartment(department)
    await departmentStore.loadDepartments()
    department.id = 0;
    department.name = ""
    department.imageURL = ""
  } catch (error) {
    console.log('error ', error)
  }
  isLoading.value = false
}
const deleteDepartment = async (id) => {
  isLoading.value = true
  try {
    console.log("try to add")
    await departmentStore.removeDepartment(id)
    await departmentStore.loadDepartments()

  } catch (error) {
    console.log('error ', error)
  }
  isLoading.value = false
}
const editDepartment = async (id, name, imageURL) => {
  department.id = id
  department.name = name
  department.imageURL = imageURL
  isUpdate.value = true
}
const updateDepartment = async () => {
  console.log("Update....")

  await departmentStore.updateDepartment(department.id, department)
  await departmentStore.loadDepartments()
  isUpdate.value = false
  department.id = 0;
  department.name = ""
  department.imageURL = ""
}
const updateOrAddDepartment = () => {
  if (isUpdate.value) {
    updateDepartment()
  }
  else {
    addDepartment()
  }
}



</script>

<template>

  <UserLayout>
    <div class="flex-none gap-2">
      <div class="form-control w-[300px] h-[40px] m-auto mt-[10px]">
        <input v-model="search" type="text" placeholder="Search department"
          class="input input-bordered w-24 md:w-auto border-2 rounded-xl" />
      </div>
    </div>
    <div class="flex py-11 px-36 space-x-8  w-full h-full">
      <div class="flex-1 relative">
        <div v-if="departmentStore.departmentFilter.length === 0" class="text-center text-xl text-gray-500 absolute top-[50%] left-[50%]">
          <p class="text-[70px] mb-[20px]">?</p>
          No department available
        </div>
        <div v-else class="grid grid-cols-4 gap-4">
          <div class="card card-compact w-full bg-sky-50 shadow-xl"
            v-for="department in departmentStore.departmentFilter" :key="department.id">
            <figure>
              <img class="h-48 w-full object-cover" :src="department.imageURL" :alt="department.name" />
            </figure>
            <div class="card-body">
              <h2 class="card-title text-[23px] capitalize">{{ department.name }}</h2>
              <h1 class="text-[14px] font-semibold">Identity : {{ department.id }}</h1>
              <div class="text-[14px] font-semibold flex">
                Employee :
                <div class=" ml-[5px] text-orange-500">{{ department.stuffMembers }}</div>
              </div>
              <div class="card-actions justify-end">
                <button v-if="department.stuffMembers === 0" @click="deleteDepartment(department.id)"
                  class="p-[10px] bg-[red] hover:bg-[#ff000077] text-white font-semibold rounded-xl">Delete</button>
                <button @click="editDepartment(department.id, department.name, department.imageURL)"
                  class="p-[10px] pl-[20px] pr-[20px] bg-[#03ac03] hover:bg-[#03ac0372] text-white font-semibold rounded-xl">Edit</button>
                <RouterLink :to="{ name: 'department-staff', params: { id: department.id } }"
                  class="p-[10px] pl-[15px] pr-[15px] bg-[#0000ffd0] hover:bg-[#0000ff95] text-white font-semibold rounded-xl">
                  View</RouterLink>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Form -->
      <div class="flex-none w-80">
        <div class="card w-full max-w-sm shadow-2xl bg-gray-100">
          <dev class="card-body">
            <div class="">
              <label class="label">
                <span class="text-[20px] font-semibold capitalize ">Deparment name</span>
              </label>
              <input type="text" v-model="department.name" placeholder="Department name"
                class="input input-bordered w-[250px]" required />
            </div>
            <div class="">
              <label class="label">
                <span class="text-[20px] capitalize font-semibold">Image URL</span>
              </label>
              <input type="text" v-model="department.imageURL" placeholder="URL" class="input input-bordered w-[250px]"
                required />
            </div>
            <div class=" flex justify-end mt-[10px] mr-[10px]">
              <button @click="updateOrAddDepartment()"
                class="p-[10px] pl-[15px] pr-[15px] bg-[#0000ffd0] hover:bg-[#0000ff95] text-white font-semibold rounded-xl">{{
                  isUpdate ? "Update" : "Save" }}</button>
            </div>
          </dev>
        </div>
      </div>
    </div>

  </UserLayout>
</template>