import React, {useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import Axios from 'axios';
import './App.css';

class Stock extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            stockChartXValues: [],
            stockChartYValues: [],
            searchQuery: "",
        }
    }

    componentDidMount() {
        this.fetchStock();
    }

    handleInputChanged(event) {
        this.setState({
            searchQuery: event.target.value
        });
    }
    
    submitWatchlist(event){
        Axios.post('http://localhost:3001/watchlist/insert', {
            searchQuery: this.state.searchQuery
        }).then(() => {
            alert('added to watchlist');
        })
    };

    // deleteWatchlist(event){
    //     Axios.delete('http://localhost:3001/watchlist/delete');
    // }


    fetchStock() {
        const pointerToThis = this;
        console.log(pointerToThis);
        const API_KEY='0FW2PVFP4YLFU0Y2';
        var Ticker = this.state.searchQuery;
        let API_CALL = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + Ticker + '&outputsize=compact&apikey=${API_KEY}';
        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction =[];

        fetch(API_CALL)
            .then(
                function(response) {
                    return response.json();
                }
            )
            .then(
                function(data) {
                    console.log(data);

                    for (var key in data['Time Series (Daily)']) {
                        stockChartXValuesFunction.push(key);
                        stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
                    }

                    //console.log(stockChartXValuesFunction);
                    pointerToThis.setState({
                        stockChartXValues: stockChartXValuesFunction,
                        stockChartYValues: stockChartYValuesFunction
                    })
                }
            )
    }

    render() {
        return (
            <body>
                <section id="banner">
                    <div class="inner">
                        <h2>Stockish</h2>
                        <p>Search Stock</p>
                    </div>
                </section>

                <section id="one" class="wrapper style1">
                    <div>
                        <label htmlFor="ticker">
                            <span className="visually-hidden"></span>
                        </label>
                        <input
                            type="text"
                            id="ticker"
                            name="tickerName"
                            required="required"
                            placeholder="Search"
                            value={this.state.searchQuery}
                            onChange={this.handleInputChanged.bind(this)}
                        />
                        <button onClick={this.fetchStock.bind(this)}>Search</button>
                        <button onClick={this.submitWatchlist.bind(this)}>Add to Watchlist</button>
                        {/* <button onClick={this.deleteWatchlist.bind(this)}>Remove</button> */}
                        </div>

                        <div>
                        <Plot
                            data={[
                            {
                                x: this.state.stockChartXValues,
                                y: this.state.stockChartYValues,
                                type: 'scatter',
                                mode: 'lines+markers',
                                marker: {color: 'red'},
                            },
                            ]}
                            layout={ {width: 720, height: 440, title: {text: this.state.searchQuery} ,yaxis: {title: {text: 'Price'}}, xaxis: {title: {text: 'Date'}} } }
                        />

                    </div>
                </section>
            </body>
        )
    }

} 
 export default Stock;