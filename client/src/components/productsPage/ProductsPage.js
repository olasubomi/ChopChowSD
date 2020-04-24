import React, { Component } from 'react';
import Popup from "reactjs-popup";

class ProductSection extends Component {

storeCollection = []
constructor(props) {
    super(props);
    this.state = {
      store_products_fetched : false
    };
  }

componentDidMount(){
    console.log("Comes in product pages component did mount")
    var url = "https://chopchowsd.herokuapp.com/get_store_products" // for production
    // var url = "http://localhost:5000/get_store_products"

     fetch(url)
        .then(res => res.text())
        .then(body => {
            var storeList = JSON.parse(body);

             for(var i = 0 ; i < storeList.length; i++){
                 console.log(storeList[i]);
                console.log("Inner fetch loop");
                console.log(storeList[i]);
                this.storeCollection.push(storeList[i]);
                console.log(storeList[i].store_name)
            }
        })
        .catch(error=>{
            console.log(error);
        })
}

        render() {
            var store_products = []
            for (const  [index, value] of this.storeCollection.entries()){
                var productsMenu = []
                console.log(index);
                console.log(value);

                for (const [storeProductsIndex, productValue] of value.products.entries()) {
                    // console.log("Inner for loop");
                    //const element = array[index];
                    console.log(storeProductsIndex);
                    // console.log(productValue.product_name);
                    //productsMenu.push(productValue.product_name)
                    // check for if product has variations

                    //productsMenu.push(productValue.product_name)
                    var key = value.store_name+productValue.product_name
                    productsMenu.push(
                        <div className="col-sm-12 col-md-6 col-lg-4 mealContainer"  key = {key} >
                            <div>
                                <div style={containerStyle}>
                                    
                                       
                                        <Popup 
                    trigger={
                        <div id = {productValue.id} style={containerStyle}>
                        <img src={productValue.product_image} className="images" style={{width:"100%"}} alt={productValue.id}></img>
                                    <div id="textbox">
                                        <p className="alignleft">{productValue.product_name}</p>
                                        <p className="alignright"  style={{color: "green"}}>${productValue.product_price}</p>
                                    </div>
                        {/* <button style={{backgroundColor: "orange" }}>View Steps</button>   */}
 
                        </div> 
                    } modal closeOnDocumentClick contentStyle={contentStyle}>
                    {/* Inside Pop - up */}
                    <div>
                    {productValue.product_name}
                    <br></br>
                    Availability
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6"><b>
                            <img src={productValue.product_image} alt='info' style={{ width:"100%", height:"100%", align:"center"}}></img>
                                {/* <div className="col"></div> */}
                                </b>
                            </div> 
                            <div className="col-sm-6"><b>
                                {/* <div className="col">{productValue.product_price}</div> */}
                                {/* <div className="col">{productValue.sizes}</div> */}
                                Availabile<br></br>
                                Variations:<br></br>
                                Price:
                                </b>
                            </div> 
                        </div>
                    </div>

                    <span>View Product</span>&nbsp;|&nbsp;<span>Update Product</span>&nbsp;|&nbsp;<span>Add To Cart..</span>
                    <hr></hr>
                    {/* <div className="col">
                        <div className="col align-items-center"><ol>{mealPrep}</ol></div>
                    </div> */}
                            
                    {/* </div> */}
                        
                    {/* </div> */}
                    {/* <div>
                    <div className="col align-items-left">
                        <img src={value.imageSrc} alt='info'  style={{width:'35%', height:'35%', align:"center"}}></img>
                    </div>
                    <div>                            
                        <div className="col align-items-center"><ol>{mealPrep}</ol></div>
                    </div>
                    </div>
                    */}
                 </Popup>
                                    </div>
                                </div>
                            </div>
                    )

                }

                store_products.push(
                    <div key={value.store_name}>
                        <hr></hr>
                        <img src={value.store_image} className="images" style={{width:"10%"}} alt={value.id}></img>
                        <b>{value.store_name}</b>

                            <br></br>
                        <div className="container">
                            
                           <div className="row ">
                           {productsMenu}
                           </div>
                       </div>
                        <hr></hr>
                    </div>
                )


            }



            return (
                <div>                    
                    <div id="title"><b>Our Products</b></div>
                    {store_products}
                </div>
            );
        }
}

const containerStyle = {
    //font: "50px",
    display: "inline-block",
    width: "100%",
    height: "100%",
    
}

const contentStyle = {
    // borderRadius: "25px",
    maxWidth: "100vw",
    maxHeight: "100vh",
    overflow: "scroll"
    // width: "90%",
    // height: "50%",
    
    };



export default ProductSection;