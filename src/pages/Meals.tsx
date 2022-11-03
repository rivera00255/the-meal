import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const Container = styled.div`
    width: 1200px;
    margin: 0 auto;
`;

const CategoryWrapper = styled.div`
    width: 100%;
    display: flex;
    /* justify-content: space-between; */
    flex-wrap: wrap;
`;

const Category = styled.div<{url: String}>`
    width: 200px;
    height: 200px;
    box-shadow: 3px 3px 5px #afafaf;
    margin: 32px 48px;
    border: 1px solid #eee;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.url && `url('${props.url}')`};
    background-repeat: no-repeat;
    background-size: cover;
    cursor: pointer;
    div {
        width: 100%;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.4);
        color: #fff;
    }
`;

function Meals() {

    type CategoryType = {
        idCategory: number, 
        strCategory: String,
        strCategoryDescription: String,
        strCategoryThumb: String
    };

    const [categories, setCategories] = useState<CategoryType[]>([]);

    const navigate = useNavigate();

    const getCategory = (strCategory: String) => {
        navigate(`/meals/${strCategory}`);
    }

    useEffect(() => {
        axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(res => {
            setCategories(res.data.categories);
            // console.log(res.data.categories);
        })
        .catch(err => console.log(err))
    }, [])

    return ( 
        <Container>
            <CategoryWrapper>
                {
                    categories?.map((category: CategoryType) => (
                        <Category 
                        key={category.idCategory} 
                        url={category.strCategoryThumb}
                        onClick={() => getCategory(category.strCategory)}
                        >
                            <div>{category.strCategory}</div>
                        </Category>
                    ))
                }
                </CategoryWrapper>
        </Container>
     );
}

export default Meals;