import 'react-native';
import React from 'react';
import TransactionItem from '../Components/Screens/TransactionItem';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('TransactionItem 렌더링', () => {
  renderer.create(<TransactionItem />);
});