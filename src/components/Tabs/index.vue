<template>
  <div
    :v-if="list.lengh > 0"
    class="region-container"
    align="center"
  >
    <el-tabs
      v-model="selectKey"
      :stretch="true"
      style="width: 50%;"
      @tab-click="handleClick"
    >
      <el-tab-pane
        v-for="(item, index) in list"
        :key="index"
        :label="item.label"
        :name="item.name"
        v-bind="$attrs"
      />
      <!-- <el-tab-pane
        label="Beijing"
        name="Beijing"
      />
      <el-tab-pane
        label="Hong Kong"
        name="Hong Kong"
      /> -->
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  props: {
    select: { type: String, default: 'Hong Kong' },
    list: {
      type: Array,
      default() {
        return [
          { label: '香港', name: 'Hong Kong' },
          { label: '北京', name: 'Beijing' }
        ]
      }
    }
  },
  computed: {
    selectKey: {
      get() {
        return this.select
      },
      set(val) {
        this.$emit('update:select', val)
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      this.$emit('selectChange', tab.name)
    }
  }
}
</script>

<style scoped>
.region-container {
  /* background: #fff; */
  /* width: 50%; */
  margin: 20px 10px;
  padding: 10px;
}
</style>
