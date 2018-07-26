import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
constructor(props){
  super(props);

  this.state = {
    productId: '',
    productPricing: [],
  }
}

  // componentDidMount(){
  //   this.getProductName();
  // }

  handleChange = event => {
    this.setState({
      productId: event.target.value
       }
    );
    console.log(this.state.productId);
  }

  handlePriceChange = event => {
    this.setState({
      productPricing: event.target.value,
    });
  }

  getProductInfo = productId => {
    axios({
      method: 'GET',
      url: `https://redsky.target.com/v2/pdp/tcin/${productId}?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics`,
    })
    .then(response => {
      console.log(response.data);
      this.setState({
        product: {
         id: response.data.product.item.tcin,
        name: response.data.product.item.product_description.general_description,
        price: response.data.current_price,
        }
      })
    })
  }

  getPricingInfo = (id) => () => {
    axios.get(`/product/${id}`)
    .then((response) => {
      this.setState({
        productPricing: response.data
      })
    })
    .catch((error) => {
      console.log('error in GET /product', error);
    })
  }

  // getProductName = () => {
  //   axios.get('/product/name')
  //   .then((response) => {
  //     this.setState({
  //       product: {
  //        id: response.data.id,
  //        productID: response.data.product.id,
  //         name: response.data.name,
  //       }
  //     })
  //   })
  //   .catch((error) => {
  //     console.log('error in productName', error);
  //   })
  // }

  render() {
    console.log(this.state.productPricing);
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            Target Case Study
          </p>
          {JSON.stringify(this.state.product)}
          <div>
              <input onChange={this.handleChange} value={this.state.productId}></input>
            </div>
            <button onClick={() => this.getProductInfo(this.state.productId)}>Enter Product ID</button>
            <button onClick={this.getPricingInfo(1)}>Destiny 2</button>
            <button onClick={this.getPricingInfo(2)}>Halo 5</button>
            <button onClick={this.getPricingInfo(3)}>Fortnite</button>
            <button onClick={this.getPricingInfo(4)}>Overwatch</button>
            {JSON.stringify(this.state.productPricing)}
            
        </div>
    );
  }
}

export default App;
