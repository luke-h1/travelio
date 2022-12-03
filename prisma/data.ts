import { Holiday, User } from '@prisma/client';
import bcrypt from 'bcrypt';

const salt = await bcrypt.genSalt(10);
const password = await bcrypt.hash('password', salt);

export const users: Omit<User, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    firstName: 'test',
    lastName: 'test',
    email: `test@test.com`,
    bio: 'I am a test user',
    password,
    role: 'USER',
  },
];

export const holidays: Omit<
  Holiday,
  'id' | 'createdAt' | 'updatedAt' | 'userId'
>[] = [
  {
    title: 'Paris',
    notes: 'Paris is the capital and most populous city of France.',
    startDate: '2022-09-09',
    endDate: '2022-09-16',
    tags: ['France', 'Europe'],
    city: 'Paris',
    country: 'France',
    rating: 5,
    image: 'https://source.unsplash.com/1600x900/?paris',
  },
  {
    title: 'London',
    notes:
      'London is the capital and largest city of England and the United Kingdom.',
    startDate: '2022-09-09',
    endDate: '2022-09-16',
    tags: ['England', 'Europe'],
    city: 'London',
    country: 'England',
    rating: 5,
    image: 'https://source.unsplash.com/1600x900/?london',
  },
  {
    title: 'New York',
    notes: 'New York is the most populous city in the United States.',
    startDate: '2022-09-09',
    endDate: '2022-09-16',
    tags: ['USA', 'America'],
    city: 'New York',
    country: 'USA',
    rating: 5,
    image: 'https://source.unsplash.com/1600x900/?newyork',
  },
  {
    title: 'Tokyo',
    notes:
      'Tokyo is the capital of Japan, the center of the Greater Tokyo Area, and the most populous metropolitan area in the world.',
    startDate: '2022-09-09',
    endDate: '2022-09-16',
    tags: ['Japan', 'Asia'],
    city: 'Tokyo',
    country: 'Japan',
    rating: 5,
    image: 'https://source.unsplash.com/1600x900/?tokyo',
  },
  {
    title: 'Sydney',
    notes:
      'Sydney is the state capital of New South Wales and the most populous city in Australia and Oceania.',
    startDate: '2022-09-09',
    endDate: '2022-09-16',
    tags: ['Australia', 'Oceania'],
    city: 'Sydney',
    country: 'Australia',
    rating: 5,
    image: 'https://source.unsplash.com/1600x900/?sydney',
  },
  {
    title: 'Cape Town',
    notes: 'Cape Town is a coastal city in South Africa.',
    startDate: '2022-09-09',
    endDate: '2022-09-16',
    tags: ['South Africa', 'Africa'],
    city: 'Cape Town',
    country: 'South Africa',
    rating: 5,
    image: 'https://source.unsplash.com/1600x900/?capetown',
  },
  {
    title: 'Rio de Janeiro',
    notes:
      'Rio de Janeiro, or simply Rio, is the second-most populous municipality in Brazil and the sixth-most populous in the Americas.',
    startDate: '2022-09-09',
    endDate: '2022-09-16',
    tags: ['Brazil', 'South America'],
    city: 'Rio de Janeiro',
    country: 'Brazil',
    rating: 5,
    image: 'https://source.unsplash.com/1600x900/?riodejaneiro',
  },
];
