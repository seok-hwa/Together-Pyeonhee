import 'react-native';
import React from 'react';
import LoanItem from '../Components/Screens/AssetsTab/BankingProductTabs/LoanItem';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('LoanItem 렌더링', () => {
  renderer.create(<LoanItem />);
});