const itemsPrefix = "item-";
function getCart(type="view") {
    //loop through all session storage keys looking for cart items
    let numKeys = sessionStorage.length;
    const cartList = [];
    const orderList = [];
    for (var index = 0; index < numKeys; index++) {
        let element = sessionStorage.getItem(sessionStorage.key(index));
        let key = sessionStorage.key(index);
        console.log(sessionStorage.key(index) + ":" + element);
        if (key.substring(0,itemsPrefix.length) === itemsPrefix) {
            //add to an array list of cart items
            const order = JSON.parse(element);
            console.log("order");
            console.log('sfasdf',order.item)
            cartList.push(order.item);
           // console.log("order");
            orderList.push(order);

        }

    }
    
  //show the current cart list on the page

  console.log('sdfsad',cartList)
 document.getElementById("itemsInCart").textContent = cartList;

   if (type === "order") {

    localStorage.setItem("order",JSON.stringify(orderList));
 }
 }
// //run this code AFTER the DOM  has finished loading
 window.addEventListener("DOMContentLoaded", function (e) {
     //get the cart items from storage and display it on the page
    
    //  getCart();

    const orderList = [];
      const cartIcons = document.querySelectorAll("#cartToggle");
     cartIcons.forEach(function (i) {

      //click handler for cart icon
       i.addEventListener("click", function (e) {
        //add or remove the checked class from the icon
         e.currentTarget.classList.toggle("checked");
         //get the parent pie details that go with this icon
         const container = e.currentTarget.parentNode;
         const pie_name = container.querySelector(".title").innerText;
         const pie_price = container.querySelector(".price").innerText;
         const pie_key = this.attributes["data-order"].nodeValue;
        // const  pie_key = sessionStorage.length;

         console.log("pie-key",pie_key)
        
         const order = {key:pie_key,count:"1",item:pie_name,price:pie_price};
         console.log("order",order);
        console.log("item",itemsPrefix)

         if (e.currentTarget.classList.contains("checked"))
         { //ADD item
             //create an individual record for this item
             orderList.push(order);
             sessionStorage.setItem('orderlist',JSON.stringify(orderList));
         }
        else{//REMOVE item
             //remove the individual record for this item
             orderList.map(item=>{
              if(item.key === itemsPrefix+pie_key){}

             })
           sessionStorage.removeItem(itemsPrefix+pie_key);
       }
       getCart();
     })

     })
      const orderButton = document.getElementById("orderButton");
      orderButton.addEventListener("click", function (e) {
         getCart("order");
         const url = window.location.href.replace("pies.html", "order.html");
        window.location.href = url;
    })
  });
