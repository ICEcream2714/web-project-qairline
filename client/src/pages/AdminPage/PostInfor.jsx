import { useState, useEffect } from 'react';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', image: '', cta: '' });
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts/');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleAddPost = async () => {
    if (!newPost.title || !newPost.image || !newPost.cta) return;
    try {
      const response = await fetch('http://localhost:5000/api/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error('Failed to add post');
      }

      const addedPost = await response.json();
      setPosts([...posts, addedPost]);
      setNewPost({ title: '', image: '', cta: '' });
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEditPost = (post) => {
    setSelectedPost(post);
    setIsEditOpen(true);
  };

  //TODO: confirmation dialog
  //TODO: Toast notification

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${selectedPost.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(selectedPost),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to save changes');
      }

      const updatedPost = await response.json();
      setPosts(
        posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
      );
      setIsEditOpen(false);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  const renderImagePreview = (imageURL) => {
    if (!imageURL) return null;
    return imageURL;
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="shadow-md">
        <CardHeader>
          <h1 className="text-center text-2xl font-bold">Post Management</h1>
          <span className="block text-sm text-gray-500">
            Todo:
            <ul className="ml-6 list-disc">
              <li>Confirmation dialog add, edit, delete</li>
              <li>Toast/sonner notification add, edit, delete</li>
              <li>Disable nút Add post khi thông tin chưa được nhập đủ</li>
            </ul>
          </span>
        </CardHeader>
        <CardContent>
          {/* Form thêm bài viết */}
          <div className="mb-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Input
                value={newPost.title}
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
                placeholder="Post Title"
              />
              {/* <Input
                type="file"
                accept="image/*"
                onChange={(e) => setNewPost({ ...newPost, image: e.target.files[0] })}
                placeholder="Upload Image"
              /> */}
              <Input
                value={newPost.image}
                onChange={(e) =>
                  setNewPost({ ...newPost, image: e.target.value })
                }
                placeholder="Image URL"
              />
              <Input
                value={newPost.cta}
                onChange={(e) =>
                  setNewPost({ ...newPost, cta: e.target.value })
                }
                placeholder="CTA"
              />
            </div>
            <div className="text-right">
              <Button
                onClick={handleAddPost}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Add Post
              </Button>
            </div>
          </div>

          {/* Table hiển thị danh sách bài viết */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="w-1/4 text-center">Title</TableHead>
                  <TableHead className="w-1/4 text-center">Image</TableHead>
                  <TableHead className="w-1/4 text-center">CTA</TableHead>
                  <TableHead className="w-1/4 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow
                    key={post.id}
                    className="transition duration-300 hover:bg-gray-50"
                  >
                    <TableCell className="text-center">{post.title}</TableCell>
                    <TableCell className="text-center">
                      <img
                        src={renderImagePreview(post.image)}
                        alt={post.title}
                        className="mx-auto h-16 w-16 rounded-md object-cover shadow-md"
                      />
                    </TableCell>
                    <TableCell className="text-center">{post.cta}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center space-x-2">
                        <Button
                          onClick={() => handleEditPost(post)}
                          className="rounded-md bg-yellow-500 p-2 hover:bg-yellow-600"
                          size="icon"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => handleDeletePost(post.id)}
                          className="rounded-md bg-red-500 p-2 hover:bg-red-600"
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
                onChange={(e) =>
                  setSelectedPost({ ...selectedPost, title: e.target.value })
                }
                placeholder="Post Title"
              />
              {/* <Input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedPost({ ...selectedPost, image: e.target.files[0] })}
                placeholder="Upload Image"
              /> */}
              <Input
                value={selectedPost.image}
                onChange={(e) =>
                  setSelectedPost({ ...selectedPost, image: e.target.value })
                }
                placeholder="Image URL"
              />
              <Input
                value={selectedPost.cta}
                onChange={(e) =>
                  setSelectedPost({ ...selectedPost, cta: e.target.value })
                }
                placeholder="Call to Action"
              />
            </div>
            <DialogFooter>
              <Button
                onClick={handleSaveEdit}
                className="bg-blue-600 text-white"
              >
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
