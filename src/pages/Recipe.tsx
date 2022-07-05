import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import styled from 'styled-components';

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

    interface MealType {
        idMeal: number,
        strArea: string,
        strCategory: string,
        strMeal: string,
        strMealThumb: string,
        strInstructions: string
    }

    const { idMeal } = useParams();
    const location = useLocation();


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
    }, [])

    return ( 
        <Container>
            <Title>
                {recipe && recipe.strMeal}
            </Title>
            <Wrapper>
                <Image>
                    <img src={recipe?.strMealThumb} alt='recipe' />
                </Image>
                <Desc>
                    <SubTitle>Ingredients</SubTitle>
                    <TagWrapper>
                        {
                            ingredient.map((item, i) => (
                                <Tag key={i}>{`${item} ${measure[i]}`}</Tag>
                            ))
                        }
                    </TagWrapper>
                    <SubTitle>Instructions</SubTitle>
                    <Text>
                        {recipe?.strInstructions}
                    </Text>
                </Desc>
            </Wrapper>
        </Container>
     );
}

export default Recipe;