const mockPoints = [
  {
    id: 'f6138082-e710-48cc-abd3-15716cc7d602',
    type: 'train',
    dateFrom: '2023-11-20T10:51:34.462Z',
    dateTo: '2023-11-21T09:06:06.204Z',
    destination: '1',
    basePrice: 700,
    isFavorite: true,
    offers: [
      '1',
      '2'
    ]
  },
  {
    id: 'f6138082-e712-48cc-abd3-15716cc7d502',
    type: 'ship',
    dateFrom: '2023-11-13T01:04:03.958Z',
    dateTo: '2023-11-13T23:24:18.673Z',
    destination: '2',
    basePrice: 800,
    isFavorite: false,
    offers: [
      '1',
      '2'
    ]
  },
  {
    id: 'f6138082-e722-48cc-abd3-13716cc7d602',
    type: 'bus',
    dateFrom: '2023-11-22T12:53:29.248Z',
    dateTo: '2023-11-23T08:04:46.633Z',
    destination: '3',
    basePrice: 300,
    isFavorite: true,
    offers: [
      '1',
    ]
  },
  {
    id: 'f6138082-e722-48cc-abe3-15716cc7d603',
    type: 'train',
    dateFrom: '2023-11-23T08:04:46.633Z',
    dateTo: '2023-11-23T13:50:32.367Z',
    destination: '4',
    basePrice: 800,
    isFavorite: false,
    offers: [
      '2'
    ]
  },
  {
    id: 'f6138082-e722-48cc-abe3-15716cc7d601',
    type: 'train',
    dateFrom: '2023-11-23T08:04:46.633Z',
    dateTo: '2023-11-23T09:50:32.367Z',
    destination: '4',
    basePrice: 800,
    isFavorite: false,
    offers: [
      '1'
    ]
  },

];

const currentDate = '2023-11-23T09:04:46.633Z';
export { mockPoints, currentDate };
