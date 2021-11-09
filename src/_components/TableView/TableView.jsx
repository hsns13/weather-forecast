import React, { Component } from 'react';

import Button from '../Button';

import { fahrenheitToCelcius } from '../../_helper';

export class TableView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
            clusteredData: {},
            dataIndex: 0,
            buttonList: [],
            dataList: []
        };
    }

    componentDidMount() {
        // cluster data per day
        const clusteredData = {};

        for (let item of this.props.dataList) {
            const date = new Date(item.dt_txt);
            const key = `${date.getDate()} ${this.state.monthNames[date.getMonth()]}`;

            if (!clusteredData[key]) {
                clusteredData[key] = [];
            }

            clusteredData[key].push(item);
        }

        // prepare button list
        let buttonList = [];
        for (const item in clusteredData) {
            if (clusteredData.hasOwnProperty(item)) {
                buttonList.push(
                    <Button key={item} name={item} onClick={this.onClick}>
                    </Button>
                );
            }
        }

        const key = Object.keys(clusteredData)[0];
        const dataList = clusteredData[key];

        this.setState({
            clusteredData,
            dataList,
            buttonList
        });
    }

    onClick = (e) => {
        this.setState((prevState) => ({
            dataList: prevState.clusteredData[e.target.value]
        }));
    }

    render() {
        return (
            <div className="table--container">
                <div>
                    <table className="table-design">
                        <thead>
                            <tr>
                                {
                                    this.props.columnList.map(item => {
                                        return <th key={item}>{item}</th>;
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.dataList.map((item, index) => {
                                    const date = new Date(item.dt_txt);
                                    const formattedDate = `${date.getDate()} ${this.state.monthNames[date.getMonth()]} - ${date.toLocaleString('en-US', {
                                        hour: 'numeric',
                                        hour12: true
                                    })}`;

                                    return <tr key={index}>
                                        <td>{formattedDate}</td>
                                        <td>{`${fahrenheitToCelcius(item.main.temp)} `}&#8451;</td>
                                        <td>{`${fahrenheitToCelcius(item.main.temp_min)} `}&#8451;</td>
                                        <td>{`${fahrenheitToCelcius(item.main.temp_max)} `}&#8451;</td>
                                        <td>{item.wind.speed}</td>
                                        <td>{item.weather[0].description}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="button--container">
                    {
                        this.state.buttonList
                    }
                </div>
            </div>
        );
    }
}