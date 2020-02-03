import 'isomorphic-fetch'
import Error from 'next/error'

import Layout from '../components/layout';
import ChannelGrid from '../components/channel-grid';
export default class extends React.Component {

    static async getInitialProps({ res }) {
        try {
      let req = await fetch('https://api.audioboom.com/channels/recommended')
      let { body: channels } = await req.json()

      return { channels, statusCode: 200 }
    } catch(a) {
        res.statusCode = 503
        return {channel: null, statusCode: 503}
   }
 }

    render() {
        const { channels, statusCode } = this.props;

        if (statusCode !== 200) {
            return <Error statusCode = {statusCode} />
        }
        return <Layout title='podtcast'>
            <ChannelGrid channels={channels} />
        </Layout>
    }
}