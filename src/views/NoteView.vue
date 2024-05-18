<template>
    <nav
        class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 py-1">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a class="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="/logsa.png" class="h-12" alt="Flowbite Logo">
            </a>
            <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <router-link class="block py-2 px-3 text-white font-semibold bg-red-500 rounded-full hover:bg-red-600"
                    to="#" @click="logout"><i class="fa fa-sign-out mr-2" aria-hidden="true"></i>Logout</router-link>
                <button data-collapse-toggle="navbar-sticky" type="button"
                    class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-sticky" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>
            <div class="items-center justify-center hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                <ul
                    class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                        <router-link to="/createnote"
                            class="block py-2 px-3 text-white font-semibold bg-blue-500 rounded-full hover:bg-blue-600 mb-2"><i
                                class="fa fa-plus mr-2" aria-hidden="true"></i>Add
                            Notes</router-link>
                    </li>
                    <li>
                        <router-link to="/note"
                            class="block py-2 px-3 text-white font-semibold bg-blue-500 rounded-full hover:bg-blue-600 mb-2"><i
                                class="fa fa-sticky-note mr-2" aria-hidden="true"></i>My
                            Notes</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="mx-auto container py-20 px-6">
        <div>
            <h2 class="d-flex text-center my-14 font-extrabold text-4xl text-white">My Notes</h2>
        </div>
        <div class="flex justify-center items-center mb-4">
    <input v-model="searchQuery" 
           type="text" 
           id="search" 
           name="search" 
           placeholder="Search notes..." 
           @input="searchNotes" 
           class="px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500">
    <button @click="searchNotes" 
            class="px-4 py-2 bg-blue-500 text-white border border-blue-500 rounded-r-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
        Search
    </button>
</div>
        <div class="d-flex text-center grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <!-- ... other parts of your template ... -->
            <div v-for="note in notes" :key="note.id"
                class="relative w-full h-64 bg-yellow-100 rounded-lg border border-gray-300 mb-6 py-5 px-4 hover:shadow-lg transition duration-300 ease-in-out">
                <button @click="deleteNote(note.id)"
                    class="absolute right-10 ml-12 top-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center focus:outline-none">
                    <i class="fas fa-times"></i>
                </button>
                <div
                    class="absolute left-0 top-0 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-red-500 rounded-full">
                </div>
                <div class="absolute left-2 top-2 w-4 h-24 bg-gray-300 transform rotate-45"></div>
                <div>
                    <h4 class="text-gray-800 dark:text-black font-bold mb-8">{{ note.title }}</h4>
                    <p class="text-gray-800">{{ note.content }}</p>
                </div>
                <div class="absolute bottom-4 left-4 flex items-center justify-between w-full text-gray-800">
                    <p class="text-sm">{{ formatDate(note.created_at) }}</p>
                    <p class="text-sm">{{ formatTime(note.created_at) }}</p>
                    <div class="mr-8">
                        <i class="fas fa-pencil mr-1 text-blue-600 cursor-pointer"></i>
                        <button @click="editNote(note)" class="edit-button text-blue-600">Edit</button>
                    </div>
                </div>
            </div>

            <!-- Edit Note Modal -->
            <div id="editModal" v-if="editNoteData" class="fixed z-10 inset-0 overflow-y-auto">
                <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <div
                        class="inline-block align-bottom bg-slate-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">

                        <form @submit.prevent="submitEdit" class="my-14 mb-14">
                            <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h3 class="text-xl font-extrabold text-white mb-4 flex justify-center">Edit Note</h3>
                                <div class="mb-4">
                                    <label for="editTitle" class="block text-sm font-xl text-white">Title</label>
                                    <input v-model="editNoteData.title" type="text" id="editTitle" autocomplete="off"
                                        required
                                        class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                                </div>
                                <div class="mb-4">
                                    <label for="editContent" class="block text-sm font-xl text-white">Content</label>
                                    <textarea v-model="editNoteData.content" id="editContent" rows="3" required
                                        class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                                </div>
                            </div>
                            <div class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button type="submit"
                                    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">Save</button>
                                <button @click="cancelEdit" type="button"
                                    class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { reactive } from 'vue';
import { useUserStore } from '@/stores/user';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            notes: reactive([]),
            editNoteData: null,
            myStore: useUserStore(),
            searchQuery: '',  // Add search query data property
            allNotes: reactive([])  // Add allNotes to store original notes
        };
    },

    mounted() {
        this.getNotes();
    },

    methods: {
        getNotes() {
            axios.get('http://127.0.0.1:8000/api/notes')
                .then(response => {
                    this.notes = response.data;
                    this.allNotes = response.data;  // Store original notes
                })
                .catch(error => {
                    console.error('Error fetching notes:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to fetch notes. Please try again.'
                    });
                });
        },

        editNote(note) {
            this.editNoteData = { ...note }; // Clone the note object to avoid mutation
        },

        submitEdit() {
            axios.put(`http://127.0.0.1:8000/api/noteses/${this.editNoteData.id}`, this.editNoteData)
                .then(response => {
                    const index = this.notes.findIndex(note => note.id === this.editNoteData.id);
                    // Directly assign the updated value to the array index
                    if (index !== -1) {
                        this.notes[index] = response.data.note;
                    }
                    this.editNoteData = null; // Reset editNoteData
                    Swal.fire({
                        icon: 'success',
                        title: 'Note Updated',
                        showConfirmButton: false,
                        timer: 1500
                    });
                })
                .catch(error => {
                    console.error('Error updating note:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to update note. Please try again.'
                    });
                });
        },

        deleteNote(id) {
            Swal.fire({
                title: 'Are you sure you want to delete this note?',
                text: 'You won\'t be able to revert this!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://127.0.0.1:8000/api/noteseses/${id}`)
                        .then(response => {
                            this.notes = this.notes.filter(note => note.id !== id);
                            Swal.fire({
                                icon: 'success',
                                title: 'Note Deleted',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        })
                        .catch(error => {
                            console.error('Error deleting note:', error);
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'Failed to delete note. Please try again.'
                            });
                        });
                }
            });
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
                        this.myStore.isLoggedIn = false;
                        this.$router.push('/login');
                        Swal.fire({
                            icon: 'success',
                            title: 'Logged Out',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }).catch((error) => {
                        console.error('Error logging out:', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Failed to log out. Please try again.'
                        });
                    });
                }
            });
        },

        cancelEdit() {
            this.editNoteData = null; // Close the modal without saving changes
        },

        formatDate(dateTime) {
            return new Date(dateTime).toLocaleDateString();
        },

        formatTime(dateTime) {
            return new Date(dateTime).toLocaleTimeString();
        },

        searchNotes() {
    if (this.searchQuery) {
        const searchQueryLower = this.searchQuery.trim().toLowerCase();
        // Filter notes where either the title or content includes the search query (case insensitive)
        this.notes = this.allNotes.filter(note => 
            note.title.toLowerCase().includes(searchQueryLower) || 
            note.content.toLowerCase().includes(searchQueryLower)
        );
    } else {
        // If search query is empty, reset to all notes
        this.notes = this.allNotes;
    }
},
    }
};
</script>