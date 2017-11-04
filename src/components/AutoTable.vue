<template>
  <div class="auto-table">
    <table>
      <thead>
        <th v-bind:key="col" v-for="col of columns">{{col}}</th>
        <th v-if="columns.length != 0">Actions</th>
      </thead>
      <tbody>
        <Row
          v-for="(datum, index) of data" 
          v-on:edit="editData"
          v-on:delete="deleteData"
          v-bind:key="datum[id]" 
          v-bind:rowData="columns.map(c => datum[c])">
        </Row>
      </tbody>
    </table>
  </div>
</template>

<script>
import Row from "./Row.vue";
import debounce from "lodash/debounce";
import { get, put, delete as del } from "axios";

export default {
  name: "auto-table",
  components: { Row },
  props: {
    url: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      data: null
    };
  },
  computed: {
    columns() {
      return !this.data || this.data.length == 0
        ? []
        : Object.keys(this.data[0]);
    }
  },
  watch: {
    url: {
      immediate: true,
      handler() {
        this.fetchData();
      }
    }
  },
  methods: {
    fetchData: async function() {
      console.log("Refreshing...");
      try {
        const response = await get(this.url);
        this.data = response.data;
      } catch (err) {
        console.error(err);
      }
    },
    async editData(data) {
      const payload = this.columns.reduce((res, c, i) => {
        if (c != this.id) res[c] = data[i];
        return res;
      }, {});

      try {
        await put(
          `${this.url}/${data[this.columns.indexOf(this.id)]}`,
          payload
        );
        this.fetchData();
      } catch (err) {
        console.error(err);
        this.fetchData();
      }
    },
    async deleteData(data) {
      try {
        await del(`${this.url}/${data[this.columns.indexOf(this.id)]}`);
        this.fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>

<style scoped>
.auto-table > table {
  background: white;
  border-radius: 3px;
  border-collapse: collapse;
  height: 320px;
  margin: auto;
  max-width: 600px;
  padding: 5px;
  width: 100%;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}

.auto-table th {
  text-transform: uppercase;
  color: #d5dde5;
  background: #1b1e24;
  border-bottom: 4px solid #42b983;
  border-right: 1px solid #343a45;
  font-size: 14px;
  font-weight: 100;
  padding: 12px;
  text-align: left;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  vertical-align: middle;
}

.auto-table th:first-child {
  border-top-left-radius: 3px;
}

.auto-table th:last-child {
  border-top-right-radius: 3px;
  border-right: none;
}

.auto-table th.text-left {
  text-align: left;
}

.auto-table th.text-center {
  text-align: center;
}

.auto-table th.text-right {
  text-align: right;
}
</style>
