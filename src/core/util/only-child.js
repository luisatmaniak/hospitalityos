const onlyChild = children => {
  if (children.length > 1) throw new Error('Expected only one child')

  return children[0]
}

export default onlyChild
