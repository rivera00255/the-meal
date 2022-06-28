import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';

const Container = styled.div`
    width: 1200px;
    margin: 0 auto;
`;

const Title = styled.h2``;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`;

const Image = styled.img``;

function Detail() {

    const { idMeal } = useParams();

    interface MealInfo {
        idMeal: Number,
        strMeal: String,
        strArea: String,
        strCategory: String,
        strInstructions: String,
        strMealThumb: String
    }

    const [meal, setMeal] = useState();

    useEffect(() => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
        .then(res => {
            setMeal(res.data.meals);
            // console.log(res.data.meals);
        })
        .catch(err => console.log(err));
    }, [])

    console.log(meal);

    return ( 
        <Container>
            <Title></Title>
            <Wrapper></Wrapper>
        </Container>
     );
}

export default Detail;