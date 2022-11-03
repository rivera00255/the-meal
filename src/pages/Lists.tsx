import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import MealCard from 'src/components/MealCard';
import styled from 'styled-components';
import { MealType } from './Recipe';

const Container = styled.div`
    width: 1200px;
    margin: 0 auto;
`;

const Title = styled.h2`
    padding-left: 4rem;
    margin: 40px 0;
    background: #afafaf;
    color: #fff;
    border-radius: 10px;
    line-height: 2.5rem;
`;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`;

function Lists() {

    const { id } = useParams();

    const [meal, setMeal] = useState<MealType[]>([]);

    useEffect(() => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`)
        .then(res => {
            setMeal(res.data.meals);
            // console.log(res.data.meals);
        })
        .catch(err => console.log(err))
    }, [])

    return ( 
        <Container>
            <Title>{`${id}`}</Title>
            <Wrapper>
                { meal?.map((item: MealType) => <MealCard key={item.idMeal} meal={item} />) }
            </Wrapper>
        </Container>
     );
}

export default Lists;