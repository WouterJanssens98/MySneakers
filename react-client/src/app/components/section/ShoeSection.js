import {default as React} from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiConfig } from '../../config';
import { default as classnames } from 'classnames';
import './PageSection.scss';




const PageSection = ({children, classes, id, sku, imageUrl ,title, subTitle, readMoreRoute}) => {


    async function getStockXPrice(size, sku){

        // Get the specific product
        if(stockxData === null){

       
        const fetch = require("node-fetch");
          // kw specifies the search term for items to add to db
          const modifiedUrl = `https://stockx.com/api/browse?productCategory=sneakers&currency=EUR&_search=${sku}&dataType=product&country=BE`;
          const response  = await fetch(modifiedUrl, {
              method: 'GET',
              headers: {
              'accept': '*/*', 'accept-encoding': 'gzip, deflate, br', 
              'accept-language': 'nl-NL,nl;q=0.9,en-US;q=0.8,en;q=0.7,fr;q=0.6,de;q=0.5',
              'appos': 'web', 'appversion': '0.10', 'pragma': 'cache', 'sec-fetch-mode': 'cors', 
              'sec-fetch-site': 'same-origin', 
              'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36', 
              'x-anonymous-id': 'undefined', 'x-requested-with': 'XMLHttpRequest'}
          });
          
          // Get more info about the product and the specific size id's
    
          const data = await response.json()
          // id identifies the shoe
          const id = data['Products'][0]['id'];



       
          const idUrl = `https://stockx.com/api/products/${id}?currency=EUR`
          const response2  = await fetch(idUrl, {
            method: 'GET',
            headers: {
            'accept': '*/*', 'accept-encoding': 'gzip, deflate, br', 
            'accept-language': 'nl-NL,nl;q=0.9,en-US;q=0.8,en;q=0.7,fr;q=0.6,de;q=0.5',
            'appos': 'web', 'appversion': '0.10', 'pragma': 'cache', 'sec-fetch-mode': 'cors', 
            'sec-fetch-site': 'same-origin', 
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36', 
            'x-anonymous-id': 'undefined', 'x-requested-with': 'XMLHttpRequest'}
        });
        
          const data2 = await response2.json();
          setData(data2)
          const children = data2['Product']['children'];
          const correctVariant = Object.values(children).find( function (variant) { return variant.shoeSize == size })
          if(correctVariant){
            const correctId = correctVariant['id']
        

            const sizeUrl = `https://stockx.com/api/products/${correctId}/market?currency=EUR&country=BE`;
            const response3  = await fetch(sizeUrl, {
              method: 'GET',
              headers: {
              'accept': '*/*', 'accept-encoding': 'gzip, deflate, br', 
              'accept-language': 'nl-NL,nl;q=0.9,en-US;q=0.8,en;q=0.7,fr;q=0.6,de;q=0.5',
              'appos': 'web', 'appversion': '0.10', 'pragma': 'cache', 'sec-fetch-mode': 'cors', 
              'sec-fetch-site': 'same-origin', 
              'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36', 
              'x-anonymous-id': 'undefined', 'x-requested-with': 'XMLHttpRequest'}
          });
      
             const data3 = await response3.json();
             const lowestAskPrice = data3['Market']['lowestAsk']
             console.log(data3)
             setValue(lowestAskPrice)

          }else {
              setValue("No market price found")
          }
           
        }else {

          const data2 = stockxData
          const children = data2['Product']['children'];
          const correctVariant = Object.values(children).find( function (variant) { return variant.shoeSize == size })
          if(correctVariant){
            const correctId = correctVariant['id']
        

            const sizeUrl = `https://stockx.com/api/products/${correctId}/market?currency=EUR&country=BE`;
            const response3  = await fetch(sizeUrl, {
              method: 'GET',
              headers: {
              'accept': '*/*', 'accept-encoding': 'gzip, deflate, br', 
              'accept-language': 'nl-NL,nl;q=0.9,en-US;q=0.8,en;q=0.7,fr;q=0.6,de;q=0.5',
              'appos': 'web', 'appversion': '0.10', 'pragma': 'cache', 'sec-fetch-mode': 'cors', 
              'sec-fetch-site': 'same-origin', 
              'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36', 
              'x-anonymous-id': 'undefined', 'x-requested-with': 'XMLHttpRequest'}
            });
      
             const data3 = await response3.json();
             setSpecific(data3)
             const lowestAskPrice = data3['Market']['lowestAsk']
             console.log(data3)
             setValue(lowestAskPrice)

          }else {
              setValue("No market price found")
          }
      
        }
    }



    const [size, setSize] = React.useState(10);
    const [value, setValue] = React.useState(null);
    const [stockxData, setData] = React.useState(null);
    const [specificData, setSpecific] = React.useState(null);

    

    useEffect(() => {
        // Update whenever another size is chosen by the user
        console.log(`Your shoe size changed to ${size}, updating value.....`);
        getStockXPrice(size, sku);
        document.getElementById('success').innerHTML = "";
        console.log(specificData)
    },[size]);

    const userData = localStorage.getItem("mern:authUser");
    const signedInUser = JSON.parse(userData)['id'];
   

    const handleSubmit = async (ev) => {
      ev.preventDefault();
      const url = `${apiConfig.baseURL}/values`;
      const details = {
      referredShoe : id,
      shoeSize : size,
      stockxValue : value
      };

    const myHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const options = {
      method: 'POST',
      headers: myHeaders,
      body : JSON.stringify(details)
    };

    const response = await fetch(`${url}`, options);
    const resData = await response.json()
    const url2  = `${apiConfig.baseURL}/portfolio/add/${resData['id']}`;
    const details2 = {
      "referredUser" : signedInUser
    }
    const options2 = {
      method: 'POST',
      headers: myHeaders,
      body : JSON.stringify(details2)
    };
    const response2 = await fetch(`${url2}`, options2);

    const data2 = await response2.json()
    if(data2.ok){
      console.log("Successfully added to portfolio")
    }
    document.getElementById('success').innerHTML = "Successfully added to portfolio"
    
   

  }

  return (
<div>
      <header className="page-section__header">        
      <div className="container">
        <div className="row">
          <div className="col-12 text-center title">
            <h1 className="d-flex justify-content-center"><span>{title}</span></h1>
            {!!subTitle ? (<h2 className="text-black-50">{subTitle}</h2>) : ''}
          </div>
        </div>
      </div>
      </header>  

<div class="ui cards centered">
  
  <div className="ui card">
      <div className="image"><img id="stockx" src="https://cdn.clipart.email/f78e4030f192e759db32beeddb03acb6_stockx-animation-process_1140-440.jpeg" /></div>
        <div className="content">
          <div className="header"> Size Data</div>
          <div className="description"> {specificData ? "Current Listings : " + specificData['Market']['numberOfAsks'] + " pairs listed" : "Select a size for in-depth info"}</div>
          <div className="description"> {specificData ? "Highest bid : € " + specificData['Market']['highestBid']  : ""}</div>
          <div className="description"> {specificData ? "Average sale price : € " + specificData['Market']['averageDeadstockPrice']  : ""}</div>
          <div className="description"> {specificData ? "Last sale price : € " + specificData['Market']['lastSale']  : ""}</div>
        
        </div>
        <div className="extra content">
        <div className="header">Buy on StockX</div>
        <form  onSubmit={(ev) => handleSubmit(ev)}>
            <fieldset>
                <p>
                          <label>Choose Size</label>
                          <br></br>
                          <select onChange={e => setSize(e.currentTarget.value)} defaultValue = "10" id = "myList">
                          <option value=""  disabled hidden></option>
                          <option value = "4">US4</option>
                          <option value = "4.5">US4.5</option>
                          <option value = "5">US5</option>
                          <option value = "5.5">US5.5</option>
                          <option value = "6">US6</option>
                          <option value = "6.5">US6.5</option>
                          <option value = "7">US7</option>
                          <option value = "7.5">US7.5</option>
                          <option value = "8">US8</option>
                          <option value = "8.5">US8.5</option>
                          <option value = "9">US9</option>
                          <option value = "9.5">US9.5</option>
                          <option selected defaultValue="10" value = "10">US10</option>
                          <option value = "10.5">US10.5</option>
                          <option value = "11">US11</option>
                          <option value = "11.5">US11.5</option>
                          <option value = "12">US12</option>
                          <option value = "12.5">US12.5</option>
                          <option value = "13">US13</option>
                          <option value = "13.5">US13.5</option>
                          <option value = "14">US14</option>
                          
                          </select>
                      </p>
                      <div>
                          <label>Total Buying Price</label>
                          <p  className="header">€ {value}</p>
                      </div>


                      </fieldset>

                      <button class="ui green button" type="submit"> Buy on StockX</button>
                  </form>
          
              </div>
    </div>

    <div className="ui card">
      <div className="image"><img src={imageUrl} /></div>
        <div className="content">
          <div className="header">{sku}</div>
          <div className="description"> Retail Price : € {stockxData ? stockxData['Product']['retailPrice'] : "Not specified"}</div>
          <div className="description"> Release Date : {stockxData ? stockxData['Product']['releaseDate'] : "Not specified"}</div>
        
        </div>
        <div className="extra content">
        <form  onSubmit={(ev) => handleSubmit(ev)}>
            <fieldset>
                <p>
                          <label>Choose Size</label>
                          <br></br>
                          <select onChange={e => setSize(e.currentTarget.value)} defaultValue = "10" id = "myList">
                          <option value=""  disabled hidden></option>
                          <option value = "4">US4</option>
                          <option value = "4.5">US4.5</option>
                          <option value = "5">US5</option>
                          <option value = "5.5">US5.5</option>
                          <option value = "6">US6</option>
                          <option value = "6.5">US6.5</option>
                          <option value = "7">US7</option>
                          <option value = "7.5">US7.5</option>
                          <option value = "8">US8</option>
                          <option value = "8.5">US8.5</option>
                          <option value = "9">US9</option>
                          <option value = "9.5">US9.5</option>
                          <option selected defaultValue="10" value = "10">US10</option>
                          <option value = "10.5">US10.5</option>
                          <option value = "11">US11</option>
                          <option value = "11.5">US11.5</option>
                          <option value = "12">US12</option>
                          <option value = "12.5">US12.5</option>
                          <option value = "13">US13</option>
                          <option value = "13.5">US13.5</option>
                          <option value = "14">US14</option>
                          
                          </select>
                      </p>
                      <div>
                          <label>Current Market Value </label>
                          <p  className="header">€ {value}</p>
                      </div>


                      </fieldset>

                      <button class="ui green button" type="submit"> Add To My Portfolio</button>
                      <p id= "success"></p>
                  </form>
          
              </div>
    </div>

    <div className="ui card">
      <div className="image"><img src={imageUrl} /></div>
        <div className="content">
          <div className="header">{sku}</div>
          <div className="description"> Retail Price : € {stockxData ? stockxData['Product']['retailPrice'] : "Not specified"}</div>
          <div className="description"> Release Date : {stockxData ? stockxData['Product']['releaseDate'] : "Not specified"}</div>
        
        </div>
        <div className="extra content">
        <form  onSubmit={(ev) => handleSubmit(ev)}>
            <fieldset>
                <p>
                          <label>Choose Size</label>
                          <br></br>
                          <select onChange={e => setSize(e.currentTarget.value)} defaultValue = "10" id = "myList">
                          <option value=""  disabled hidden></option>
                          <option value = "4">US4</option>
                          <option value = "4.5">US4.5</option>
                          <option value = "5">US5</option>
                          <option value = "5.5">US5.5</option>
                          <option value = "6">US6</option>
                          <option value = "6.5">US6.5</option>
                          <option value = "7">US7</option>
                          <option value = "7.5">US7.5</option>
                          <option value = "8">US8</option>
                          <option value = "8.5">US8.5</option>
                          <option value = "9">US9</option>
                          <option value = "9.5">US9.5</option>
                          <option selected defaultValue="10" value = "10">US10</option>
                          <option value = "10.5">US10.5</option>
                          <option value = "11">US11</option>
                          <option value = "11.5">US11.5</option>
                          <option value = "12">US12</option>
                          <option value = "12.5">US12.5</option>
                          <option value = "13">US13</option>
                          <option value = "13.5">US13.5</option>
                          <option value = "14">US14</option>
                          
                          </select>
                      </p>
                      <div>
                          <label>Current Market Value </label>
                          <p  className="header">€ {value}</p>
                      </div>


                      </fieldset>

                      <button class="ui button" type="submit"> Add To My Portfolio</button>
                      <p id= "success"></p>
                  </form>
          
              </div>
    </div>


  </div>
  
</div>



  );
};



export default PageSection;
