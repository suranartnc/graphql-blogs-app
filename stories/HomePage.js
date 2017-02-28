import React from 'react'
import { storiesOf } from '@kadira/storybook'

import HomePage from 'components/pages/Home/HomePage'
import withPreloader from 'hocs/withPreloader'

const props = {
  data: {
    loading: true,
    posts: [
      {
        _id: '1',
        title: 'ฟังความเห็นหนุ่มญี่ปุ่นให้รู้ไปเลย! เทคนิคสารภาพรักอย่างไรให้ได้ผล',
        excerpt: 'วันนี้เราจะไปฟังความเห็นของหนุ่มญี่ปุ่นให้รู้ไปเลยว่าการสารภาพรักแบบไหนที่มีโอกาสสำเร็จมากที่สุด'
      }, {
        _id: '2',
        title: 'ฟังความเห็นหนุ่มญี่ปุ่นให้รู้ไปเลย! เทคนิคสารภาพรักอย่างไรให้ได้ผล',
        excerpt: 'วันนี้เราจะไปฟังความเห็นของหนุ่มญี่ปุ่นให้รู้ไปเลยว่าการสารภาพรักแบบไหนที่มีโอกาสสำเร็จมากที่สุด'
      }, {
        _id: '3',
        title: 'ฟังความเห็นหนุ่มญี่ปุ่นให้รู้ไปเลย! เทคนิคสารภาพรักอย่างไรให้ได้ผล',
        excerpt: 'วันนี้เราจะไปฟังความเห็นของหนุ่มญี่ปุ่นให้รู้ไปเลยว่าการสารภาพรักแบบไหนที่มีโอกาสสำเร็จมากที่สุด'
      }
    ]
  },
  onNextPageClicked: function (e) {
    console.log('onNextPageClicked', e)
  }
}

storiesOf('HomePage', module)
  .add('Normal', () => (
    <HomePage {...props} />
  ))
  .add('Loading', () => {
    const HomePageWithPreloader = withPreloader(HomePage)
    return <HomePageWithPreloader {...props} />
  })
