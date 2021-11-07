
function getUserCode(pg: string, tierCode?: string, type = 'payment') {
    if (tierCode) {
      return 'imp91623210';
    }
    if (type === 'certification') {
      return 'imp10391932';
    }
  
    switch (pg) {
      case 'kakao':
        return 'imp10391932';
      case 'paypal':
        return 'imp09350031';
      case 'mobilians':
        return 'imp60029475';
      case 'naverco':
      case 'naverpay':
        return 'imp41073887';
      case 'smilepay':
        return 'imp49241793';
      case 'chai':
        return 'imp37739582';
      case 'alipay':
        return 'imp87936124';
      case 'payple':
        return 'imp42284830';
      default:
        return 'imp19424728';
    }
  }
  
  export { getUserCode };