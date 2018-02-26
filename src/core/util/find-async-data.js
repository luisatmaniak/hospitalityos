import filter from 'lodash-es/filter'

const findAsyncData = ({ asyncData, mixins }) => {
  const all = filter(mixins, ({ asyncData }) => asyncData).map(({ asyncData }) => asyncData)

  if (asyncData) all.push(asyncData)

  return all
}

export default findAsyncData
