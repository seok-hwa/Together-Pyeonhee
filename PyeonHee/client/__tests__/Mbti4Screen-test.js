import 'react-native';
import React from 'react';
import Mbti4Screen from '../Components/Screens/Mbti/Mbti4Screen';
import { Calculator1, Calculator2, Calculator3, Calculator4, } from '../Components/Screens/Mbti/ScoreCalculator';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe("Mbti4Screen", () => {
    it('Mbti4Screen 렌더링', () => {
        renderer.create(<Mbti4Screen />);
    });

    it('Mbti4Screen 점수', ()=>{
        expect(Calculator1(false, false, false, false, true)).toBe(25);
        expect(Calculator2(false, false, false, true, false)).toBe(5);
        expect(Calculator3(false, false, false, true, false)).toBe(20);
        expect(Calculator4(true, false, false, false, false)).toBe(25);
    })
})