import React from 'react'
import { storiesOf } from '@kadira/storybook'

import PostItem from 'components/modules/Post/PostItem/PostItem'

const mockPost = {
  _id: '234432',
  title: 'ฟังความเห็นหนุ่มญี่ปุ่นให้รู้ไปเลย! เทคนิคสารภาพรักอย่างไรให้ได้ผล',
  excerpt: 'วันนี้เราจะไปฟังความเห็นของหนุ่มญี่ปุ่นให้รู้ไปเลยว่าการสารภาพรักแบบไหนที่มีโอกาสสำเร็จมากที่สุด'
}

storiesOf('PostItem.Style1', module)
  .addDecorator((story) => (
    <div style={{
      width: '300px',
      margin: '15px'
    }}>
      {story()}
    </div>
  ))
  .add('Normal', () => (
    <PostItem post={mockPost} />
  ))
