<template>
  <div id="app">
    <h4 class="bg-primary text-white text-center p-2">{{ name }}'s To Do List</h4>
    <div class="container-fluid p-4">
      <div class="row" v-if="filteredTasks.length === 0">
        <div class="col text-center font-weight-bold">Nothing to do. Hurrah! <i class="fa fa-camera-retro"></i></div>
      </div>
      <template v-else>
        <div class="row">
          <div class="col font-weight-bold">Task</div>
          <div class="col-2 font-weight-bold">Done</div>
        </div>
        <div class="row" v-for="task in filteredTasks" :key="task.action">
          <div class="col">{{ task.action }}</div>
          <div class="col-2 text-center">
            <input type="checkbox" v-model="task.done" class="form-check-input">
          </div>
        </div>
      </template>
      <div class="row py-2">
          <form @submit.prevent="addNewTodo" class="form-inline">
            <div class="col">
              <input v-model="newItemText" class="form-control" type="text">
            </div>
            <div class="col-2">
              <button class="btn btn-primary">Add</button>
            </div>
          </form>
      </div>
      <div class="row bg-secondary py-2 mt-2 text-white">
        <div class="col text-center form-check">
          <input type="checkbox" v-model="hideCompleted" class="form-check-input" id="hideCompleted">
          <label class="form-check-label font-weight-bold" for="hideCompleted">Hide Completed Tasks</label>
        </div>
        <div class="col text-center">
          <button class="btn btn-sm btn-warning" @click="deleteCompleted">Delete Completed</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  h4 {
    color: #f00;
  }
</style>
<script>
export default {
  name: "App",
  data() {
    return {
      name: "Marco",
      tasks: [],
      hideCompleted: true,
      newItemText: ""
    };
  },
  created() {
    let data = localStorage.getItem("todos");
    if (data) {
      this.tasks = JSON.parse(data);
    }
  },
  computed: {
    filteredTasks() {
      return this.hideCompleted ? this.tasks.filter(t => !t.done) : this.tasks;
    }
  },
  methods: {
    addNewTodo() {
      this.tasks.push({ action: this.newItemText, done: false });
      this.storeData();
      this.newItemText = "";
    },
    storeData() {
      localStorage.setItem("todos", JSON.stringify(this.tasks));
    },
    deleteCompleted() {
      this.tasks = this.tasks.filter(t => !t.done);
      this.storeData();
    }
  }
};
</script>
