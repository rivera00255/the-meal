import React from 'react';
import { useNavigate } from 'react-router';
import { MealType } from 'src/pages/Recipe';
import styled from 'styled-components';

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
    cursor: pointer;
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

const MealCard = (props: { meal: MealType }) => {

    const navigate = useNavigate();

    const onClick = (idMeal: number, strCategory: string) => {
        navigate(`../meals/${strCategory}/${idMeal}`);
    }

    return (
        <Card onClick={() => onClick(props.meal.idMeal, props.meal.strCategory)}>
            <img src={`${props.meal.strMealThumb}`} alt={`${props.meal.strMeal}`} />
            <Cover />
            <p>{props.meal.strMeal}</p>
        </Card>
    );
}

export default MealCard;