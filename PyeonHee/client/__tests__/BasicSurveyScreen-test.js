import 'react-native';
import React from 'react';
import BasicSurveyScreen from '../Components/Screens/Mbti/BasicSurveyScreen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('BasicSurveyScreen 렌더링', () => {
  renderer.create(<BasicSurveyScreen />);
});