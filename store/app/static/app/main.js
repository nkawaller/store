// Vue Instance
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'

cartPage = new Vue({
    delimiters: ['[[', ']]'],
    el: '#cartPage',
    data: {
        message: 'Cart:',
        items: [],
        totals: "",
        preferred: "",
    },
    methods: {
        decreaseQuantity: function(id){
                const url = "/api/cart/" + id + "/";
                const item = this.items.filter(item => item.id === id)[0];
                axios.patch(url, {
                    quantity: item.quantity - 1
                })
                .then(response => {
                    this.items.forEach(item => {
                        if (item.id === response.data.id) {
                            item.quantity = response.data.quantity;
                            item.item_total = response.data.item_total;
                        }
                    })

                })
                .then (
                    axios.get('/api/totals/')
                        .then(response => {
                        this.totals = response.data
                        console.log(response)
                        })
                );
          },

        increaseQuantity: function(id){
                const url = "/api/cart/" + id + "/";
                const item = this.items.filter(item => item.id === id)[0];
                axios.patch(url, {
                    quantity: item.quantity + 1
                })
                .then(response => {
                    this.items.forEach(item => {
                        if (item.id === response.data.id) {
                            item.quantity = response.data.quantity;
                            item.item_total = response.data.item_total;
                        }
                    })

                })
                .then (
                    axios.get('/api/totals/')
                        .then(response => {
                        this.totals = response.data
                        console.log(response)
                        })
                );
        },
        deleteCartItem: function(id) {
              const url = "/api/cart/" + id + "/";
              axios.delete(url)
                  .then(response => {
                    axios.get('/api/cart/')
                        .then(response => {
                        this.items = response.data
                        });
                    axios.get('/api/totals/')
                        .then(response => {
                        this.totals = response.data
                        });
                  });
        },

    },
    computed: {

    },
    mounted:
        function (){
            axios.get('/api/cart/')
                .then(response => {
                this.items = response.data
                });
            axios.get('/api/totals/')
                .then(response => {
                this.totals = response.data
                });
        },
})

userProfile = new Vue({
    delimiters: ['[[', ']]'],
    el: '#userProfile',
    data: {
        message: 'Account',
        info: [],
    },
    mounted() {
        axios
            .get('/api/profile')
            .then(response => (this.info = response.data))
    }
})