<template>
  <div class="ac-table">
    <table>
      <thead>
        <th v-bind:key="col" v-for="col of columns">{{col}}</th>
      </thead>
      <tbody>
        <tr v-bind:key="id ? datum[id] : index" v-for="(datum, index) of data">
          <td v-bind:key="col" v-for="col of columns">{{datum[col]}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
const mock = [
  {
    id: 1,
    first_name: "Iolanthe",
    last_name: "Titchard",
    email: "ititchard0@tumblr.com"
  },
  {
    id: 2,
    first_name: "Allx",
    last_name: "Illes",
    email: "ailles1@fastcompany.com"
  },
  {
    id: 3,
    first_name: "Dorelle",
    last_name: "Mudle",
    email: "dmudle2@who.int"
  },
  {
    id: 4,
    first_name: "Charlene",
    last_name: "Backsal",
    email: "cbacksal3@rambler.ru"
  },
  {
    id: 5,
    first_name: "Matilda",
    last_name: "Clemes",
    email: "mclemes4@timesonline.co.uk"
  },
  {
    id: 6,
    first_name: "Maiga",
    last_name: "Liptrod",
    email: "mliptrod5@bloomberg.com"
  },
  {
    id: 7,
    first_name: "Devy",
    last_name: "Jagoe",
    email: "djagoe6@cbsnews.com"
  },
  {
    id: 8,
    first_name: "Nannie",
    last_name: "Cottam",
    email: "ncottam7@google.com.au"
  },
  {
    id: 9,
    first_name: "Efrem",
    last_name: "Claussen",
    email: "eclaussen8@hexun.com"
  },
  {
    id: 10,
    first_name: "Lynn",
    last_name: "Langhorn",
    email: "llanghorn9@sourceforge.net"
  }
];

import debounce from "lodash/debounce";
import { get } from "axios";

export default {
  name: "auto-table",
  props: {
    url: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      data: mock
    };
  },
  computed: {
    columns() {
      return (!this.data || this.data.length == 0) ? [] : Object.keys(this.data[0]);
    }
  },
  watch: {
    url() {
      // debounce(fetchData, 1000)
      fetchData();
    }
  },
  methods: {
    fetchData: async function() {
      try {
        const response = await get(this.url);
        this.data = response.data;
      } catch (err) {
        console.error(err);
      }
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style>

</style>
