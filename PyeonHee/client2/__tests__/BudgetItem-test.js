import 'react-native';
import React from 'react';
import BudgetItem from '../Components/Screens/BudgetItem';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('BudgetItem 렌더링', () => {
  renderer.create(<BudgetItem />);
});