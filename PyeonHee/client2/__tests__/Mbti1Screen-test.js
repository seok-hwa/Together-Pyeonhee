import 'react-native';
import React from 'react';
import Mbti1Screen from '../Components/Screens/Mbti/Mbti1Screen';
import { Calculator1, Calculator2, Calculator3, Calculator4, } from '../Components/Screens/Mbti/ScoreCalculator';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe("Mbti1Screen", () => {
    it('Mbti1Screen 렌더링', () => {
        renderer.create(<Mbti1Screen />);
    });

    it('Mbti1Screen 점수', ()=>{
        expect(Calculator1(true, false, false, false)).toBe(5);
        expect(Calculator2(false, false, false, true)).toBe(5);
        expect(Calculator3(false, false, true, false)).toBe(20);
        expect(Calculator4(true, false, false, false)).toBe(25);
    })
})