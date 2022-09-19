class TreeNode:
  def __init__(self, value):
    self.info = value
    self.left = None
    self.right = None
    self.level = None

  def __str__(self) -> str:
    return str(self.info)

  @staticmethod
  def preOrder(root):
    print(root)
    if(root.left):
      TreeNode.preOrder(root.left)
    if(root.right):
      TreeNode.preOrder(root.right)


class BinarySearchTree:
  def __init__ (self):
    self.root = None
  
  def create(self, val):
    if self.root == None:
      self.root = TreeNode(val)
    else:
      current = self.root
      while True:
        if val < current.info:
          if current.left:
            current = current.left
          else:
            current.left = TreeNode(val)
            break
        elif val > current.info:
          if current.right:
            current = current.right
          else:
            current.right = TreeNode(val)
            break
        else:
            break
        
if __name__ == '__main__':
  tree = BinarySearchTree()
  tree.create(1)
  tree.create(2)
  tree.create(5)
  tree.create(3)
  tree.create(6)
  tree.create(4)
  TreeNode.preOrder(tree.root)

    