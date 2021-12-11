import 'react-native';
import React from 'react';
import Mbti3Screen from '../Components/Screens/Mbti/Mbti3Screen';
import { Calculator1, Calculator2, Calculator3, Calculator4, } from '../Components/Screens/Mbti/ScoreCalculator';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe("Mbti3Screen", () => {
    it('Mbti3Screen 렌더링', () => {
        renderer.create(<Mbti3Screen />);
    });

    it('Mbti3Screen 점수', ()=>{
        expect(Calculator1(false, false, false, true)).toBe(25);
        expect(Calculator2(false, false, false, true)).toBe(5);
        expect(Calculator3(false, false, true, false)).toBe(20);
        expect(Calculator4(true, false, false, false)).toBe(25);
    })
})