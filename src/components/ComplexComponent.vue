<template>
  <div>
    <h2>{{title}}</h2>
    <p>{{date}}</p>
    <ul>
      <li v-for="item in items">
        {{item.item_label}}
      </li>
    </ul>
    <os-button v-bind="primary_button"/>
    <br>
    <os-button v-bind="secondary_button"/>
  </div>
</template>

<script>
import OsButton from "./OsButton";

export default {
  props: ["title", "date", "items", "primary_button", "secondary_button"],
  components: {
    OsButton
  }
};
</script>

<style scoped>
  h2 {
    margin-top: 0;
  }

  div {
    padding: 10px;
    border: 1px solid pink;
  }
</style>
