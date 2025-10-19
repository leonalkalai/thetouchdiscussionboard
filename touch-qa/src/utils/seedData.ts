import { Topic, Comment } from '../contexts/DataContext';

export const seedDemoData = () => {
  // Check if data already exists
  const existingTopics = localStorage.getItem('touch_topics');
  const existingUsers = localStorage.getItem('touch_users');
  
  if (existingTopics && existingUsers) {
    return; // Data already exists
  }

  // Create demo users
  const demoUsers = [
    {
      id: '1',
      username: 'admin',
      email: 'admin@touch.com',
      password: 'admin123',
      isAdmin: true,
      createdAt: new Date('2024-01-01'),
    },
    {
      id: '2',
      username: 'user1',
      email: 'user1@touch.com',
      password: 'user123',
      isAdmin: false,
      createdAt: new Date('2024-01-02'),
    },
    {
      id: '3',
      username: 'user2',
      email: 'user2@touch.com',
      password: 'user123',
      isAdmin: false,
      createdAt: new Date('2024-01-03'),
    },
  ];

  // Create demo topics
  const demoTopics: Topic[] = [
    {
      id: '1',
      title: 'What are your thoughts on the latest AI developments?',
      content: 'With the rapid advancement in AI technology, I\'m curious about everyone\'s perspective on how it might impact our daily lives and work. What excites you most about AI, and what concerns do you have?',
      category: 'Technology',
      authorId: '1',
      createdAt: new Date('2024-01-15'),
      likes: 12,
      dislikes: 2,
      favorites: 8,
      commentCount: 5,
      likedBy: ['2', '3'],
      dislikedBy: [],
      favoritedBy: ['2', '3'],
    },
    {
      id: '2',
      title: 'Best practices for maintaining mental health while working remotely?',
      content: 'Remote work has become the norm for many of us, but it can be challenging to maintain a healthy work-life balance. What strategies have you found most effective for staying mentally healthy while working from home?',
      category: 'Health',
      authorId: '2',
      createdAt: new Date('2024-01-16'),
      likes: 18,
      dislikes: 1,
      favorites: 12,
      commentCount: 8,
      likedBy: ['1', '3'],
      dislikedBy: [],
      favoritedBy: ['1', '3'],
    },
    {
      id: '3',
      title: 'Favorite programming languages and why?',
      content: 'I\'m always interested in hearing about what programming languages developers prefer and their reasoning. Whether it\'s for specific use cases, syntax preferences, or ecosystem benefits - what\'s your go-to language and why?',
      category: 'Technology',
      authorId: '3',
      createdAt: new Date('2024-01-17'),
      likes: 15,
      dislikes: 3,
      favorites: 6,
      commentCount: 12,
      likedBy: ['1', '2'],
      dislikedBy: [],
      favoritedBy: ['1'],
    },
    {
      id: '4',
      title: 'Climate change solutions that individuals can implement',
      content: 'While systemic change is crucial for addressing climate change, I believe individual actions still matter. What are some practical steps that regular people can take to reduce their environmental impact?',
      category: 'Science',
      authorId: '1',
      createdAt: new Date('2024-01-18'),
      likes: 22,
      dislikes: 4,
      favorites: 15,
      commentCount: 9,
      likedBy: ['2', '3'],
      dislikedBy: [],
      favoritedBy: ['2', '3'],
    },
    {
      id: '5',
      title: 'Book recommendations for personal growth',
      content: 'I\'m looking to expand my reading list with books that focus on personal development, productivity, and self-improvement. What books have had the biggest positive impact on your life?',
      category: 'Education',
      authorId: '2',
      createdAt: new Date('2024-01-19'),
      likes: 9,
      dislikes: 0,
      favorites: 7,
      commentCount: 6,
      likedBy: ['1', '3'],
      dislikedBy: [],
      favoritedBy: ['1', '3'],
    },
  ];

  // Create demo comments
  const demoComments: Comment[] = [
    {
      id: '1',
      topicId: '1',
      content: 'I think AI will revolutionize healthcare and education, but we need to be careful about job displacement and privacy concerns.',
      authorId: '2',
      createdAt: new Date('2024-01-15T10:30:00'),
      likes: 5,
      dislikes: 1,
      likedBy: ['1', '3'],
      dislikedBy: [],
    },
    {
      id: '2',
      topicId: '1',
      content: 'The potential for AI to help solve climate change through better resource management and optimization is really exciting to me.',
      authorId: '3',
      createdAt: new Date('2024-01-15T14:20:00'),
      likes: 8,
      dislikes: 0,
      likedBy: ['1', '2'],
      dislikedBy: [],
    },
    {
      id: '3',
      topicId: '2',
      content: 'Setting clear boundaries between work and personal time has been crucial for me. I also make sure to take regular breaks and go for walks.',
      authorId: '1',
      createdAt: new Date('2024-01-16T09:15:00'),
      likes: 12,
      dislikes: 0,
      likedBy: ['2', '3'],
      dislikedBy: [],
    },
    {
      id: '4',
      topicId: '2',
      content: 'Creating a dedicated workspace, even if it\'s just a corner of a room, has helped me mentally separate work from home life.',
      authorId: '3',
      createdAt: new Date('2024-01-16T16:45:00'),
      likes: 7,
      dislikes: 0,
      likedBy: ['1', '2'],
      dislikedBy: [],
    },
    {
      id: '5',
      topicId: '3',
      content: 'TypeScript has been a game-changer for me. The type safety catches so many bugs early and makes refactoring much safer.',
      authorId: '1',
      createdAt: new Date('2024-01-17T11:30:00'),
      likes: 6,
      dislikes: 1,
      likedBy: ['2', '3'],
      dislikedBy: [],
    },
  ];

  // Store demo data
  localStorage.setItem('touch_users', JSON.stringify(demoUsers));
  localStorage.setItem('touch_topics', JSON.stringify(demoTopics));
  localStorage.setItem('touch_comments', JSON.stringify(demoComments));
};

export const clearDemoData = () => {
  localStorage.removeItem('touch_users');
  localStorage.removeItem('touch_topics');
  localStorage.removeItem('touch_comments');
  localStorage.removeItem('touch_user');
};