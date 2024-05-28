import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "./UserSlice";
import AppApi from "../../server/api/AppApi";
import { RootState } from "../store";
import { CommentPostDto, CreatePostDto } from "../../server/api/PostApi";
import { CompanyType } from "./CompanySlice";
import { revertAll } from "../actions";

export interface PostState {
  currentPost?: PostType;
  posts: PostType[];
}

export type LikeType = {
  id: number;
  author: UserType;
  company: CompanyType;
};

export type CommentType = {
  id: number;
  author: UserType;
  likes: LikeType[];
  post: {
    id: number;
  };
  content: string;
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

export const createPostCompany = createAsyncThunk(
  "post/createPostCompany",
  async ({
    companyId,
    postData,
  }: {
    companyId: number;
    postData: CreatePostDto;
  }) => {
    const postApi = AppApi.getPostApi();

    return await postApi.createPostCompany(companyId, postData);
  }
);

export const likePost = createAsyncThunk(
  "post/likePost",
  async ({ postId, userId }: { postId: number; userId: number }) => {
    const postApi = AppApi.getPostApi();

    return await postApi.likePost(postId, userId);
  }
);

export const likePostCompany = createAsyncThunk(
  "post/likePostCompany",
  async ({ postId, companyId }: { postId: number; companyId: number }) => {
    const postApi = AppApi.getPostApi();

    return await postApi.likePostCompany(postId, companyId);
  }
);

export const unlikePost = createAsyncThunk(
  "post/unlikePost",
  async ({ postId, userId }: { postId: number; userId: number }) => {
    const postApi = AppApi.getPostApi();

    return await postApi.unlikePost(postId, userId);
  }
);

export const unlikePostCompany = createAsyncThunk(
  "post/unlikePostCompany",
  async ({ postId, companyId }: { postId: number; companyId: number }) => {
    const postApi = AppApi.getPostApi();

    return await postApi.unlikePostCompany(postId, companyId);
  }
);

export const commentPost = createAsyncThunk(
  "post/commentPost",
  async ({
    postId,
    userId,
    commentData,
  }: {
    postId: number;
    userId: number;
    commentData: CommentPostDto;
  }) => {
    const postApi = AppApi.getPostApi();

    return await postApi.commentPost(postId, userId, commentData);
  }
);

export const commentPostCompany = createAsyncThunk(
  "post/commentPostCompany",
  async ({
    postId,
    companyId,
    commentData,
  }: {
    postId: number;
    companyId: number;
    commentData: CommentPostDto;
  }) => {
    const postApi = AppApi.getPostApi();

    return await postApi.commentPostCompany(postId, companyId, commentData);
  }
);

export const likeComment = createAsyncThunk(
  "post/likeComment",
  async ({ commentId, userId }: { commentId: number; userId: number }) => {
    const commentApi = AppApi.getCommentApi();

    return await commentApi.likeComment(commentId, userId);
  }
);

export const likeCommentCompany = createAsyncThunk(
  "post/likeCommentCompany",
  async ({
    commentId,
    companyId,
  }: {
    commentId: number;
    companyId: number;
  }) => {
    const commentApi = AppApi.getCommentApi();

    return await commentApi.likeCommentCompany(commentId, companyId);
  }
);

export const unlikeComment = createAsyncThunk(
  "post/unlikeComment",
  async ({ commentId, userId }: { commentId: number; userId: number }) => {
    const commentApi = AppApi.getCommentApi();

    return await commentApi.unlikeComment(commentId, userId);
  }
);

export const unlikeCommentCompany = createAsyncThunk(
  "post/unlikeCommentCompany",
  async ({
    commentId,
    companyId,
  }: {
    commentId: number;
    companyId: number;
  }) => {
    const commentApi = AppApi.getCommentApi();

    return await commentApi.unlikeCommentCompany(commentId, companyId);
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
    //RESET STORE
    builder.addCase(revertAll, () => initialState);
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
        state.posts = [action.payload, ...state.posts];
      }
    );
    builder.addCase(createPost.rejected, (state) => {
      state.currentPost = undefined;
    });
    //LIKE POST
    builder.addCase(
      likePost.fulfilled,
      (state, action: PayloadAction<PostType>) => {
        state.posts = state.posts.map((post) => {
          if (post.id === action.payload.id) {
            return action.payload;
          }
          return post;
        });
      }
    );
    //UNLIKE POST
    builder.addCase(
      unlikePost.fulfilled,
      (state, action: PayloadAction<PostType>) => {
        state.posts = state.posts.map((post) => {
          if (post.id === action.payload.id) {
            return action.payload;
          }
          return post;
        });
      }
    );
    //COMMENT POST
    builder.addCase(
      commentPost.fulfilled,
      (state, action: PayloadAction<PostType>) => {
        state.posts = state.posts.map((post) => {
          if (post.id === action.payload.id) {
            return action.payload;
          }
          return post;
        });
      }
    );
    //LIKE COMMENT
    builder.addCase(likeComment.fulfilled, (state, action) => {
      state.posts = state.posts.map((post) => {
        post.comments = post.comments.map((comment) => {
          if (comment.id === action.payload.id) {
            return action.payload;
          }
          return comment;
        });
        return post;
      });
    });
    //UNLIKE COMMENT
    builder.addCase(unlikeComment.fulfilled, (state, action) => {
      state.posts = state.posts.map((post) => {
        post.comments = post.comments.map((comment) => {
          if (comment.id === action.payload.id) {
            return action.payload;
          }
          return comment;
        });
        return post;
      });
    });

    //---COMPANY---
    //CREATE POST COMPANY
    builder.addCase(
      createPostCompany.fulfilled,
      (state, action: PayloadAction<PostType>) => {
        state.currentPost = action.payload;
        state.posts = [action.payload, ...state.posts];
      }
    );
    builder.addCase(createPostCompany.rejected, (state) => {
      state.currentPost = undefined;
    });
    //LIKE POST COMPANY
    builder.addCase(
      likePostCompany.fulfilled,
      (state, action: PayloadAction<PostType>) => {
        state.posts = state.posts.map((post) => {
          if (post.id === action.payload.id) {
            return action.payload;
          }
          return post;
        });
      }
    );
    //UNLIKE POST COMPANY
    builder.addCase(
      unlikePostCompany.fulfilled,
      (state, action: PayloadAction<PostType>) => {
        state.posts = state.posts.map((post) => {
          if (post.id === action.payload.id) {
            return action.payload;
          }
          return post;
        });
      }
    );
    //COMMENT POST COMPANY
    builder.addCase(
      commentPostCompany.fulfilled,
      (state, action: PayloadAction<PostType>) => {
        state.posts = state.posts.map((post) => {
          if (post.id === action.payload.id) {
            return action.payload;
          }
          return post;
        });
      }
    );
    //LIKE COMMENT COMPANY
    builder.addCase(likeCommentCompany.fulfilled, (state, action) => {
      state.posts = state.posts.map((post) => {
        post.comments = post.comments.map((comment) => {
          if (comment.id === action.payload.id) {
            return action.payload;
          }
          return comment;
        });
        return post;
      });
    });
    //UNLIKE COMMENT COMPANY
    builder.addCase(unlikeCommentCompany.fulfilled, (state, action) => {
      state.posts = state.posts.map((post) => {
        post.comments = post.comments.map((comment) => {
          if (comment.id === action.payload.id) {
            return action.payload;
          }
          return comment;
        });
        return post;
      });
    });
  },
});

export const { setCurrentPost, setPosts } = PostSlice.actions;
export const getPosts = (state: RootState) => state.post.posts;
export const getCurrentPost = (state: RootState) => state.post.currentPost;
export default PostSlice.reducer;
