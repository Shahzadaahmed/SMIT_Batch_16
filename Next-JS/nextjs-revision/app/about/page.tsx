// About Screen...!

"use client";

import React, { useEffect, useState } from 'react';
import Header from '../src/components/header/header';
import axios from 'axios';

const About = () => {
    const [searchInput, setSearchInput] = useState("");
    const [users, setUsers] = useState([]);

    const handleSearch = async (value: any) => {
        console.log(value);
        setSearchInput(value)

        if (searchInput == '') {
            setUsers([]);
            return;
        };

        const apiUrl = `http://localhost:5000/seach-user?keyword=${searchInput}`;
        const response = await axios.get(apiUrl);
        console.log(response);
        response && setUsers(response?.data?.data);
    }

    useEffect(() => {
        if (searchInput == '' || searchInput.trim().length < 1) {
            setUsers([]);
        };
    }, [searchInput]);

    return (
        <div>
            <Header screenName='About' />
            <h2> Search User... </h2>

            <input
                type="text"
                placeholder='Search User...'
                value={searchInput}
                onChange={(e: any) => handleSearch(e.target.value)}
            />

            <ul>
                {
                    users && users?.map((item: any, index: number) => {
                        return (
                            <li key={index}> {item?.userName} </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};

export default About;
