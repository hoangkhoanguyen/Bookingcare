import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { languages } from '../../utils'

export const Comment = (props) => {

    const { dataHref, width, numPost } = props
    const language = useSelector(state => state.app.language)

    const initFacebookSDK = () => {
        if (window.FB) {
            window.FB.XFBML.parse()
        }
        let locale = language == languages.EN ? 'en_US' : 'vi_VN'
        window.fbAsyncInit = () => {
            window.FB.init({
                appId: process.env.REACT_APP_FACEBOOK_APP_ID,
                cookie: true, //enable cookies to allow the server to access the session
                xfbml: true, // parse social plugin on this page
                version: 'v2.5'

            })
        }

        // load the SDK asynchronously
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0]
            if (d.getElementById(id)) return
            js = d.createElement(s)
            js.id = id
            js.src = `//connect.facebook.net/${locale}/sdk.js`
            fjs.parentNode.insertBefore(js, fjs)
        }(document, 'script', 'facebook-jssdk'))
    }

    useEffect(() => {
        initFacebookSDK()
    }, [])
    return (
        <>
            <div class="fb-comments"
                data-href={dataHref}
                data-width={width || ''}
                data-numposts={numPost || 5}>
            </div>
        </>
    )
}
