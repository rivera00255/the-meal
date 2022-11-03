import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { RootState } from 'src/store';
import { add } from 'src/store/slices/bookmarkSlice';
import styled from 'styled-components';
import { ReactComponent as AddIcon } from '../assets/icon/plus.svg';

export interface MealType {
    idMeal: number,
    strArea: string,
    strCategory: string,
    strMeal: string,
    strMealThumb: string,
    strInstructions: string
}

const Container = styled.div`
    width: 1200px;
    margin: 0 auto;
`;

const Title = styled.h2`
    text-align: center;
    margin: 40px 0;
`;

const Wrapper = styled.div`
    width: 90%;
    margin: 0 auto;
    margin-bottom: 100px;
    position: relative;
`;

const Button = styled.button`
    background: #fff;
    border: 1px solid #888;
    border-radius: 50%;
    padding: 8px;
    position: absolute;
    top: 360px;
    right: 280px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        transform: scale(1.05);
    }
`;

const Image = styled.div`
    max-width: 400px;
    margin: 0 auto;
    img {
        width: 100%;
        height: auto;
    }
`;

const Desc = styled.div`
    width: 100%;
    margin: 20px;
`;

const SubTitle = styled.h3`
    margin: 40px 0 20px 20px;
`;

const TagWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`;

const Tag = styled.div`
    border: 1px solid #eee;
    padding: 0.5rem;
    border-radius: 20px;
    margin: 4px 8px;
    font-weight: 300;
`;

const Text = styled.div`
    width: 96%;
    margin: 0 auto;
    line-height: 1.5rem;
    font-weight: 300;
`;

function Recipe() {

    const { idMeal } = useParams();
    const location = useLocation();

    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const detailUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    const ramdomUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

    const [recipe, setRecipe] = useState<MealType>(); // MealInfo
    const [ingredient, setIngredient] = useState<string[]>([]); // Ingredient Array
    const [measure, setMesure] = useState<String[]>([]); // Ingredient Measure Array

    const getIngredients = (obj: string[]): void => {
        // console.log(Object.keys(obj).filter(key => key.includes('Ingredient')))
        for(let i in obj) {
            if(i.includes('strIngredient')) {
                if(obj[i] !== '') {
                    setIngredient(prev => [...prev, obj[i]])
                }
            }
        }
    }

    const getMeasure = (obj: string[]): void => {
        for(let i in obj) {
            if(i.includes('strMeasure')) {
                if(obj[i] !== '') setMesure(prev => [...prev, obj[i]]);
            }
        }
    }

    useEffect(() => {
        axios.get(location.pathname === '/recipe' ? ramdomUrl : detailUrl)
        .then(res => {
            // console.log(res.data.meals[0]);
            setRecipe(res.data.meals[0]);
            getIngredients(res.data.meals[0]);
            getMeasure(res.data.meals[0]);
        }).catch(err => console.log(err));
    }, [location.pathname])

    return ( 
        <Container>
            <Title>{recipe?.strMeal}</Title>
            <Wrapper>
                {
                    auth.credential !== '' && 
                    <Button onClick={() => dispatch(add(recipe))}>
                        <AddIcon width='12px' height='12px' />
                    </Button>
                }
                <Image><img src={recipe?.strMealThumb} alt='recipe' /></Image>
                <Desc>
                    <SubTitle>Ingredients</SubTitle>
                    <TagWrapper>
                        {
                            ingredient.map((item, i) => (
                                item !== null && <Tag key={i}>{`${item} ${measure[i]}`}</Tag>
                            ))
                        }
                    </TagWrapper>
                    <SubTitle>Instructions</SubTitle>
                    <Text>{recipe?.strInstructions}</Text>
                </Desc>
            </Wrapper>
        </Container>
     );
}

export default Recipe;