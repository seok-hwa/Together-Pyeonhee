import 'react-native';
import React from 'react';
import myBudgetCabinetItem from '../Components/Screens/BudgetTabs/myBudgetCabinetItem';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('myBudgetCabinetItem 렌더링', () => {
  renderer.create(<myBudgetCabinetItem />);
});