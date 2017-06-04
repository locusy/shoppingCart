/**
 * Created by Administrator on 2017-6-3.
 */
new Vue({
    el : ".address",
    data:{
        addressList:[],
        limitNum:3,
        currentIndex:0
    },
    // 截取列表里面的前三项
    computed:{
        filterAddList:function(){
            return this.addressList.slice(0,this.limitNum)
        }
    },
    mounted:function(){
        this.$nextTick(function(){
            this.getAddress();
        })
    },
    methods: {
        getAddress: function () {
            var _this = this;
            this.$http.get("data/address.json").then(res => {
                if (res.data.status == 0) {
                    _this.addressList = res.data.result;
                }
            });
        },
        loadMore: function () {
            this.limitNum = this.addressList.length;
        },
        // 设置默认
        setDefault: function (addressId) {
            this.addressList.forEach(function (value, index) {
                if (value.addressId == addressId) {
                    value.isDefault = true;
                } else {
                    value.isDefault = false;
                }
            })
        },
        // 删除地址
        deleteAddress: function (address) {
            var index = this.addressList.indexOf(address);
            this.addressList.splice(index,1);
        }
    }
})