import 'react-native';
import React from 'react';
import NoticeItem from '../Components/Screens/Notice/NoticeItem';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('NoticeItem 렌더링', () => {
  renderer.create(<NoticeItem />);
});