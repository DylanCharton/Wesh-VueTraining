// data
const products = [
    { id: 1, description: "Quarz Luxe", price: 12, img: 'assets/img/quarz-luxe.JPG'},
    { id: 2, description: 'Curren Business', price: 20, img: 'assets/img/curren-business.JPG'},
    { id: 3, description: 'Curren Sport', price: 5, img: 'assets/img/curren-sport.JPG'},
    { id: 4, description: 'Jaragar Racing', price: 8, img: 'assets/img/jaragar-racing.JPG'},
    { id: 5, description: 'Liges Hommes', price: 3, img: 'assets/img/liges-hommes.JPG'},
    { id: 6, description: 'Maserati Mechanical', price: 65, img: 'assets/img/maserati-mechanical.JPG'},
    { id: 7, description: 'Montre Mecanique', price: 25, img: 'assets/img/montre-mecanique.JPG'},
    { id: 8, description: 'Brand Designer', price: 28, img: 'assets/img/brand-designer.JPG'},
    { id: 9, description: 'Relogio Masculino', price: 4, img: 'assets/img/relogio-masculino.JPG'},
    { id: 10, description: 'Tissot Multifunction', price: 29, img: 'assets/img/tissot-multifunction.JPG'},
    { id: 11, description: 'Hip Hop Gold', price: 87, img: 'assets/img/hiphop-gold.JPG'},
    { id: 12, description: 'Mesh Genova', price: 6, img: 'assets/img/mesh-genova.JPG'},
  ];

const Home = {
    // Defining the template accordingly to what is seized in the script/x-template on the index
    template : '#home',
    name: 'Home',
    // "data" is a naming convention for the content I think
    // Here it contains a function that returns the array products, so when calling products it calls its content
    data: ()=>{
        return{
         products,  
        //  the property used as a v-model in the input field
         searchKey:'', 
        //  the array filled with the checkboxes when they are checked
         liked : [],
        //  the cart, filling with the products
         cart: [],
        }
        
    },
    // Surveille en permanence
    computed: {
        // function to filter what is displayed according to the searchKey field. 
        filteredList(){
            return this.products.filter((product) =>{
                return product.description.toLowerCase().includes(this.searchKey.toLowerCase())
            })
        },
        getLikedCookie(){
            let cookieValue = JSON.parse($cookies.get('like'));
            // if cookieValue is empty, 'liked' is emptied. Otherwise, 'liked' is filled with the parsed JSON
            cookieValue == null ? this.liked = [] : this.liked = cookieValue;
        },
        cartTotalAmount(){
            let total = 0;
            for (let item in this.cart){
                total = total + (this.cart[item].quantity * this.cart[item].price);
            }
            return total;
        },
        itemTotalAmount(){
            let itemTotal = 0;
            for(let item in this.cart){
                itemTotal = itemTotal + (this.cart[item].quantity);
            }
            return itemTotal;
        }

    },
    // methods Attend d'être déclenché
    methods:{
        setLikedCookie(){
            document.addEventListener('input', ()=>{
                setTimeout(()=>{
                    // $cookies obtained through https://github.com/cmp-cc/vue-cookies
                   $cookies.set('like', JSON.stringify(this.liked)); 
                }, 300);
                
            })
        }, 
        addToCart(product){
            // check if already in array
            for(let i = 0; i < this.cart.length; i++){
                // if the id of the current item matches one already in the cart, don't add a new item but increments quantity
                if(this.cart[i].id === product.id){
                    return this.cart[i].quantity++
                }
            }
            this.cart.push({
                id: product.id,
                img: product.img,
                description: product.description,
                price: product.price,
                quantity: 1
            });
        },
        cartPlusOne(product){
            product.quantity = product.quantity + 1;
        }, 
        cartRemoveItem(id){
            this.$delete(this.cart, id)
        },
        cartMinusOne(product, id){
            if(product.quantity == 1){
                this.cartRemoveItem(id);
            } else {
                 product.quantity = product.quantity - 1;
            }
           
        },
    },
    mounted: ()=>{
        this.getLikedCookie;
    }
    
}
const UserSettings = {
    template : `
    <h1>UserSettings</h1>
    `,
    name: 'UserSettings'
}
const WishList = {
    template : `
    <h1>WishList</h1>
    `,
    name: 'WishList'
}
const ShoppingCart = {
    template : `
    <h1>ShoppingCart</h1>
    `,
    name: 'ShoppingCart'
}

const router = new VueRouter({
    routes: [
        { path: '/', component:Home, name:'Home'},
        { path: '/user-settings', component:UserSettings, name:'UserSettings'},
        { path: '/wish-list', component:WishList, name:'WishList'},
        { path: '/shopping-cart', component:ShoppingCart, name:'ShoppingCart'},
    ]
})

const vue = new Vue({
    router,
}).$mount('#app')