import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MealCard from 'src/components/MealCard';
import { RootState } from 'src/store';
import { reset } from 'src/store/slices/bookmarkSlice';
import styled from 'styled-components';
import { MealType } from './Recipe';

const Container = styled.div`
    width: 1200px;
    margin: 0 auto;
    padding: 40px 0;
`;

const Title = styled.h2`
    padding-left: 4rem;
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

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 40px;
`;

const Button = styled.button`
    padding: 0.4rem 2rem;
    border: none;
    background: #222;
    box-shadow: 3px 3px 4px #bababa;
    color: #fff;
    font-weight: 700;
    border-radius: 20px;
    &:hover {
        background: #444;
        box-shadow: none;
    }
    &:active {
        background: #444;
        box-shadow: none;
    }
`;

const MyPage = () => {

    const meal = useSelector((state: RootState) => state.bookmark);
    const dispatch = useDispatch();
    // console.log(meal);

    return (
        <Container>
            <Title>Bookmark</Title>
            <Wrapper>
                { meal?.map((item: MealType) => <MealCard key={item.idMeal} meal={item} />) }
            </Wrapper>
            <ButtonWrapper>
                { meal.length > 0 && <Button onClick={() => dispatch(reset())}>reset</Button> }
            </ButtonWrapper>
        </Container>
    );
}

export default MyPage;
