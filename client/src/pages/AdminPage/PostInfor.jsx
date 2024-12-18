import { useState } from "react";
import { Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", image: null, cta: "" });
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleAddPost = () => {
    if (!newPost.title || !newPost.image || !newPost.cta) return;
    const newPostData = {
      ...newPost,
      id: posts.length + 1,
    };
    setPosts([...posts, newPostData]);
    setNewPost({ title: "", image: null, cta: "" });
  };

  const handleDeletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const handleEditPost = (post) => {
    setSelectedPost(post);
    setIsEditOpen(true);
  };

  const handleSaveEdit = () => {
    setPosts(
      posts.map((post) => (post.id === selectedPost.id ? selectedPost : post))
    );
    setIsEditOpen(false);
  };

  const renderImagePreview = (imageFile) => {
    if (!imageFile) return null;
    return URL.createObjectURL(imageFile);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="shadow-md">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">Post Management</h1>
        </CardHeader>
        <CardContent>
          {/* Form thêm bài viết */}
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                placeholder="Post Title"
              />
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setNewPost({ ...newPost, image: e.target.files[0] })}
                placeholder="Upload Image"
              />
              <Input
                value={newPost.cta}
                onChange={(e) => setNewPost({ ...newPost, cta: e.target.value })}
                placeholder="CTA"
              />
            </div>
            <div className="text-right">
              <Button onClick={handleAddPost} className="bg-blue-600 hover:bg-blue-700 text-white">
                Add Post
              </Button>
            </div>
          </div>

          {/* Table hiển thị danh sách bài viết */}
          <div className="overflow-x-auto">
  <Table>
    <TableHeader>
      <TableRow className="bg-gray-100">
        <TableHead className="text-center w-1/4">Title</TableHead>
        <TableHead className="text-center w-1/4">Image</TableHead>
        <TableHead className="text-center w-1/4">CTA</TableHead>
        <TableHead className="text-center w-1/4">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {posts.map((post) => (
        <TableRow key={post.id} className="hover:bg-gray-50 transition duration-300">
          <TableCell className="text-center">{post.title}</TableCell>
          <TableCell className="text-center">
            <img
              src={renderImagePreview(post.image)}
              alt={post.title}
              className="w-16 h-16 object-cover rounded-md shadow-md mx-auto"
            />
          </TableCell>
          <TableCell className="text-center">{post.cta}</TableCell>
          <TableCell className="text-center">
            <div className="flex justify-center space-x-2">
              <Button
                onClick={() => handleEditPost(post)}
                className="bg-yellow-500 hover:bg-yellow-600 p-2 rounded-md"
                size="icon"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => handleDeletePost(post.id)}
                className="bg-red-500 hover:bg-red-600 p-2 rounded-md"
                size="icon"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>

        </CardContent>
      </Card>

      {/* Modal chỉnh sửa bài viết */}
      {selectedPost && (
        <Dialog open={isEditOpen} onOpenChange={() => setIsEditOpen(false)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Post</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 gap-4">
              <Input
                value={selectedPost.title}
                onChange={(e) => setSelectedPost({ ...selectedPost, title: e.target.value })}
                placeholder="Post Title"
              />
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedPost({ ...selectedPost, image: e.target.files[0] })}
                placeholder="Upload Image"
              />
              <Input
                value={selectedPost.cta}
                onChange={(e) => setSelectedPost({ ...selectedPost, cta: e.target.value })}
                placeholder="Call to Action"
              />
            </div>
            <DialogFooter>
              <Button onClick={handleSaveEdit} className="bg-blue-600 text-white">
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PostsPage;
