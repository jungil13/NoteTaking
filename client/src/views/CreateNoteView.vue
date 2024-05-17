<template>
   <nav
      class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 py-1">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/logsa.png" class="h-12" alt="Flowbite Logo">
        </a>
        <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button data-collapse-toggle="navbar-sticky" type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky">
          <ul
            class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <router-link to="/createnote"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Add
                Notes</router-link>
            </li>
            <li>
              <router-link to="/note"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">My
                Notes</router-link>
            </li>
            <li>
              <router-link class="logout text-white font-semibold" to="#" @click="logout">Logout</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="max-w-md mx-auto mt-8 py-14 my-14">
      <h1 class="flex justify-center text-3xl font-bold pb-4 text-white">Create a Note</h1>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div class="sm-2xl">
          <label for="title" class="block text-sm font-medium text-white">Title</label>
          <input type="text" v-model="note.title" id="title" name="title" class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        </div>
        <div>
          <label for="content" class="block text-sm font-medium text-white">Content</label>
          <textarea v-model="note.content" id="content" name="content" rows="4" class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
        </div>
        <button type="submit" class="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
      </form>
    </div>
  </template>  
  
  <script>
  import axios from 'axios';
  import { useUserStore } from '@/stores/user';
  import Swal from 'sweetalert2';

  export default {
    data() {
      return {
        note: {
          title: '',
          content: '',
        },
        myStore: useUserStore()
      };
    },
    methods: {
      async submitForm() {
        try {
          const response = await axios.post("http://127.0.0.1:8000/api/note", this.note);
          console.log(response.data);
          Swal.fire({
            icon: 'success',
            title: 'Saved successfully',
            showConfirmButton: false,
            timer: 1500
          });
        } catch (error) {
          console.error('Error while saving data:', error);
          Swal.fire({
            icon: 'error',
            title: 'Failed to save',
            text: 'Please try again'
          });
        }
      },
      logout() {
        Swal.fire({
          title: 'Are you sure you want to log out?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, log out'
        }).then((result) => {
          if (result.isConfirmed) {
            const data = new FormData();
            data.append('tokenValue', localStorage.getItem('token'));
            axios.post('http://127.0.0.1:8000/api/logout', data, {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
            }).then((res) => {
              localStorage.removeItem('token');
              this.myStore.isLoggedIn = false; // Corrected from myStore to this.myStore
              this.$router.push('/login'); // Corrected from router to this.$router
            }).catch((error) => {
              console.error('Error logging out:', error);
            });
          }
        });
      },
    }
  }
</script>
