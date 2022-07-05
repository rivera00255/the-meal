import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import styled from 'styled-components';

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

const Cover = styled.div`
    width: 160px;
    height: 160px;
    border-radius: 50%;
    border: 2px solid #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
`;

const Card = styled.div`
    width: 200px;
    height: 200px;
    box-shadow: 4px 4px 8px #afafaf;
    border-radius: 50%;
    background: #eee;
    text-align: center;
    font-size: 0.9rem;
    font-weight: 500;
    position: relative;
    color: #fff;
    text-shadow: 3px 3px 5px #222;
    margin: 20px;
    img {
        width: 100%;
        height: auto;
        border-radius: 50%;
    }
    p{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    &:hover {
        box-shadow: none;
    }
    &:hover ${Cover} {
        display: block;
    }
`;

function Lists() {

    const { id } = useParams();

    const navigate = useNavigate();
    const location = useLocation();

    type MealType = {
        idMeal: number,
        strMeal: string,
        strMealThumb: string
    }

    const [meal, setMeal] = useState<MealType[]>([]);

    const onClick = (idMeal: number) => {
        navigate(`${location.pathname}/${idMeal}`);
    }

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
                {
                    meal &&
                    meal.map(item => (
                        <Card key={item.idMeal} onClick={() => onClick(item.idMeal)}>
                            <img src={`${item.strMealThumb}`} alt={`${item.strMeal}`} />
                            <Cover />
                            <p>{item.strMeal}</p>
                        </Card>
                    ))
                }
            </Wrapper>
        </Container>
     );
}

export default Lists;