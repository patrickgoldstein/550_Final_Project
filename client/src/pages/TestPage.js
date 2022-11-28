import React, { useState } from 'react';
import {
    Table,
    Card,
    Pagination,
    Select
} from 'antd'


import '../assets/scss/card.scss'

import MenuBar from '../components/MenuBar';

import DisplayCards from '../components/DisplayCards';
import Login from '../components/Login'
import { getCorrectnessRateSubject, getCorrectnessByUser, getWeaknessStrength, getCorrectnessRateQuestion } from '../fetcher'
const { Column, ColumnGroup } = Table;
const { Option } = Select;


class TestPage extends React.Component {


    render() {

        return (

            <div>
                <MenuBar />
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
                </div>

                <div> Test Page </div>


            </div>    
            )
    }

}

export default TestPage

