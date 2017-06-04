new Vue({
    el : "#app",
    data: {
        totalMoney : 0,
        productList : [],
        checkAllFlag:false,
        Total:0,
        delFlag:false,
        deleteObj:''
    },
    filters : {
        // 局部过滤器
        formatMoney:function(value,type){
            //金额结果保留两位小数点
            return '¥' + value.toFixed(2) + type;
        }
    },
    mounted : function(){
        this.$nextTick(function () {
            //vm和this一样
            this.viewCart();
        })
    },
    methods : {
        // 从json文件获取返回的对象列表
        viewCart:function(){
            this.$http.get("data/cartData.json",{"id":123}).then(function(res){
                this.productList = res.data.result.list;   //记得在cart.js里面打断点查看res对象
                this.totalMoney = res.data.result.totalMoney;
            })

            // es6的写法 箭头函数 只支持chrome浏览器
            // let _this = this;
            // this.$http.get("data/cartData.json",{"id":123}).then(res=>{
            //     this.productList = res.data.result.list;   //记得在cart.js里面打断点查看res对象
            //     this.totalMoney = res.data.result.totalMoney;
            // })
        },
        //增加或减少数量
        changeNum:function(product,way){
            if(way>0){
                product.productQuantity++;
            }else{
                product.productQuantity--;
                if(way<1){
                    product.productQuantity=1;
                }
            }
            this.calTotalMoney();
        },
        // 计算总金额
        calTotalMoney:function(){
            this.Total = 0;
            var _this = this;
            this.productList.forEach((value,index)=>{
                if(value.checked == true){
                    _this.Total += value.productQuantity * value.productPrice;
                }
            })
        },
        //点击选中
        checkOne:function(item){
            if(typeof item.checked == "undefined"){
                this.$set(item,"checked",true);
            }else{
                item.checked = !item.checked;
            }
            this.calTotalMoney();
        },
        //全选
        checkAll:function () {
            this.checkAllFlag = true;
            var _this = this;
            this.productList.forEach((value,index)=>{
                if(typeof value.checked == "undefined"){
                    _this.$set(value,"checked",true);
                }else{
                    value.checked = true;
                }
            })
            this.calTotalMoney();
        },
        //取消全选
        cancelAll:function(){
            this.productList.forEach(function(value,index){
                value.checked = false;
            })
            this.calTotalMoney();
        },
        // 点击删除
        deleteConfirm:function(item){
            this.delFlag = true;
            this.deleteObj = item;
        },
        // 确认删除
        deleteProduct:function(){
            this.delFlag = false;
            var index = this.productList.indexOf(this.deleteObj);
            this.productList.splice(index,1);
            this.calTotalMoney();
        }
    }
})
Vue.filter("globalMoney",function(value,type){
    return '¥' + value.toFixed(2) + type;
})