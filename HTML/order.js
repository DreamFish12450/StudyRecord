function TreeNode (val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}
var root = new TreeNode();

function preOrder(root){
    // 根 左 右
    let res = []
    let stack = []
    while (root || stack.length){
        res.push(root.val)
        stack.push(root)
        root = root.left
    }
    root = stack.pop()
    root = root.right;
    return res;
}
function midOrder(root){
    //左 根 右
    let stack = []
    let res = [];
    while(root || stack.length){
        stack.push(root)
        root = root.left

    }
    root = stack.pop()
    res.push(root.val)
    root = root.right;
    return res
    
}
function afterOrder(root){
    const res =[];
    const stack = [];
    while (root || stack.length){
      while(root){
        stack.push(root);
        res.unshift(root.val);
        root = root.right;
      }
      root = stack.pop();
      root = root.left;
    }
    return res;

作者：mengxiang
链接：https://leetcode-cn.com/problems/binary-tree-postorder-traversal/solution/die-dai-chao-jian-dan-qian-zhong-hou-er-b79fc/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

}