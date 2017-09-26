let database = {}

database.categories = [
  'Science fiction',
  'Satire',
  'Drama',
  'Action and Adventure',
  'Romance',
  'Mystery',
  'Horror',
  'Self help',
  'Education'
]

database.books = [
  {
    id: 1,
    title: "Ender's Game",
    author: "Orson Scott Card",
    category: "Science fiction",
    published_date: "Jan 15 1985",
  }, 
  {
    id: 2,
    title: "It",
    author: "Stephen King",
    category: "Horror",
    published_date: "Sep 15 1986",
  },
  {
    id: 3,
    title: "The Hunger Games",
    author: " Suzanne Collins",
    category: "Science fiction",
    published_date: "Aug 17 2012",
  }, 
  {
    id: 4,
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Education",
    published_date: "Sep 23 2009",
  },
  {
    id: 5,
    title: "The Pragmatic Programmer",
    author: "Dave Thomas",
    category: "Education",
    published_date: "Oct 11 1999",
  }
]

export default database