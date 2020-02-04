
import React, { Component } from 'react';
import Error from 'next/error';

import Layout from '../components/layout';
import PodcastListWithClick from '../components/PodcastListWithClick';
import ChannelGrid from '../components/channel-grid';
import PodcastPlayer from '../components/PodcastPlayer';

export default class extends Component {
      constructor(props) {
        super(props)
        this.state = { openPodcast: null }
      }

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

    openPodcast = (event, podcast) => {
      event.preventDefault()
      this.setState({
            openPodcast: podcast
      })
    }

    closePodcast = (event) => {
          event.preventDefault()
          this.setState({
                openPodcast: null
          })
    }

    render() {
        const { channel, audioClips, series, statusCode } = this.props
        const { openPodcast } = this.state

        if (statusCode !== 200) {
              return <Error statusCode={ statusCode } />
        }

        return <Layout title={channel.title}>
            <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />

           { openPodcast && <div className="modal">
                 <PodcastPlayer clip={ openPodcast } onClose={ this.closePodcast } />
                 </div> }

            <h1>{channel.title}</h1>
            <h2>Series</h2>
            <div className="channels">
            <ChannelGrid channels={series} />
            </div>
            <h2>Ultimos Podcasts</h2>
            <PodcastListWithClick podcasts={audioClips} onClickPodcast={ this.openPodcast }/>
            <style jsx>{`
                  .modal {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        z-index: 9999;
                        color: #00f;
                  }
                  `}</style>
      </Layout>

    }
}