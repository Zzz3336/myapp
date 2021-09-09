<template>
  <div class="main w">
    <!-- 头部 -->
    <div class="header">
      <div class="left">
        <span class="title">管理系统-增删查改</span>
      </div>
      <div class="right">
        <el-button @click="addDialogVisible = true" icon="el-icon-plus">新增</el-button>
      </div>
    </div>

    <div class="table">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="数据列表" name="first">
          <div>
            <el-table :data="stuData" border style="width: 100%" v-loading="loading">
              <el-table-column fixed prop="stuId" label="学号" align="center"></el-table-column>
              <el-table-column prop="stuName" label="姓名" align="center"></el-table-column>
              <el-table-column prop="banJi" label="班级" align="center"></el-table-column>
              <el-table-column prop="xueYuan" label="学院" align="center"></el-table-column>
              <el-table-column prop="telphone" label="联系方式" align="center"></el-table-column>
              <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
              <el-table-column prop="timeIn" label="入学时间" align="center"></el-table-column>
              <el-table-column fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="updateStu(scope.$index, stuData),updateDialogVisible = true"
                    type="text"
                    size="small"
                    icon="el-icon-edit"
                  >修改</el-button>
                  <el-button
                    type="text"
                    size="small"
                    icon="el-icon-delete"
                    @click.native.prevent="removeRow(scope.$index, stuData)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[1, 2, 5, 10]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </el-tab-pane>

        <el-tab-pane label="统计" name="second">
          <div class="statistics">
            <div class="selectSta">
              <el-select v-model="value" placeholder="请选择方式" size="small" @change="selSta">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <div id="tongji" ref="myChartsDom"></div>
              <div id="tongji2" ref="myChartsDom2"></div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!--新增 - 弹出框-->
    <el-dialog title="新增学生信息" :visible.sync="addDialogVisible" width="40%" center>
      <el-form :model="addForm" ref="addForm" label-width="80px" class="addForm" :rules="addRules">
        <el-form-item label="学号" prop="stuId">
          <el-input v-model="addForm.stuId" placeholder="请选择学生学号"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="stuName">
          <el-input v-model="addForm.stuName" placeholder="请选择学生姓名"></el-input>
        </el-form-item>
        <el-form-item label="学院" prop="xueYuan">
          <el-select v-model="addForm.xueYuan" placeholder="请选择学院">
            <el-option
              v-for="item in xueYuanoptions"
              :key="item.xueYuan"
              :label="item.label"
              :value="item.xueYuan"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级" prop="banJi">
          <el-select v-model="addForm.banJi" placeholder="请选择班级">
            <el-option
              v-for="item in banJioptions"
              :key="item.banJi"
              :label="item.label"
              :value="item.banJi"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入学时间" prop="timeIn">
          <el-col>
            <el-date-picker
              placeholder="选择日期"
              v-model="addForm.timeIn"
              style="width: 100%;"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" placeholder="请选择邮箱"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="telphone">
          <el-input v-model="addForm.telphone" placeholder="请选择联系方式"></el-input>
        </el-form-item>
        <el-form-item class="form-button">
          <el-button type="primary" @click="submitaddForm('addForm')" class="button">保存</el-button>
          <el-button @click="resetaddForm('addForm')" class="button">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--修改 - 弹出框-->
    <el-dialog title="修改学生信息" :visible.sync="updateDialogVisible" width="40%" center>
      <el-form
        :model="updateForm"
        ref="updateForm"
        label-width="80px"
        :rules="addRules"
        class="updateForm"
      >
        <el-form-item label="姓名" prop="stuName">
          <el-input v-model="updateForm.stuName"></el-input>
        </el-form-item>
        <el-form-item label="学院" prop="xueYuan">
          <el-select v-model="updateForm.xueYuan" placeholder="请选择学院">
            <el-option
              v-for="item in xueYuanoptions1"
              :key="item.xueYuan1"
              :label="item.label"
              :value="item.xueYuan1"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级" prop="banJi">
          <el-select v-model="updateForm.banJi" placeholder="请选择班级">
            <el-option
              v-for="item in banJioptions1"
              :key="item.banJi1"
              :label="item.label"
              :value="item.banJi1"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="updateForm.email"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="telphone">
          <el-input v-model="updateForm.telphone"></el-input>
        </el-form-item>
        <el-form-item class="form-button">
          <el-button type="primary" @click="submitupdateForm('updateForm')">修改</el-button>
          <el-button @click="resetupdateForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 查询条件 -->
    <div class="select w">
      学号:
      <el-input v-model="selectWay.selByid" size="small" placeholder="查询学号" label="学号"></el-input>姓名:
      <el-input v-model="selectWay.selByname" size="small" placeholder="查询姓名"></el-input>班级:
      <el-select v-model="value1" placeholder="查询班级" size="small">
        <el-option
          v-for="item in options1"
          :key="item.value1"
          :label="item.label"
          :value="item.value1"
        ></el-option>
      </el-select>
      <el-button size="small" type="primary" @click="select">查询</el-button>
    </div>
  </div>
</template>
<script>
import { get, post } from "../network/request";
export default {
  data() {
    function checkPhone(rule, value, callback) {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("电话号码格式不正确"));
          }
        }
      }, 100);
    }
    function checkEmail(rule, value, callback) {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱格式"));
        }
      }, 100);
    }
    return {
      //查询 - 查询条件
      selectWay: {
        selByid: "",
        selByname: "",
        selByclass: ""
      },

      //下拉菜单 - 选择器select
      // 查询 - 班级,value1默认项
      options1: [
        {
          value1: "全部",
          label: "全部"
        },
        {
          value1: "软件工程",
          label: "软件工程"
        },
        {
          value1: "大数据",
          label: "大数据"
        },
        {
          value1: "工商管理",
          label: "工商管理"
        },
        {
          value1: "市场营销",
          label: "市场营销"
        },
        {
          value1: "视觉传达",
          label: "视觉传达"
        },
        {
          value1: "新媒体",
          label: "新媒体"
        },
        {
          value1: "经济学",
          label: "经济学"
        },
        {
          value1: "英语",
          label: "英语"
        },
        {
          value1: "德语",
          label: "德语"
        },
        {
          value1: "法语",
          label: "法语"
        },
        {
          value1: "俄语",
          label: "俄语"
        },
        {
          value1: "建筑设计",
          label: "建筑设计"
        },
        {
          value1: "风景园林",
          label: "风景园林"
        },
        {
          value1: "电力系统及其自动化",
          label: "电力系统及其自动化"
        },
        {
          value1: "电工理论与新技术",
          label: "电工理论与新技术"
        },
        {
          value1: "体育教育",
          label: "体育教育"
        },
        {
          value1: "运动康复",
          label: "运动康复"
        }
      ],
      value1: "全部",
      // 新增表单 - 学院, xueYuanvalue默认项
      xueYuanoptions: [
        {
          xueYuan: "大数据",
          label: "大数据"
        },
        {
          xueYuan: "计算机",
          label: "计算机"
        },
        {
          xueYuan: "管理",
          label: "管理"
        },
        {
          xueYuan: "艺术",
          label: "艺术"
        },
        {
          xueYuan: "财经",
          label: "财经"
        },
        {
          xueYuan: "外语",
          label: "外语"
        },
        {
          xueYuan: "建筑",
          label: "建筑"
        },
        {
          xueYuan: "电气",
          label: "电气"
        },
        {
          xueYuan: "体育",
          label: "体育"
        }
      ],
      xueYuan: "",
      //新增表单 - 班级, banJivalue默认项
      banJioptions: [
        {
          banJi: "软件工程",
          label: "软件工程"
        },
        {
          banJi: "大数据",
          label: "大数据"
        },
        {
          banJi: "工商管理",
          label: "工商管理"
        },
        {
          banJi: "市场营销",
          label: "市场营销"
        },
        {
          banJi: "视觉传达",
          label: "视觉传达"
        },
        {
          banJi: "新媒体",
          label: "新媒体"
        },
        {
          banJi: "经济学",
          label: "经济学"
        },
        {
          banJi: "英语",
          label: "英语"
        },
        {
          banJi: "德语",
          label: "德语"
        },
        {
          banJi: "法语",
          label: "法语"
        },
        {
          banJi: "俄语",
          label: "俄语"
        },
        {
          banJi: "建筑设计",
          label: "建筑设计"
        },
        {
          banJi: "风景园林",
          label: "风景园林"
        },
        {
          banJi: "电力系统及其自动化",
          label: "电力系统及其自动化"
        },
        {
          banJi: "电工理论与新技术",
          label: "电工理论与新技术"
        },
        {
          banJi: "体育教育",
          label: "体育教育"
        },
        {
          banJi: "运动康复",
          label: "运动康复"
        }
      ],
      banJi: "",
      //修改表单 - 学院
      xueYuanoptions1: [
        {
          xueYuan1: "大数据",
          label: "大数据"
        },
        {
          xueYuan1: "计算机",
          label: "计算机"
        },
        {
          xueYuan1: "管理",
          label: "管理"
        },
        {
          xueYuan1: "艺术",
          label: "艺术"
        },
        {
          xueYuan1: "财经",
          label: "财经"
        },
        {
          xueYuan1: "外语",
          label: "外语"
        },
        {
          xueYuan1: "建筑",
          label: "建筑"
        },
        {
          xueYuan1: "电气",
          label: "电气"
        },
        {
          xueYuan1: "体育",
          label: "体育"
        }
      ],
      //修改表单 - 班级
      banJioptions1: [
        {
          banJi1: "软件工程",
          label: "软件工程"
        },
        {
          banJi1: "大数据",
          label: "大数据"
        },
        {
          banJi1: "工商管理",
          label: "工商管理"
        },
        {
          banJi1: "市场营销",
          label: "市场营销"
        },
        {
          banJi1: "视觉传达",
          label: "视觉传达"
        },
        {
          banJi1: "新媒体",
          label: "新媒体"
        },
        {
          banJi1: "经济学",
          label: "经济学"
        },
        {
          banJi1: "英语",
          label: "英语"
        },
        {
          banJi1: "德语",
          label: "德语"
        },
        {
          banJi1: "法语",
          label: "法语"
        },
        {
          banJi1: "俄语",
          label: "俄语"
        },
        {
          banJi1: "建筑设计",
          label: "建筑设计"
        },
        {
          banJi1: "风景园林",
          label: "风景园林"
        },
        {
          banJi1: "电力系统及其自动化",
          label: "电力系统及其自动化"
        },
        {
          banJi1: "电工理论与新技术",
          label: "电工理论与新技术"
        },
        {
          banJi1: "体育教育",
          label: "体育教育"
        },
        {
          banJi1: "运动康复",
          label: "运动康复"
        }
      ],

      // watch监听value1, oldval - 旧value1,  newval - 新value1,
      haschange: false,

      input: "",
      // 默认Tabs
      activeName: "first",

      // 获取到列表数据
      stuData: [],
      // 查询到的数据
      selectData: [],
      // 录入 - 用户输入数据
      addForm: {},
      // 修改 - 用户输入数据
      updateForm: {
        stuName: "",
        banJi: "",
        xueYuan: "",
        email: "",
        telphone: "",
        stuId: ""
      },

      // 新增 - 弹出框
      addDialogVisible: false,
      // 修改 - 弹出框
      updateDialogVisible: false,

      // 分页
      pageSize: 10,
      total: 0,
      currentPage: 1,

      //加载效果
      loading: false,

      //表单校验 - rules
      addRules: {
        stuId: [
          {
            required: true,
            message: "请输入学号",
            trigger: "blur"
          },
          {
            min: 6,
            max: 6,
            message: "长度为 6 个字符",
            trigger: "blur"
          }
        ],
        stuName: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          },
          {
            min: 2,
            max: 4,
            message: "长度为 2-4 个字符",
            trigger: "blur"
          }
        ],
        banJi: [
          {
            required: true,
            message: "请输入班级",
            trigger: "blur"
          }
        ],
        xueYuan: [
          {
            required: true,
            message: "请输入学院",
            trigger: "blur"
          }
        ],
        timeIn: [
          {
            required: true,
            message: "请输入入学时间",
            trigger: "blur"
          }
        ],
        telphone: [
          {
            required: true,
            message: "请输入联系方式",
            trigger: "blur"
          },
          {
            validator: checkPhone,
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur"
          },
          {
            validator: checkEmail,
            trigger: "blur"
          }
        ]
      },

      //统计 - seletor
      options: [
        {
          value: "学院",
          label: "学院"
        },
        {
          value: "班级",
          label: "班级"
        }
      ],
      value: ""
    };
  },
  watch: {
    value1(oldval, newval) {
      if (oldval !== newval) {
        this.haschange = true;
      }
    }
  },

  mounted() {
    this.select();
    this.selSta();
  },
  methods: {
    /**
     * 修改表单
     */
    updateStu(index, rows) {
      this.updateForm.stuId = rows[index].stuId;
      this.updateForm.stuName = rows[index].stuName;
      this.updateForm.banJi = rows[index].banJi;
      this.updateForm.xueYuan = rows[index].xueYuan;
      this.updateForm.email = rows[index].email;
      this.updateForm.telphone = rows[index].telphone;
    },

    /**
     * 分页
     */
    //当改变每页显示条数的选择器时会触发的事件
    handleSizeChange(size) {
      this.pageSize = size;
      // console.log(this.pageSize);
      this.select();
    },
    //当改变当前页数的时候触发的事件
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      // console.log(this.currentPage); //点击第几页
      this.select();
    },

    /**
     * 删除
     */
    removeRow(index, rows) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var that = this;
          get("/students/delBystuid", {
            params: { stuId: rows[index].stuId }
          }).then(
            res => {
              that.value1 = "全部";
              that.selectWay.selByname = "";
              that.selectWay.selByid = "";
              that.selectData = [];
              that.select();
              that.selSta();
            },
            err => {
              console.log(err);
            }
          );
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    /**
     *修改
     */
    submitupdateForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("此操作将修改该学生信息, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              var that = this;
              post("/students/updateStu", {
                stu: that.updateForm
              }).then(
                res => {
                  if (res.data.status == 200) {
                    this.selectData = [];
                    that.select();
                    that.selSta();
                    that.updateDialogVisible = false;
                  } else if (res.data.status == 404) {
                    this.$message.error("已存在信息，手机号、邮箱已被使用");
                  }
                },
                err => {
                  console.log(err);
                }
              );
            })
            .catch(() => {});
        } else {
          console.log("表单有误");
          return false;
        }
      });
    },

    /**
     * 查询数据
     */
    async select() {
      this.loading = true;
      this.selectWay.selByclass = this.value1;
      var that = this;
      if (this.selectWay.selByclass == "全部") {
        // 1.班级 - 全部,    id - 有,     姓名 - 无
        if (this.selectWay.selByid !== "" && this.selectWay.selByname == "") {
          await post("/students/selectByid", {
            stuId: that.selectWay.selByid
          }).then(
            res => {
              that.loading = false;
              if (res.data.status === 404) {
                that.stuData = [];
                that.total = 0;
              } else if (res.data.status === 200) {
                that.stuData = [];
                that.stuData = res.data.students;
                that.total = res.data.total;
              }
            },
            err => {
              console.log(err);
            }
          );
        } else if (
          // 2.班级 - 全部,    id - 无,     姓名 - 有
          this.selectWay.selByid == "" &&
          this.selectWay.selByname !== ""
        ) {
          await post("/students/selectByname", {
            stuName: that.selectWay.selByname,
            currentPage: this.currentPage,
            pageSize: this.pageSize
          }).then(
            res => {
              that.loading = false;
              if (res.data.status === 404) {
                that.stuData = [];
                that.total = 0;
              } else if (res.data.status === 200) {
                this.loading = false;
                this.stuData = res.data.students;
                this.total = res.data.pagination.total;
              }
            },
            err => {
              console.log(err);
            }
          );
        } else if (
          // 3.班级 - 全部,    id - 有,     姓名 - 有
          this.selectWay.selByid !== "" &&
          this.selectWay.selByname !== ""
        ) {
          await post("/students/selectByidandname", {
            stuName: that.selectWay.selByname,
            stuId: that.selectWay.selByid
          }).then(
            res => {
              that.loading = false;
              if (res.data.status === 404) {
                that.stuData = [];
                that.total = 0;
              } else if (res.data.status === 200) {
                that.stuData = [];
                that.stuData = res.data.students;
                that.total = res.data.total;
              }
            },
            err => {
              console.log(err);
            }
          );
        } else if (
          // 4.班级 - 全部,    id - 无,     姓名 - 无,
          this.selectWay.selByid == "" &&
          this.selectWay.selByname == ""
        ) {
          await post("/students/getStudata", {
            currentPage: this.currentPage,
            pageSize: this.pageSize
          }).then(res => {
            this.loading = false;
            this.stuData = res.data.students;
            this.total = res.data.pagination.total;
          });
        }
      } else if (this.selectWay.selByclass !== "全部") {
        if (this.haschange) {
          this.haschange = false;
          this.currentPage = 1;
        }
        // 5.班级 - 有,    id - 无,    姓名 - 无
        if (this.selectWay.selByid == "" && this.selectWay.selByname == "") {
          await post("/students/selectBybanji", {
            banJi: this.selectWay.selByclass,
            currentPage: this.currentPage,
            pageSize: this.pageSize
          }).then(
            res => {
              that.loading = false;
              if (res.data.status === 404) {
                this.stuData = [];
                this.total = 0;
              } else if (res.data.status === 200) {
                this.stuData = res.data.students;
                this.total = res.data.pagination.total;
              }
            },
            err => {
              console.log(err);
            }
          );
        } else if (
          this.selectWay.selByid !== "" &&
          this.selectWay.selByname == ""
        ) {
          // 6.班级 - 有,      id - 有,      姓名 - 无
          await post("/students/selectBybanjiandid", {
            banJi: that.selectWay.selByclass,
            stuId: that.selectWay.selByid
          }).then(
            res => {
              that.loading = false;
              if (res.data.status === 404) {
                that.stuData = [];
                that.total = 0;
              } else if (res.data.status === 200) {
                that.stuData = [];
                that.stuData = res.data.students;
                that.total = res.data.total;
              }
            },
            err => {
              console.log(err);
            }
          );
        } else if (
          // 7.班级 - 有,      id - 无,      姓名 - 有
          this.selectWay.selByid == "" &&
          this.selectWay.selByname !== ""
        ) {
          await post("/students/selectBybanjiandname", {
            banJi: that.selectWay.selByclass,
            stuName: that.selectWay.selByname,
            currentPage: this.currentPage,
            pageSize: this.pageSize
          }).then(
            res => {
              that.loading = false;
              if (res.data.status === 404) {
                that.stuData = [];
                that.total = 0;
              } else if (res.data.status === 200) {
                this.stuData = res.data.students;
                this.total = res.data.pagination.total;
              }
            },
            err => {
              console.log(err);
            }
          );
        } else {
          // 8.班级 - 有,      id - 有,      姓名 - 有
          await post("/students/selectByall", {
            banJi: that.selectWay.selByclass,
            stuName: that.selectWay.selByname,
            stuId: that.selectWay.selByid
          }).then(
            res => {
              that.loading = false;
              if (res.data.status === 404) {
                that.stuData = [];
                that.total = 0;
              } else if (res.data.status === 200) {
                that.stuData = [];
                that.stuData = res.data.students;
                that.total = res.data.total;
              }
            },
            err => {
              console.log(err);
            }
          );
        }
      }
    },

    /**
     * 保存录入
     */
    submitaddForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("此操作将新增信息, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(
            () => {
              this.addDialogVisible = false;
              var that = this;
              post("/students/addNewstu", {
                stu: that.addForm
              }).then(res => {
                if (res.data.status == 200) {
                  this.$message({
                    showClose: true,
                    message: "信息录入成功",
                    type: "success"
                  });
                  that.select();
                  that.addForm = {};
                  that.selSta();
                } else if (res.data.status == 404) {
                  this.$message.error("已存在信息，学号、手机号、邮箱已被使用");
                  that.addForm = {};
                }
              });
            },
            err => {}
          );
        } else {
          console.log("表单有误");
          return false;
        }
      });
    },

    /**
     * 新增 - 表单重置
     */
    resetaddForm(formName) {
      this.$refs[formName].resetFields();
    },

    /**
     * 修改 - 表单重置
     */
    resetupdateForm() {
      this.updateForm = {
        stuName: "",
        banJi: "",
        xueYuan: "",
        email: "",
        telphone: "",
        stuId: ""
      };
    },

    /**
     * 统计
     */
    async selSta() {
      if (this.value === "学院") {
        await get("/statistics/selSta", {
          params: { howtosel: this.value }
        }).then(
          res => {
            // Echarts
            var ecaharts = require("echarts");
            var myChart = ecaharts.init(document.getElementById("tongji"));

            myChart.setOption({
              tooltip: {
                trigger: "item"
              },
              legend: {
                top: "5%",
                left: "center"
              },
              series: [
                {
                  name: "人数",
                  type: "pie",
                  radius: ["40%", "70%"],
                  avoidLabelOverlap: false,
                  itemStyle: {
                    borderRadius: 10,
                    borderColor: "#fff",
                    borderWidth: 2
                  },
                  label: {
                    show: false,
                    position: "center"
                  },
                  emphasis: {
                    label: {
                      show: true,
                      fontSize: "40",
                      fontWeight: "bold"
                    }
                  },
                  labelLine: {
                    show: false
                  },
                  data: [
                    { value: res.data.dsg.length, name: "大数据" },
                    { value: res.data.jsj.length, name: "计算机" },
                    { value: res.data.gl.length, name: "管理" },
                    { value: res.data.ys.length, name: "艺术" },
                    { value: res.data.cj.length, name: "财经" },
                    { value: res.data.wy.length, name: "外语" },
                    { value: res.data.jz.length, name: "建筑" },
                    { value: res.data.dq.length, name: "电气" },
                    { value: res.data.ty.length, name: "体育" }
                  ]
                }
              ]
            });

            // Highcharts
            let Highcharts = require("highcharts");
            let options = {
              chart: {
                type: "column"
              },
              title: {
                text: "各学院人数" // 标题
              },
              xAxis: {
                categories: [
                  "大数据",
                  "计算机",
                  "管理",
                  "艺术",
                  "财经",
                  "外语",
                  "建筑",
                  "电气",
                  "体育"
                ], // x 轴分类
                crosshair: true
              },
              yAxis: {
                title: {
                  text: "人数" // y 轴标题
                }
              },
              series: [
                {
                  // 数据列
                  name: "学院", // 数据列名
                  data: [
                    res.data.dsg.length,
                    res.data.jsj.length,
                    res.data.gl.length,
                    res.data.ys.length,
                    res.data.cj.length,
                    res.data.wy.length,
                    res.data.jz.length,
                    res.data.dq.length,
                    res.data.ty.length
                  ] // 数据
                }
              ],
              credits: {
                enabled: false // 禁用版权信息
              }
            };
            Highcharts.chart("tongji2", options);
          },
          err => {}
        );
      } else if (this.value === "班级") {
        await get("/statistics/selSta", {
          params: { howtosel: this.value }
        }).then(
          res => {
            // Echarts
            var ecaharts = require("echarts");
            var myChart = ecaharts.init(document.getElementById("tongji"));
            myChart.setOption({
              tooltip: {
                trigger: "item"
              },
              legend: {
                top: "5%",
                left: "center"
              },
              series: [
                {
                  name: "人数",
                  type: "pie",
                  radius: ["40%", "70%"],
                  avoidLabelOverlap: false,
                  itemStyle: {
                    borderRadius: 10,
                    borderColor: "#fff",
                    borderWidth: 2
                  },
                  label: {
                    show: false,
                    position: "center"
                  },
                  emphasis: {
                    label: {
                      show: true,
                      fontSize: "40",
                      fontWeight: "bold"
                    }
                  },
                  labelLine: {
                    show: false
                  },
                  data: [
                    { value: res.data.rjgc.length, name: "软件工程" },
                    { value: res.data.dsj.length, name: "大数据" },
                    { value: res.data.gsgl.length, name: "工商管理" },
                    { value: res.data.scyx.length, name: "市场营销" },
                    { value: res.data.sjcd.length, name: "视觉传达" },
                    { value: res.data.xmt.length, name: "新媒体" },
                    { value: res.data.jjx.length, name: "经济学" },
                    { value: res.data.yy.length, name: "英语" },
                    { value: res.data.dy.length, name: "德语" },
                    { value: res.data.fy.length, name: "法语" },
                    { value: res.data.ey.length, name: "俄语" },
                    { value: res.data.jzsj.length, name: "建筑设计" },
                    { value: res.data.fjyl.length, name: "风景园林" },
                    {
                      value: res.data.zdh.length,
                      name: "电力系统及其自动化"
                    },
                    { value: res.data.xjs.length, name: "电工理论与新技术" },
                    { value: res.data.tyjy.length, name: "体育教育" },
                    { value: res.data.ydkf.length, name: "运动康复" }
                  ]
                }
              ]
            });

            // Highcharts
            let Highcharts = require("highcharts");
            let options = {
              chart: {
                type: "column"
              },
              title: {
                text: "各班级人数" // 标题
              },
              xAxis: {
                categories: [
                  "软件工程",
                  "大数据",
                  "工商管理",
                  "市场营销",
                  "视觉传达",
                  "新媒体",
                  "经济学",
                  "英语",
                  "德语",
                  "法语",
                  "俄语",
                  "建筑设计",
                  "风景园林",
                  "电力系统及其自动化",
                  "电工理论与新技术",
                  "体育教育",
                  "运动康复"
                ], // x 轴分类
                crosshair: true
              },
              yAxis: {
                title: {
                  text: "人数" // y 轴标题
                }
              },
              series: [
                {
                  // 数据列
                  name: "学院", // 数据列名
                  data: [
                    res.data.rjgc.length,
                    res.data.dsj.length,
                    res.data.gsgl.length,
                    res.data.scyx.length,
                    res.data.sjcd.length,
                    res.data.xmt.length,
                    res.data.jjx.length,
                    res.data.yy.length,
                    res.data.dy.length,
                    res.data.fy.length,
                    res.data.ey.length,
                    res.data.jzsj.length,
                    res.data.fjyl.length,
                    res.data.zdh.length,
                    res.data.xjs.length,
                    res.data.tyjy.length,
                    res.data.ydkf.length
                  ] // 数据
                }
              ],
              credits: {
                enabled: false // 禁用版权信息
              }
            };
            Highcharts.chart("tongji2", options);
          },
          err => {}
        );
      }
    }
  }
};
</script>
<style scoped>
</style>
