<template>
  <tr class="data-row">
    <td v-bind:key="index" v-for="(datum, index) of shadowData">
      <span v-if="mode != 'edit'">{{datum}}</span>
      <input v-else v-model="shadowData[index]" />
    </td>
    <td v-if="mode == 'general'" class="actions general">
      <a href="#" v-on:click.prevent="mode = 'edit'"><img class="action-icon" src="../assets/edit.svg" alt="edit"/></a>
      <a href="#" v-on:click.prevent="mode = 'delete'"><img class="action-icon" src="../assets/trash.svg" alt="edit"/></a>
    </td>
    <td v-else-if="mode == 'edit'" class="actions edit-mode">
      <a href="#" v-on:click.prevent="confirmEdit"><img class="action-icon" src="../assets/confirm.svg" alt="edit"/></a>
      <a href="#" v-on:click.prevent="cancelEdit"><img class="action-icon" src="../assets/cancel.svg" alt="edit"/></a>
    </td>
    <td v-else class="actions delete-mode">
      <a href="#" v-on:click.prevent="$emit('delete', shadowData)"><img class="action-icon" src="../assets/confirm.svg" alt="edit"/></a>
      <a href="#" v-on:click.prevent="mode = 'general'"><img class="action-icon" src="../assets/cancel.svg" alt="edit"/></a>
    </td>
  </tr>
</template>

<script>
export default {
  name: "name",
  props: {
    rowData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      mode: 'general',
      shadowData: []
    };
  },
  methods: {
    confirmEdit() {
      this.$emit('edit', this.shadowData);
      this.mode = 'general';
    },
    cancelEdit() {
      this.shadowData = [...this.rowData]
      this.mode = 'general';
    }
  },
  watch: {
    rowData: {
      immediate: true,
      handler(val) {
        this.shadowData = [...val];
      }
    }
  }
};
</script>

<style scoped>
tr.data-row {
  border-top: 1px solid #c1c3d1;
  border-bottom: 1px solid #c1c3d1;
  color: #666b85;
  font-weight: normal;
  text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
}

tr.data-row:first-child {
  border-top: none;
}

tr.data-row:last-child {
  border-bottom: none;
}

tr.data-row:nth-child(odd) td {
  background: #ebebeb;
}

tr.data-row:nth-child(odd):hover td {
  background: #4e5066;
}

tr.data-row:last-child td:first-child {
  border-bottom-left-radius: 3px;
}

tr.data-row:last-child td:last-child {
  border-bottom-right-radius: 3px;
}

tr.data-row:hover td {
  background: #4e5066;
  color: #ffffff;
  border-top: 1px solid #22262e;
}

td.text-left {
  text-align: left;
}

td.text-center {
  text-align: center;
}

td.text-right {
  text-align: right;
}

td {
  background: #ffffff;
  text-align: center;
  vertical-align: middle;
  font-weight: 300;
  font-size: 12px;
  padding: 12px;
  text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
  border-right: 1px solid #c1c3d1;
}

td:last-child {
  border-right: 0px;
}

.action-icon {
  width: 15px;
  height: 15px;
}

input {
  width: 60px;
}
</style>
