import React from 'react';
import AdSense from 'react-adsense';

export default class AdsenseWidget extends React.Component {
    // componentDidMount() {
    //     const installGoogleAds = () => {
    //       const elem = document.createElement("script");
    //       elem.src =
    //         "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    //       elem.async = true;
    //       elem.defer = true;
    //       document.body.insertBefore(elem, document.body.firstChild);
    //     };
    //     installGoogleAds();
    //     (adsbygoogle = window.adsbygoogle || []).push({});
    // }

    componentDidMount() {
        const installGoogleAds = () => {
          const elem = document.createElement("script");
          elem.src =
            "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
          elem.async = true;
          elem.defer = true;
          document.body.insertBefore(elem, document.body.firstChild);
        };
        installGoogleAds();
    }
    


render () {
    return (
        // <ins className='adsbygoogle'
        //   style={{ display: 'block' }}
        //   data-ad-client='ca-pub-3236992787867833'
        //   data-ad-slot='1686195266'
        //   data-ad-format='auto'
        //   data-full-width-responsive="true" 
        // />

        <AdSense.Google
          client='ca-pub-3236992787867833'
          slot='1686195266'
          style={{ display: 'block' }}
          format='auto'
          responsive='true'
        />
    );
  }
}