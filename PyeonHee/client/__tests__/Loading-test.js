import 'react-native';
import React from 'react';
import Loading from '../Components/Screens/Loading';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('로딩 렌더링 완료', () => {
  renderer.create(<Loading />);
});