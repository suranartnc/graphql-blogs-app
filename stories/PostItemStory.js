import React from 'react'
import { storiesOf } from '@kadira/storybook'

import PostItem from 'components/modules/Post/PostItem/PostItem'

const mockPost = {
  _id: '234432',
  img: 'http://p3.isanook.com/me/0/rp/rc/w257h154/ya0xa0m1w0/aHR0cDovL3AzLmlzYW5vb2suY29tL21lLzAvdWQvMy8xNzEzMy85OTkuanBnLmpwZw==.jpg',
  title: 'ฟังความเห็นหนุ่มญี่ปุ่นให้รู้ไปเลย! เทคนิคสารภาพรักอย่างไรให้ได้ผล',
  desc: 'วันนี้เราจะไปฟังความเห็นของหนุ่มญี่ปุ่นให้รู้ไปเลยว่าการสารภาพรักแบบไหนที่มีโอกาสสำเร็จมากที่สุด',
  category: 'แฟชั่นผู้ชาย',
  category_link: 'http://www.google.co.th',
  date: '2017-02-14 18:57'
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
