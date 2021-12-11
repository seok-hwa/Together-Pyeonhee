import 'react-native';
import React from 'react';
import SavingItem from '../Components/Screens/SavingItem';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('SavingItem 렌더링', () => {
  renderer.create(<SavingItem />);
});