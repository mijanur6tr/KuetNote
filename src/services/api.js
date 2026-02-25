const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('token');

    // Build headers but don't force Content-Type if body is FormData
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const headers = { ...defaultHeaders, ...(options.headers || {}) };

    // If body is FormData, delete Content-Type so browser sets the boundary
    if (options.body instanceof FormData) {
      delete headers['Content-Type'];
    }

    const config = {
      ...options,
      headers,
    };

    try {
      // Helpful debug information
      // console.debug('API request', { url, method: config.method || 'GET' });
      const response = await fetch(url, config);

      // Try to parse JSON, but handle empty responses
      let data = null;
      const text = await response.text();
      try {
        data = text ? JSON.parse(text) : null;
      } catch (e) {
        // Not JSON
        data = text;
      }

      if (!response.ok) {
        const message = (data && data.message) || response.statusText || 'API request failed';
        throw new Error(message);
      }

      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // Auth methods
  async signUp({ email, password, name }) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  async logIn({ email, password }) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async getCurrentUser() {
    return this.request('/auth/current-user');
  }

  async logOut() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // Post methods
  async createPost(postData) {
    return this.request('/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  }

  async updatePost(slug, postData) {
    return this.request(`/posts/${slug}`, {
      method: 'PUT',
      body: JSON.stringify(postData),
    });
  }

  async deletePost(slug) {
    return this.request(`/posts/${slug}`, {
      method: 'DELETE',
    });
  }

  async getPost(slug) {
    return this.request(`/posts/${slug}`);
  }

  async getPosts() {
    return this.request('/posts');
  }

  async getMyPosts() {
    return this.request('/posts/user/my-posts');
  }

  async upvotePost(slug) {
    return this.request(`/posts/${slug}/upvote`, {
      method: 'POST',
    });
  }

  async downvotePost(slug) {
    return this.request(`/posts/${slug}/downvote`, {
      method: 'POST',
    });
  }

  // Comment methods
  async createComment(commentData) {
    return this.request('/comments', {
      method: 'POST',
      body: JSON.stringify(commentData),
    });
  }

  async getComments(postId) {
    return this.request(`/comments/${postId}`);
  }

  async updateComment(commentId, commentData) {
    return this.request(`/comments/${commentId}`, {
      method: 'PUT',
      body: JSON.stringify(commentData),
    });
  }

  async deleteComment(commentId) {
    return this.request(`/comments/${commentId}`, {
      method: 'DELETE',
    });
  }

  async upvoteComment(commentId) {
    return this.request(`/comments/${commentId}/upvote`, {
      method: 'POST',
    });
  }

  async downvoteComment(commentId) {
    return this.request(`/comments/${commentId}/downvote`, {
      method: 'POST',
    });
  }

  // Upload methods
  async uploadFile(file) {
    console.log('Uploading file api service:', file);
    if (!file) {
      throw new Error('No file provided');
    }
    
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.request('/uploads', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        // Don't set Content-Type, let browser set it with boundary
      },
      body: formData,
    });
    
    console.log('Upload response from API:', response);
    
    // Extract the file object from response
    if (response && response.file) {
      return response.file;
    }
    return response;
  }

  async deleteFile(publicId) {
    return this.request('/uploads', {
      method: 'DELETE',
      body: JSON.stringify({ public_id: publicId }),
    });
  }
}

const apiService = new ApiService();
export default apiService;