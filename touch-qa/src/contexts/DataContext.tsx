import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Topic {
  id: string;
  title: string;
  content: string;
  category: string;
  authorId: string;
  createdAt: Date;
  likes: number;
  dislikes: number;
  favorites: number;
  commentCount: number;
  likedBy: string[];
  dislikedBy: string[];
  favoritedBy: string[];
}

export interface Comment {
  id: string;
  topicId: string;
  content: string;
  authorId: string;
  createdAt: Date;
  likes: number;
  dislikes: number;
  likedBy: string[];
  dislikedBy: string[];
}

interface DataContextType {
  topics: Topic[];
  comments: Comment[];
  createTopic: (title: string, content: string, category: string, authorId: string) => void;
  createComment: (topicId: string, content: string, authorId: string) => void;
  toggleTopicLike: (topicId: string, userId: string) => void;
  toggleTopicDislike: (topicId: string, userId: string) => void;
  toggleTopicFavorite: (topicId: string, userId: string) => void;
  toggleCommentLike: (commentId: string, userId: string) => void;
  toggleCommentDislike: (commentId: string, userId: string) => void;
  getTopicComments: (topicId: string) => Comment[];
  getFilteredTopics: (filter: 'all' | 'recent' | 'hot', category?: string) => Topic[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedTopics = localStorage.getItem('touch_topics');
    const storedComments = localStorage.getItem('touch_comments');
    
    if (storedTopics) {
      setTopics(JSON.parse(storedTopics).map((topic: any) => ({
        ...topic,
        createdAt: new Date(topic.createdAt)
      })));
    }
    
    if (storedComments) {
      setComments(JSON.parse(storedComments).map((comment: any) => ({
        ...comment,
        createdAt: new Date(comment.createdAt)
      })));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('touch_topics', JSON.stringify(topics));
  }, [topics]);

  useEffect(() => {
    localStorage.setItem('touch_comments', JSON.stringify(comments));
  }, [comments]);

  const createTopic = (title: string, content: string, category: string, authorId: string) => {
    const newTopic: Topic = {
      id: Date.now().toString(),
      title,
      content,
      category,
      authorId,
      createdAt: new Date(),
      likes: 0,
      dislikes: 0,
      favorites: 0,
      commentCount: 0,
      likedBy: [],
      dislikedBy: [],
      favoritedBy: [],
    };
    
    setTopics(prev => [newTopic, ...prev]);
  };

  const createComment = (topicId: string, content: string, authorId: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      topicId,
      content,
      authorId,
      createdAt: new Date(),
      likes: 0,
      dislikes: 0,
      likedBy: [],
      dislikedBy: [],
    };
    
    setComments(prev => [...prev, newComment]);
    
    // Update topic comment count
    setTopics(prev => prev.map(topic => 
      topic.id === topicId 
        ? { ...topic, commentCount: topic.commentCount + 1 }
        : topic
    ));
  };

  const toggleTopicLike = (topicId: string, userId: string) => {
    setTopics(prev => prev.map(topic => {
      if (topic.id === topicId) {
        const hasLiked = topic.likedBy.includes(userId);
        const hasDisliked = topic.dislikedBy.includes(userId);
        
        let newLikedBy = [...topic.likedBy];
        let newDislikedBy = [...topic.dislikedBy];
        
        if (hasLiked) {
          newLikedBy = newLikedBy.filter(id => id !== userId);
        } else {
          newLikedBy.push(userId);
          if (hasDisliked) {
            newDislikedBy = newDislikedBy.filter(id => id !== userId);
          }
        }
        
        return {
          ...topic,
          likedBy: newLikedBy,
          dislikedBy: newDislikedBy,
          likes: newLikedBy.length,
          dislikes: newDislikedBy.length,
        };
      }
      return topic;
    }));
  };

  const toggleTopicDislike = (topicId: string, userId: string) => {
    setTopics(prev => prev.map(topic => {
      if (topic.id === topicId) {
        const hasLiked = topic.likedBy.includes(userId);
        const hasDisliked = topic.dislikedBy.includes(userId);
        
        let newLikedBy = [...topic.likedBy];
        let newDislikedBy = [...topic.dislikedBy];
        
        if (hasDisliked) {
          newDislikedBy = newDislikedBy.filter(id => id !== userId);
        } else {
          newDislikedBy.push(userId);
          if (hasLiked) {
            newLikedBy = newLikedBy.filter(id => id !== userId);
          }
        }
        
        return {
          ...topic,
          likedBy: newLikedBy,
          dislikedBy: newDislikedBy,
          likes: newLikedBy.length,
          dislikes: newDislikedBy.length,
        };
      }
      return topic;
    }));
  };

  const toggleTopicFavorite = (topicId: string, userId: string) => {
    setTopics(prev => prev.map(topic => {
      if (topic.id === topicId) {
        const hasFavorited = topic.favoritedBy.includes(userId);
        let newFavoritedBy = [...topic.favoritedBy];
        
        if (hasFavorited) {
          newFavoritedBy = newFavoritedBy.filter(id => id !== userId);
        } else {
          newFavoritedBy.push(userId);
        }
        
        return {
          ...topic,
          favoritedBy: newFavoritedBy,
          favorites: newFavoritedBy.length,
        };
      }
      return topic;
    }));
  };

  const toggleCommentLike = (commentId: string, userId: string) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        const hasLiked = comment.likedBy.includes(userId);
        const hasDisliked = comment.dislikedBy.includes(userId);
        
        let newLikedBy = [...comment.likedBy];
        let newDislikedBy = [...comment.dislikedBy];
        
        if (hasLiked) {
          newLikedBy = newLikedBy.filter(id => id !== userId);
        } else {
          newLikedBy.push(userId);
          if (hasDisliked) {
            newDislikedBy = newDislikedBy.filter(id => id !== userId);
          }
        }
        
        return {
          ...comment,
          likedBy: newLikedBy,
          dislikedBy: newDislikedBy,
          likes: newLikedBy.length,
          dislikes: newDislikedBy.length,
        };
      }
      return comment;
    }));
  };

  const toggleCommentDislike = (commentId: string, userId: string) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        const hasLiked = comment.likedBy.includes(userId);
        const hasDisliked = comment.dislikedBy.includes(userId);
        
        let newLikedBy = [...comment.likedBy];
        let newDislikedBy = [...comment.dislikedBy];
        
        if (hasDisliked) {
          newDislikedBy = newDislikedBy.filter(id => id !== userId);
        } else {
          newDislikedBy.push(userId);
          if (hasLiked) {
            newLikedBy = newLikedBy.filter(id => id !== userId);
          }
        }
        
        return {
          ...comment,
          likedBy: newLikedBy,
          dislikedBy: newDislikedBy,
          likes: newLikedBy.length,
          dislikes: newDislikedBy.length,
        };
      }
      return comment;
    }));
  };

  const getTopicComments = (topicId: string): Comment[] => {
    return comments.filter(comment => comment.topicId === topicId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  };

  const getFilteredTopics = (filter: 'all' | 'recent' | 'hot', category?: string): Topic[] => {
    let filteredTopics = [...topics];
    
    // Filter by category if specified
    if (category && category !== 'all') {
      filteredTopics = filteredTopics.filter(topic => topic.category === category);
    }
    
    // Apply sorting based on filter
    switch (filter) {
      case 'recent':
        return filteredTopics.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      case 'hot':
        return filteredTopics.sort((a, b) => {
          const scoreA = a.likes + a.commentCount + a.favorites - a.dislikes;
          const scoreB = b.likes + b.commentCount + b.favorites - b.dislikes;
          return scoreB - scoreA;
        });
      default:
        return filteredTopics.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
  };

  const value = {
    topics,
    comments,
    createTopic,
    createComment,
    toggleTopicLike,
    toggleTopicDislike,
    toggleTopicFavorite,
    toggleCommentLike,
    toggleCommentDislike,
    getTopicComments,
    getFilteredTopics,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};