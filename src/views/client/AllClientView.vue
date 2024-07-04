<script setup>
import UserLayout from "../layout/UserLayout.vue";

import { useClientStore } from '@/stores/client.js';
import { onMounted, } from 'vue'
import Swal from 'sweetalert2'

const clientStore = useClientStore()


onMounted(async () => {
  try {
    await clientStore.loadClients()
  
  
  }
  catch (error) {
    console.log('error ', error)
  }
})
const deleteClient= (id)=>Swal.fire({
  title: "Do you want to Delete this Client?",
  showDenyButton: true,

  confirmButtonText: "Cancel",
  denyButtonText: `Delete`
}).then(async (result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    Swal.fire("Cancel!", "", "info");
  } else if (result.isDenied) {
    Swal.fire("Deleted", "", "success");
    await clientStore.deleteClient(id)
    await clientStore.loadClients()
  }
});
</script>
<template>

  <UserLayout>
    <div class="flex flex-row justify-between pr-80 pl-10">
      <div class="text-3xl font-bold ">All Clients</div>
      <RouterLink :to="{name:'add-new-client'}" class="btn btn-info ">Add new client
      </RouterLink>
    </div>

    <div class="stats shadow">


    </div>


    <div class="overflow-x-auto">
      <table class="table table-xl  table-zebra">
        <thead>
          <tr>
            <th>No</th>
            <th>ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Dob</th>
            <th>CID</th>
            <th>Address</th>
            <th>Job</th>
            <th>Salary</th>
            <th>Education</th>
            <th>Status</th>
            <th>Phone</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="(client, index) in clientStore.clients" :key="client.id">
            <th>{{ index + 1 }}</th>
            <th>{{ client.id }}</th>
            <td>{{ client.name }}</td>
            <td>{{ client.sex }}</td>
            <td>{{ client.dob }}</td>
            <td>{{ client.cid }}</td>
            <td>{{ client.address }}</td>
            <td>{{ client.job }}</td>
            <td>{{ client.salary }}</td>
            <td>{{ client.education }}</td>
            <td>{{ client.status }}</td>
            <td>{{ client.phone }}</td>
            <td>
              <button  v-if="!client.haveAccount"  @click="deleteClient(client.id)" class=" btn btn-error mr-11">
                Delete
              </button>
            </td>
            <td>
              <RouterLink :to="{name:'update-client', params: { id: client.id }}"  class=" btn btn-accent mr-11">
                Edit
              </RouterLink>
            </td>


          </tr>

        </tbody>

      </table>
    </div>

  </UserLayout>

</template>