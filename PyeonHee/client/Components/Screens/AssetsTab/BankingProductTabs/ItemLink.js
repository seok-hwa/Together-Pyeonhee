import React from 'react';
import { WebView } from 'react-native-webview';
import Loading from '../../Loading';

const ItemLink = ({navigation, route}) => {
    return (
        <WebView
        source={{ uri: route.params.link }}
        startInLoadingState={true}
        renderLoading={() => <Loading />}
        originWhitelist={['*']}
        scalesPageToFit={false}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
        onMessage={(event) => { authProgress(event.nativeEvent["url"]); }}
      />
    );
};

export default ItemLink;