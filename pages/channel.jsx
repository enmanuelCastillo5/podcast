
import React, { Component } from 'react';
import Error from 'next/error';

import Layout from '../components/layout';
import PodcastList from '../components/podcast-list';
import ChannelGrid from '../components/channel-grid';

export default class extends Component {

    static async getInitialProps({ query, res }) {
      let idChannel = query.id;
      try {
            let [reqChannel, reqAudio, reqSeries ] = await Promise.all([
                  fetch(`https://api.audioboom.com/channels/${idChannel}`),
                  fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`),
                  fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`)
            ])
            if (reqChannel.status >= 404) {
                  res.statusCode = reqChannel.status
                  return { channel:null, audioClips:null, series:null, statusCode:reqChannel.status}
            }
      /////////////////////////////////////////////////////////////////

            let dataChannel = await reqChannel.json()
            let channel = dataChannel.body.channel
      /////////////////////////////////////////////////////////////////

            let dataAudios = await reqAudio.json()
            let audioClips = dataAudios.body.audio_clips
      ////////////////////////////////////////////////////////////////


            let dataSeries = await reqSeries.json()
            let series = dataSeries.body.channels

      /////////////////////////////////////////////////////////////////

            return { channel, audioClips, series, statusCode: 200}

      } catch(e) {
            return {channel: null, audioClips: null, series:null, statusCode: 503}
      }
    }
    render() {
        const { channel, audioClips, series, statusCode } = this.props

        if (statusCode !== 200) {
              return <Error statusCode={ statusCode } />
        }

        return <Layout title={channel.title}>
            <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />
            <h1>{channel.title}</h1>
            <h2>Series</h2>
            <div className="channels">
            <ChannelGrid channels={series} />
            </div>
            <h2>Ultimos Podcasts</h2>
            <PodcastList audioClips={audioClips} />
      </Layout>

    }
}