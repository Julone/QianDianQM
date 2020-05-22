<template>
    <div>
            <el-row>
            <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-row>
          <el-row>
            <el-table :data="activityData" style="width: 100%">
              <el-table-column prop="date" label="日期" width="100"></el-table-column>
              <el-table-column prop="name" label="活动名称" width="180"></el-table-column>
              <el-table-column prop="url" label="链接地址"></el-table-column>
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button
                    @click="activeMapItem.action.data = scope.row"
                    type="text"
                    size="small"
                  >确定选择</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-row>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400"
            ></el-pagination>
          </el-row>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    data(){
        return {
            input3:'',
            activityData: [
                { date: "2020-03-12", name: "利郎万达联名时装发布会", url: "/wanda" },
                { date: "2020-03-12", name: "利郎中国日报联名时装发布会", url: "/wanda" },
                { date: "2020-03-12", name: "利郎人名日报时装发布会", url: "/wanda" },
                { date: "2020-03-12", name: "利郎法国时装发布会", url: "/wanda" }
            ]
        }
    },
    computed:{
            ...mapGetters([
      "mapActiveID",
      "activeMapItem",
    ])
    },
    methods:{},
    mounted(){
        console.log(this.$router);
    }
}
</script>
