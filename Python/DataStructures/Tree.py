class TreeNode:
  def __init__(self, value) -> None:
    self.info = value
    self.left = None
    self.right = None
    self.level = None

  def __str__(self) -> str:
    return str(self.info)

  @staticmethod
  def preOrder(root) -> None:
    print(root, end = " ")
    if root.left:
      TreeNode.preOrder(root.left)
    if root.right:
      TreeNode.preOrder(root.right)

  @staticmethod
  def postOrder(root) -> None:
    if root.left:
      TreeNode.postOrder(root.left)
    if root.right:
      TreeNode.postOrder(root.right)
    print(root, end = " ")

  @staticmethod
  def inOrder(root) -> None:
    def dfs(root) -> list:
      if root == None:
        return []
      return dfs(root.left) + [root.info] + dfs(root.right)
    print(*dfs(root))
  
  @staticmethod
  def height(root) -> int:
    def dfs(root, counter) -> int:
      if root == None:
        return 1
      return dfs(root.left) + dfs(root.right)
    return dfs(root, -1)



class BinarySearchTree:
  def __init__ (self) -> None:
    self.root = None
  
  def create(self, val) -> None:
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
  pass

    