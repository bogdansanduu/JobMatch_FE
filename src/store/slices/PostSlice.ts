import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "./UserSlice";
import AppApi from "../../server/api/AppApi";
import { RootState } from "../store";
import { CreatePostDto } from "../../server/api/PostApi";

export interface PostState {
  currentPost?: PostType;
  posts: PostType[];
}

export type LikeType = {
  id: number;
  author: UserType;
};

export type CommentType = {
  id: number;
  author: UserType;
};

export type PostType = {
  id: number;
  title: string;
  content: string;
  picture?: string;
  author: UserType;
  likes: LikeType[];
  comments: CommentType[];
  createdAt: string;
  updatedAt: string;
};

const initialState: PostState = {
  currentPost: undefined,
  posts: [],
};

export const getAllPosts = createAsyncThunk("post/getAllPosts", async () => {
  const postApi = AppApi.getPostApi();

  return await postApi.getAllPosts();
});

export const createPost = createAsyncThunk(
  "post/createPost",
  async ({ userId, postData }: { userId: number; postData: CreatePostDto }) => {
    const postApi = AppApi.getPostApi();

    return await postApi.createPost(userId, postData);
  }
);

export const likePost = createAsyncThunk(
  "post/likePost",
  async ({ postId, userId }: { postId: number; userId: number }) => {
    const postApi = AppApi.getPostApi();

    return await postApi.likePost(postId, userId);
  }
);

export const unlikePost = createAsyncThunk(
  "post/unlikePost",
  async ({ postId, userId }: { postId: number; userId: number }) => {
    const postApi = AppApi.getPostApi();

    return await postApi.unlikePost(postId, userId);
  }
);

export const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setCurrentPost: (state, action: PayloadAction<PostType>) => {
      state.currentPost = action.payload;
    },
    setPosts: (state, action: PayloadAction<PostType[]>) => {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    //GET ALL POSTS
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(getAllPosts.rejected, (state) => {
      state.posts = [];
    });
    //CREATE POST
    builder.addCase(
      createPost.fulfilled,
      (state, action: PayloadAction<PostType>) => {
        state.currentPost = action.payload;
        state.posts.push(action.payload);
      }
    );
    builder.addCase(createPost.rejected, (state) => {
      state.currentPost = undefined;
    });
    //LIKE POST
    builder.addCase(likePost.fulfilled, (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post.id === action.payload.id) {
          return action.payload;
        }
        return post;
      });
    });
    //UNLIKE POST
    builder.addCase(unlikePost.fulfilled, (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post.id === action.payload.id) {
          return action.payload;
        }
        return post;
      });
    });
  },
});

export const { setCurrentPost, setPosts } = PostSlice.actions;
export const getPosts = (state: RootState) => state.post.posts;
export const getCurrentPost = (state: RootState) => state.post.currentPost;
export default PostSlice.reducer;
