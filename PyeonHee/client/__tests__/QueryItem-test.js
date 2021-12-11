import 'react-native';
import React from 'react';
import QueryItem from '../Components/Screens/ServiceCenter/QueryItem';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('QueryItem 렌더링', () => {
  renderer.create(<QueryItem />);
});