import 'react-native';
import React from 'react';
import TransactionItemInAccount from '../Components/Screens/TransactionItemInAccount';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('TransactionItemInAccount 렌더링', () => {
  renderer.create(<TransactionItemInAccount />);
});