<template>
  <div>
    <h3 class="form-title">列表选择</h3>
    <div class="form-item" label="商品选择">
      <el-button @click="openDialog()">挑选项目</el-button>
      <span v-if="boxActiveItem.listDetail.length" class="label">
        已选
        <b>{{boxActiveItem.listDetail.length}}</b>
        件商品
      </span>
      <span v-else class="important label">请先选择商品</span>
      <el-dialog
        title="商品选择器"
        top="5vh"
        append-to-body
        lock-scroll
        custom-class="custom-dialog-1"
        :visible.sync="selectorVisible"
        width="70vw"
        @close="closeSelector"
      >
        <div class="itemPickerContainer">
          <el-row type="flex" justify="space-between" align="center">
            <el-container style="width:50%">
              <el-header height="20">
                <el-row type="flex" justify="space-between">
                  <el-col :span="12">商品列表</el-col>
                  <el-col :span="12">
                    <el-row type="flex">
                      <!-- <el-button @click="handleMutilpleCheck" size="mini">添加所选</el-button> -->
                      <el-input v-bind="searchInputProps" v-model="dataQueryString"></el-input>
                    </el-row>
                  </el-col>
                </el-row>
              </el-header>
              <el-main>
                <el-table
                  :data="searchList"
                  @row-click="cellClick"
                  v-bind="tableProps"
                  ref="table1"
                >
                  <el-table-column
                    type="selection"
                    width="35"
                    :selectable="(row,index) => !row.checked"
                  ></el-table-column>
                  <el-table-column fixed prop="key" label="商品ID" show-overflow-tooltip width="100"></el-table-column>
                  <el-table-column prop="img" label="图片" width="50">
                    <template slot-scope="scope">
                      <img v-preview.medium="scope.row.img" :src="scope.row.img" width="30" alt />
                    </template>
                  </el-table-column>
                  <el-table-column prop="label" label="商品标题" show-overflow-tooltip width="auto"></el-table-column>
                  <el-table-column fixed="right" label="操作" align="center" width="60">
                    <template slot-scope="{ row }">
                      <el-button
                        :disabled="row.checked"
                        @click.stop="handleCheck(row)"
                        type="text"
                        size="small"
                      >
                        <span v-if="row.checked" style="color:#38e529">已加</span>
                        <span v-else>添加</span>
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-main>
      
            </el-container>
            <el-container style="width:50%">
              <el-header height="20">
                <el-row type="flex" justify="space-between">
                  <el-col :span="12">已选商品</el-col>
                  <el-col :span="12">
                    <el-input v-bind="searchInputProps" v-model="pickedSearch" />
                  </el-col>
                </el-row>
              </el-header>
              <el-main>
                <el-table
                  :data="boxActiveItem.listDetail.filter((data,index) => {
                    return (!pickedSearch || data.key.toLowerCase().includes(pickedSearch.toLowerCase())) && (this.showTable2All? index> 0 :index < 10)
                  })"
                  v-bind="tableProps"
                  empty-text="未选择商品，请先选择商品！"
                >
                  <el-table-column fixed prop="key" label="商品ID" show-overflow-tooltip width="100"></el-table-column>
                  <el-table-column prop="img" label="图片" width="50">
                    <template slot-scope="scope">
                      <!-- v-preview.medium="scope.row.img" -->
                      <img  :src="scope.row.img" width="30" alt />
                    </template>
                  </el-table-column>
                  <el-table-column prop="label" label="商品标题" show-overflow-tooltip width="auto"></el-table-column>
                  <el-table-column fixed="right" label="操作" width="50" align="center">
                    <template slot-scope="scope">
                      <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                  </el-table-column>
               
                </el-table>
              </el-main>
         
            </el-container>
          </el-row>
          <el-row type="flex" justify="space-between" align="center" style="padding:10px">
            <el-col :span="18">
   <el-pagination
                  small
                  background
                  @size-change="(v) => limit = v"
                  @current-change="(v) => curPage = v"
                  :current-page="curPage"
                  :page-sizes="[10, 20, 30, 40,50,100]"
                  :page-size="limit"
                  layout="total, prev, pager, next, sizes"
                  :total="total"
                ></el-pagination>
            </el-col>
             <el-col :span="6" align="right">
                <!-- <el-button size="mini" type="primary" @click="showTable2All = !showTable2All">
                  {{showTable2All?'展示全部':'展示前10'}}
                </el-button> -->
                    <el-button @click="handleMutilpleCheck" type="primary" size="mini">多选添加</el-button>
       总计：{{boxActiveItem.listDetail.length}} 件
               
             </el-col>
              
  
          </el-row>
        </div>
      </el-dialog>
    </div>
    <h3 class="form-title">列表配置</h3>
    <div class="form-item" label="列表方向">
      <el-switch
        v-model="boxActiveItem.listConfig.direction"
        inactive-value="vertical"
        active-value="horizontal"
        active-text="横向排列"
        inactive-text="竖向排列"
        active-color="rgb(92,134,255)"
        inactive-color="rgb(92,176,255)"
      ></el-switch>
    </div>
    <div class="form-item" label="每行个数" v-if="boxActiveItem.listConfig.direction == 'vertical'">
      <el-input-number
        size="mini"
        v-model="boxActiveItem.listConfig.rowLimit"
        :min="1"
        :max="5"
        label="描述文字"
      ></el-input-number>
    </div>
    <div class="form-item" label="加载模式">
      <el-switch
        v-model="boxActiveItem.listConfig.lazy"
        active-text="开启懒加载"
        inactive-text="关闭懒加载"
        active-color="rgb(92,134,255)"
        inactive-color="rgb(92,176,255)"
      ></el-switch>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";
import { getShopitemList } from "./../api";
export default {
  data: () => ({
    selectorVisible: false,
    itemList: [],
    showTable2All:false,
    // dataList: [],
    dataQueryCate: "",
    tableProps: {
      height: 400,
      style: `font-size:10px;line-height:10px;`,
      size: "mini",
      border: true
    },
    searchInputProps: {
      size: "mini",
      clearable: true,
      prefixIcon: "el-icon-search",
      placeholder: "请输入商品ID搜索",
      "highlight-current-row": true
    },
    dataQueryString: "",
    pickedSearch: "",
    tableLoading: true,
    cateList: [
      {
        label: "苹果",
        value: "apple"
      },
      {
        label: "小米",
        value: "xiaomi"
      },
      {
        label: "华为",
        value: "huawei",
        children: [
          {
            label: "手机",
            value: "phone"
          }
        ]
      }
    ],
    searchList: [],
    pickedList: new Map(),
    curPage: 1,
    limit: 20,
    total: 0
  }),

  watch: {
    curPage() {
      this.fetchList2();
    },
    limit() {
      this.fetchList2();
    },
    dataQueryString() {
      this.fetchList2();
    }
  },
  methods: {
    handleMutilpleCheck() {
      var t1 = this.$refs.table1;
      t1.selection.forEach(element => {
        this.boxActiveItem.listDetail.push(element);
      });
      this.fetchList2();
      this.$message.success(`成功添加${t1.selection.length}件商品`);
      this.$refs.table1.clearSelection();
    },
    cellClick(row, col, e) {
      if ( col.label != "操作" && !row.checked) {
        this.$refs.table1.toggleRowSelection(row);
      }
    },
    closeSelector() {
      this.curPage = 1;
    },
    openDialog() {
      this.selectorVisible = true;
      //  this.tableLoading = false
      this.fetchList2();
    },
    fetchList2() {
      var brand = this.dataQueryCate[0]; //tiaojian
      getShopitemList({
        brand,
        limit: this.limit,
        curPage: this.curPage,
        queryString: this.dataQueryString
      }).then(r => {
        this.total = r.data.total;
        this.searchList = r.data.data.map(el => {
          var obj = this.itemConstructor(el);
          obj.checked = this.boxActiveItem.listDetail.find(
            el2 => el2.key == obj.key
          )
            ? true
            : false;
          return obj;
        });
      });
    },
    handleTableCheck(key, value){
      var obj = this.searchList.find(el => el.key == key);
      obj.checked = value;
    },
    handleCheck(row) {
      row.checked = true;
      this.boxActiveItem.listDetail.unshift(row);
      this.$message.success(`添加商品:【 ${row.label} 】`);
    },
    async handleDelete(row) {
      var index = this.boxActiveItem.listDetail.findIndex(
        el => el.key == row.key
      );
      this.boxActiveItem.listDetail.splice(index, 1);
      this.$message.success(`删除商品:【 ${row.label} 】`);
      this.fetchList2();
    },
    itemConstructor(el) {
      return {
        key: el.skuId,
        label: el.name,
        img: el.img,
        price: el.price,
        _id: el._id
      };
    }
  },
  computed: {
    dataList() {
      return [...this.searchList, ...this.pickedList.values()];
    },
    ...mapGetters(["boxActiveItem", "boxActiveID"])
  }
};
</script>
<style lang="less">
.el-table .cell {
  line-height: 14px;
  text-overflow: unset;
}

.transfer-slot {
  display: flex;
  align-items: center;
  // background: black;
  height: 100%;
  margin-bottom: 3px;
}

.custom-dialog-1 {
  .el-dialog__body {
    padding: 10px 20px;
  }

  .el-dialog__header {
    padding: 15px 20px;
  }

  .itemPickerContainer {
    width: 96%;
  }
}
</style>